<template>
  <div class="my-5">
    <div class="container">
      <v-card>
        <v-card-title>
          『{{ config[this.$route.params.id].label }}』<template
            v-if="vol != -1"
            >（{{ vol }} {{ jo }}）</template
          >の頁数でさがす
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

            <!-- 
          <v-btn
            target="_blank"
            class="ma-2"
            :href="'http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation='+$route.params.curation+'&mode=annotation'"
          >
            Curation Viewerでみる
            <i class="fas fa-external-link-alt"></i>
          </v-btn>
          -->
          </template>
        </v-card-title>

        <v-simple-table>
          <thead>
            <tr>
              <th>頁数</th>
              <th>画像をみる</th>
              <th>並べて表示</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(obj, page) in pageMap" :key="page">
              <td>{{ page }}</td>
              <td>
                <v-btn
                  v-for="(window, index) in obj.windows"
                  :key="index"
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
          check: '源氏物語大成',
        },
        zenshu: {
          label: '新編日本古典文学全集',
          check: '新編日本古典文学全集',
        },
      },
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

      // const curationUri = this.$route.params.curation

      this.rows = []

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

            pageMap[page].windows.push({
              manifestId: selection.within['@id'],
              canvas: member['@id'],
              label: selection.within.label,
              url:
                'https://tei-eaj.github.io/parallel_text_viewer/app/mirador/?params=' +
                encodeURIComponent(
                  JSON.stringify([
                    {
                      manifest: selection.within['@id'],
                      canvas: member['@id'],
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
            'https://tei-eaj.github.io/parallel_text_viewer/app/mirador/?params=' +
            encodeURIComponent(JSON.stringify(params)) +
            '&annotationState=on'
        }

        this.pageMap = pageMap
      })
    },
  },
}
</script>
