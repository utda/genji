<template>
  <div class="mb-5">
    <div class="container">
      <v-card flat>
        <v-card-title>
          <h2 class="mb-5">
            {{ $t('browse_by_page') }} 『{{
              $t(config[this.$route.params.id].label)
            }}』<template v-if="vol != -1">（{{ vol }} {{ jo }}）</template>
          </h2>

          <v-spacer></v-spacer>

          <template v-if="vol != -1">
            <v-btn
              v-if="vol - 1 > 0"
              color="primary"
              class="ma-2"
              :to="
                localePath({
                  name: 'search-id-vol',
                  params: {
                    id: $route.params.id,
                    vol: vol - 1,
                  },
                })
              "
            >
              {{ vol - 1 }} {{ infoMap[vol - 1] }} へ
            </v-btn>

            <v-btn
              v-if="vol + 1 <= 54"
              color="primary"
              class="ma-2"
              :to="
                localePath({
                  name: 'search-id-vol',
                  params: {
                    id: $route.params.id,
                    vol: vol + 1,
                  },
                })
              "
            >
              {{ vol + 1 }} {{ infoMap[vol + 1] }} へ
            </v-btn>
          </template>
        </v-card-title>

        <v-alert
          v-if="Object.keys(errs).length > 0"
          type="warning"
          class="my-5"
          text
        >
          脱文・錯簡あり：{{ Object.keys(errs).join(', ') }}
        </v-alert>

        <v-simple-table>
          <thead>
            <tr>
              <th>{{ $t('pageNum') }}</th>
              <th>{{ $t('画像をみる') }}</th>
              <th>{{ $t('並べて比較') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(obj, page) in pageMap" :key="page">
              <td>{{ page }}</td>
              <td>
                <v-btn
                  v-for="(window, index) in obj.windows"
                  :key="index"
                  small
                  class="ma-2"
                  :href="window.url"
                  target="_blank"
                  link
                >
                  {{ window.label }}
                </v-btn>
              </td>
              <td>
                <a v-if="obj.comp_url" :href="obj.comp_url" target="_blank">
                  <img
                    class="m-2"
                    src="https://iiif.dl.itc.u-tokyo.ac.jp/images/mirador.png"
                  />
                </a>
              </td>
            </tr>
          </tbody>
        </v-simple-table>

        <template v-if="Object.keys(errs).length > 0">
          <h3 class="mt-10 mb-5 error--text">脱文・錯簡</h3>

          <v-simple-table>
            <thead>
              <tr>
                <th></th>
                <th>{{ $t('imageNum') }}</th>
                <th width="40%">{{ $t('explanation') }}</th>
                <th>{{ $t('type') }}</th>
                <th>{{ $t('画像をみる') }}</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(arr, org) in errs">
                <tr v-for="(obj, index) in arr" :key="org + '-' + index">
                  <td>{{ org }}</td>
                  <td>{{ obj.page }}</td>
                  <td><div class="py-2" v-html="obj.description" /></td>
                  <td>{{ obj.type }}</td>
                  <td>
                    <a :href="obj.url" target="_blank">
                      <img
                        class="m-2"
                        src="https://iiif.dl.itc.u-tokyo.ac.jp/images/mirador.png"
                      />
                    </a>
                  </td>
                </tr>
              </template>
            </tbody>
          </v-simple-table>
        </template>

        <v-divider class="my-5" />

        <v-card-title>
          <v-spacer></v-spacer>

          <v-btn
            target="_blank"
            class="ma-2"
            small
            :href="
              'http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation=' +
              curationUri +
              '&mode=annotation'
            "
          >
            {{ $t('Curation Viewerでみる') }}
            <i class="mdi mdi-open-in-new"></i>
          </v-btn>
        </v-card-title>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      headers: [{ text: '頁数', value: 'page' }],
      rows: [],
      comp_url: null,
      pageMap: {},
      infoMap: {},
      jo: '',
      vol: -1,
      config: {
        taisei: {
          label: '校異源氏物語',
          check: '校異源氏物語',
        },
        zenshu: {
          label: '新編日本古典文学全集',
          check: '新編日本古典文学全集',
        },
      },
      curationUri: '',
      errs: {},
    }
  },
  watch: {
    $route() {
      this.vol = -1
      this.id = this.$route.params.id
      this.search()
    },
  },
  created() {
    axios.get(this.baseUrl + '/data/info.json').then((response) => {
      const map = {}
      let count = 1
      const selections = response.data.selections
      for (let i = 0; i < selections.length; i++) {
        const selection = selections[i]
        const members = selection.members
        for (let j = 0; j < members.length; j++) {
          const member = members[j]
          map[count] = member.label
          count += 1
        }
      }
      this.infoMap = map
    })

    this.search()
  },
  methods: {
    search() {
      const id = this.$route.params.id

      const vol = this.$route.params.vol

      const curationUri =
        this.baseUrl +
        '/data/vol/' +
        ('0000000000' + vol).slice(-2) +
        '/curation.json'
      this.curationUri = curationUri

      // const curationUri = this.$route.params.curation

      this.rows = []

      const errs = {}

      axios.get(curationUri).then((response) => {
        const vol = Number(curationUri.split('/vol/')[1].split('/')[0])
        this.vol = vol

        //

        const curationData = response.data
        this.jo = curationData.label

        const selections = curationData.selections

        const pageMap = {}

        for (let i = 0; i < selections.length; i++) {
          const selection = selections[i]
          const members = selection.members
          for (let j = 0; j < members.length; j++) {
            const member = members[j]
            const label = member.label

            if (label === '脱文・錯簡') {
              const org = selection.within.label
              if (!errs[org]) {
                errs[org] = []
              }

              const map = {}
              const metadata = member.metadata

              for (let k = 0; k < metadata.length; k++) {
                const m = metadata[k]
                map[m.label] = m.value
              }

              let memberId = member['@id']
              const tmp = memberId.split('#xywh=')
              const canvas = tmp[0]
              const xywh = tmp[1].split(',')
              const y = Number(xywh[1]) - 150
              const h = Number(xywh[3]) + 150
              memberId =
                canvas + '#xywh=' + xywh[0] + ',' + y + ',' + xywh[2] + ',' + h

              errs[org].push({
                page: map.Page,
                description: map.Text,
                type: map.Type,
                url:
                  this.baseUrl +
                  '/mirador/?params=' +
                  encodeURIComponent(
                    JSON.stringify([
                      {
                        manifest: selection.within['@id'],
                        canvas: memberId,
                      },
                    ])
                  ) +
                  '&annotationState=on',
              })
            }

            if (id === 'zenshu') {
              if (!label.includes(this.config[id].check)) {
                continue
              }
            } else if (!label.includes(this.config[id].check)) {
              continue
            }

            const page = Number(label.split(' ')[1].split('.')[1])

            if (!pageMap[page]) {
              pageMap[page] = {
                windows: [],
              }
            }

            let memberId = member['@id']
            const tmp = memberId.split('#xywh=')
            const canvas = tmp[0]
            const xywh = tmp[1].split(',')
            const y = Number(xywh[1]) - 150
            const h = Number(xywh[3]) + 150
            memberId =
              canvas + '#xywh=' + xywh[0] + ',' + y + ',' + xywh[2] + ',' + h

            pageMap[page].windows.push({
              manifestId: selection.within['@id'],
              canvas: member['@id'],
              label: selection.within.label,
              url:
                this.baseUrl +
                '/mirador/?params=' +
                encodeURIComponent(
                  JSON.stringify([
                    {
                      manifest: selection.within['@id'],
                      canvas: memberId,
                    },
                  ])
                ) +
                '&annotationState=on',
            })
          }
        }

        for (const page in pageMap) {
          const params = []
          const obj = pageMap[page]
          for (let i = 0; i < obj.windows.length; i++) {
            const window = obj.windows[i]
            params.push({
              manifest: window.manifestId,
              canvas: window.canvas,
            })
          }
          pageMap[page].comp_url =
            this.baseUrl +
            '/mirador/?params=' +
            encodeURIComponent(JSON.stringify(params)) +
            '&annotationState=on&sidePanel=false'
        }

        this.pageMap = pageMap
        this.errs = errs
      })
    },
  },
}
</script>
