<template>
  <div>
    <v-container>
      <h2 class="my-5">東大本・脱文錯簡リスト</h2>

      <p>
        東大本の画像に『校異源氏物語』及び『新編日本古典文学全集』の頁番号を付与していく過程で、これら両書の本文との比較において、東大本に本文の脱落や錯簡（綴じ違いなどで、頁の順序が乱れていること）が起こっていると判断される箇所が複数見つかりました。以下がその一覧です。なお、該当箇所の画像にも「脱文・錯簡あり」のアイコンを表示し、説明を付しています。
      </p>

      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="-1"
        class="mt-5"
      >
        <template v-slot:item.description="{ item }">
          <div class="py-2" v-html="item.description" />
        </template>
        <template v-slot:item.url="{ item }">
          <a
            target="_blank"
            :href="
              //'http://universalviewer.io/examples/uv/uv.html#?manifest=' +
              item.url
            "
          >
            <img
              class="m-2"
              src="https://iiif.dl.itc.u-tokyo.ac.jp/images/mirador.png"
            />
          </a>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import axios from 'axios'

@Component
export default class List extends Vue {
  head() {
    return {
      title: this.$t('東大本・脱文錯簡リスト'),
    }
  }

  headers: any[] = []

  desserts: any[] = []
  url: string = process.env.BASE_URL + '/data/ds.json'

  mounted() {
    this.headers = [
      { text: this.$t('volume'), value: 'vol' },
      { text: this.$t('title'), value: 'title' },
      { text: this.$t('imageNum'), value: 'imageNum' },
      { text: this.$t('explanation'), value: 'description', width: '40%' },
      { text: this.$t('type'), value: 'type' },
      { text: this.$t('画像をみる'), value: 'url' },
    ]

    axios.get(this.url).then((response) => {
      const result: any = Object.values(response.data)[0]
      for (const vol in result) {
        const obj = result[vol]
        const arr = obj.data
        for (let i = 0; i < arr.length; i++) {
          const data = arr[i]

          this.desserts.push({
            vol,
            title: obj.label,
            imageNum: data.page,
            description: data.description,
            type: data.type,
            url:
              'https://tei-eaj.github.io/parallel_text_viewer/app/mirador/?params=%5B%7B%22manifest%22%3A%22https%3A%2F%2Futda.github.io%2Fgenji%2Fdata%2Fiiif%2Forg%2F%E6%9D%B1%E5%A4%A7%E6%9C%AC%2F33%2Fmanifest.json%22%2C%22canvas%22%3A%22https%3A%2F%2Fiiif.dl.itc.u-tokyo.ac.jp%2Frepo%2Fiiif%2F5af16d8a-9e37-3866-38fa-e20fe1060f4a%2Fcanvas%2Fp26%23xywh%3D3504%2C1128%2C272%2C2816%22%7D%5D&annotationState=on', // data.url,
          })
        }
      }
    })
  }
}
</script>
