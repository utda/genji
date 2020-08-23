<template>
  <v-container>
    <v-row>
      <template>
        <v-col
          v-for="(obj, index) in data"
          :key="index"
          :lg="4"
          :md="6"
          :sm="12"
          class="pa-5"
        >
          <v-card>
            <v-img
              height="200px"
              contain
              :src="obj.thumbnail"
              style="background-color: lightgray;"
            >
            </v-img>

            <v-card-title
              ><b>{{ obj.vol }}: {{ obj.title }}</b></v-card-title
            >

            <v-card-text>
              <v-btn
                v-if="obj.main"
                class="ma-2"
                color="primary"
                target="_blank"
                :href="obj.main"
                link
              >
                {{ $t('browse_image_and_text') }}
              </v-btn>

              <v-btn
                class="ma-2"
                :to="{
                  name: 'dev-search',
                  query: { id: 'taisei', curation: obj.curation },
                }"
                link
              >
                {{
                  $i18n.locale == 'ja'
                    ? '校異源氏物語の頁数で探す'
                    : 'Browse by pages of 校異源氏物語'
                }}
              </v-btn>

              <v-btn
                v-if="obj.zenshu"
                class="ma-2"
                :to="{
                  name: 'dev-search',
                  query: { id: 'zenshu', curation: obj.curation },
                }"
                :href="obj.status"
                link
              >
                {{
                  $i18n.locale == 'ja'
                    ? '新編日本古典文学全集の頁数で探す'
                    : 'Browse by pages of 新編日本古典文学全集'
                }}
              </v-btn>
            </v-card-text>

            <v-divider class="my-3"></v-divider>

            <v-card-title>{{ $t('progress') }}</v-card-title>

            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr v-for="item in obj.status" :key="item.label">
                      <td>{{ item.label }}</td>
                      <td v-if="item.label != '比較可能画像'">
                        <template v-if="item.value">
                          <v-chip class="ma-2" color="success">
                            <v-avatar left>
                              <v-icon>mdi-checkbox-marked-circle</v-icon>
                            </v-avatar>
                            済
                          </v-chip>
                        </template>
                        <template v-else>
                          <v-chip class="ma-2" color="warning">
                            <v-avatar left>
                              <v-icon>mdi-close-circle</v-icon>
                            </v-avatar>
                            未
                          </v-chip>
                        </template>
                      </td>
                      <td v-else>
                        {{ item.value.join(', ') }}
                      </td>
                      <td>{{ item.description }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>

            <v-divider class="my-4"></v-divider>

            <v-card-title>{{ $t('links') }}</v-card-title>

            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr v-for="item in obj.links" :key="item.label">
                      <td><img width="30px" :src="item.thumbnail" /></td>
                      <td>
                        <template v-if="item.value">
                          <a target="_blank" :href="item.value">{{
                            item.label
                          }}</a>
                        </template>
                        <template v-else>
                          {{ item.label }}
                        </template>
                      </td>
                      <td>{{ item.description }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  components: {},
  data: () => ({
    data: [],
  }),
  mounted() {
    axios.get('status_dev.json').then((response) => {
      const statusMap = response.data

      axios
        .get('https://genji.dl.itc.u-tokyo.ac.jp/data/info.json')
        .then((response) => {
          const result = response.data
          const selections = result.selections

          for (let j = 0; j < selections.length; j++) {
            const selection = selections[j]

            for (let i = 0; i < selection.members.length; i++) {
              const member = selection.members[i]
              const metadata = member.metadata
              const metadataObj = {}
              for (let k = 0; k < metadata.length; k++) {
                const obj = metadata[k]
                metadataObj[obj.label] = obj.value
              }
              const vol = metadataObj.vol

              const status = statusMap[('0000000000' + vol).slice(-2)]

              this.data.push({
                main: status.text
                  ? 'https://tei-eaj.github.io/parallel_text_viewer/app/#/' +
                    (vol === 1 ? '' : 'v2') +
                    '?u=' +
                    (vol === 1
                      ? 'https://genji.dl.itc.u-tokyo.ac.jp/data/pt/config.json'
                      : 'https://genji.dl.itc.u-tokyo.ac.jp/data/vol_dev/' +
                        ('0000000000' + vol).slice(-2) +
                        '/config.json')
                  : null,
                title: member.label,
                thumbnail: metadataObj.thumbnail_utokyo, // member.thumbnail,
                curation:
                  'https://genji.dl.itc.u-tokyo.ac.jp/data/vol_dev/' +
                  ('0000000000' + vol).slice(-2) +
                  '/curation.json',
                vol,
                links: [
                  {
                    thumbnail: 'assets/ndl.ico',
                    label: '校異源氏物語（国立国会図書館）',
                    value: metadataObj.ndl,
                    description: '',
                  },
                  {
                    thumbnail: 'assets/json-ld-logo.png',
                    label: '校異源氏物語テキストデータ（テキストDB）',
                    value: status.text
                      ? 'https://kouigenjimonogatari.github.io#' + vol
                      : null,
                    description: status.text ? '' : '作成中',
                  },
                  {
                    thumbnail: 'assets/aozora.ico',
                    label: '現代語訳（青空文庫）',
                    value: metadataObj.aozora,
                    description: '',
                  },
                  {
                    thumbnail: 'assets/tei.png',
                    label: '現代語訳（TEI）',
                    value: metadataObj.tei,
                    description: '',
                  },
                  {
                    thumbnail: 'assets/jk.ico',
                    label: '新編日本古典文学全集（JK）',
                    value: metadataObj.jk,
                    description: '',
                  },
                ],
                status: [
                  {
                    label: '校異源氏物語と現代語訳の対応づけ',
                    value: status.tei,
                    description: '',
                  },
                  {
                    label: '比較可能画像',
                    value: ['東大本', '九大本'],
                    description: '',
                  },
                ],
                taisei: status.taisei,
                zenshu: status.saga,
              })
            }
          }
        })
    })
  },
}
</script>
