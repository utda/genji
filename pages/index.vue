<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent width="600px">
        <v-card>
          <v-card-title>
            <h3>{{ $t('welcome') }}</h3>
          </v-card-title>
          <v-card-text>
            <template v-if="$i18n.locale === 'ja'">
              <p>
                {{ introJa }}
              </p>
              <p>
                {{ noteJa }}
              </p>
            </template>
            <template v-else>
              <p>
                {{ introEn }}
              </p>
              <p>
                {{ noteEn }}
              </p>
            </template>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" @click="dialog = false">{{
              $t('close')
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <section class="mb-5">
      <v-parallax src="assets/hero.jpg" height="400">
        <v-layout column align-center justify-center class="white--text">
          <h1 class="white--text mb-2 display-1 text-center">
            <b>
              {{ $t('digital_genji') }}
              <br /><small>Ver.YUMENOUKIHASHI</small>
            </b>
          </h1>
          <p>{{ $t('subtitle') }}</p>
          <v-btn
            large
            class="mt-5"
            :to="localePath({ name: 'main' })"
            color="primary"
            >{{ $t('browse_image_and_text') }}</v-btn
          >
        </v-layout>
      </v-parallax>
    </section>

    <v-container>
      <v-alert type="info" class="mb-5" text prominent>
        {{ news[0].date }}:
        {{ news[0][$i18n.locale] }}
      </v-alert>

      <v-row>
        <v-col cols="12" sm="6">
          <v-card class="mb-5">
            <v-card-title>
              <h3>{{ $t('welcome') }}</h3>
            </v-card-title>
            <v-card-text>
              <div class="text--primary">
                {{ $i18n.locale == 'ja' ? introJa : introEn }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card class="mb-5">
            <v-card-title>
              <h3>{{ $t('news') }}</h3>
            </v-card-title>
            <v-card-text>
              <div class="text--primary">
                <ul>
                  <li v-for="(obj, index) in news" :key="index">
                    {{ obj.date }}：{{ news[index][$i18n.locale] }}
                  </li>
                </ul>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <v-card class="mb-5">
            <v-card-title>
              <h3>{{ $t('活用データ一覧') }}</h3>
            </v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left" width="40%">資料名</th>
                      <th class="text-left" width="30%">所蔵者</th>
                      <th class="text-left" width="30%">利用条件</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="py-2">
                      <td class="py-2">
                        【{{ $t('image') }}】
                        <a
                          href="https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/genji/"
                          >東京大学総合図書館所蔵 源氏物語</a
                        >
                      </td>
                      <td>東京大学総合図書館</td>
                      <td>
                        <a
                          href="https://www.lib.u-tokyo.ac.jp/ja/library/contents/archives-top/reuse"
                          >CC BY {{ $t('eq') }}</a
                        >
                      </td>
                    </tr>
                    <tr>
                      <td class="py-2">
                        【{{ $t('image') }}】
                        <a href="http://hdl.handle.net/2324/411193"
                          >九州大学文学部所蔵 源氏物語 古活字版</a
                        >
                      </td>
                      <td>九州大学文学部</td>
                      <td>
                        <a href="https://www.lib.kyushu-u.ac.jp/ja/reuse"
                          >Public Domain</a
                        >
                      </td>
                    </tr>
                    <tr>
                      <td class="py-2">
                        【{{ $t('image') }}】
                        <a href="http://hdl.handle.net/2324/411265"
                          >個人蔵 源氏物語 無跋無刊記整版本</a
                        >
                      </td>
                      <td>個人蔵 九州大学附属図書館による画像公開</td>
                      <td>
                        <a href="https://www.lib.kyushu-u.ac.jp/ja/reuse"
                          >Public Domain</a
                        >
                      </td>
                    </tr>
                    <tr>
                      <td class="py-2">
                        【{{ $t('image') }}】
                        <a href="https://kotenseki.nijl.ac.jp/biblio/200018258"
                          >国文学研究資料館 鵜飼文庫 湖月抄</a
                        >
                      </td>
                      <td>国文学研究資料館</td>
                      <td>
                        <a href="http://creativecommons.org/licenses/by-sa/4.0/"
                          >CC BY-SA</a
                        >
                      </td>
                    </tr>
                    <tr>
                      <td class="py-2">
                        【{{ $t('image') }}】
                        <a href="http://dl.ndl.go.jp/info:ndljp/pid/3437686">{{
                          $t('校異源氏物語')
                        }}</a>
                      </td>
                      <td>{{ $t('国立国会図書館') }}</td>
                      <td>
                        <a
                          href="https://www.ndl.go.jp/jp/use/reproduction/index.html"
                          >Public Domain</a
                        >
                      </td>
                    </tr>
                    <tr>
                      <td class="py-2">
                        【{{ $t('text') }}】
                        <a href="https://w3id.org/kouigenjimonogatari/">{{
                          $t('校異源氏物語')
                        }}</a>
                      </td>
                      <td>{{ $t('校異源氏物語テキストDB') }}</td>
                      <td>
                        <a
                          href="http://creativecommons.org/publicdomain/zero/1.0/"
                          >CC0</a
                        >
                      </td>
                    </tr>
                    <tr>
                      <td class="py-2">
                        【{{ $t('modern-translation') }}】{{
                          $t('新編日本古典文学全集')
                        }}（{{ $t('小学館') }}）－ {{ $t('源氏物語') }}
                      </td>
                      <td colspan="2">
                        ※JapanKnowledge（ジャパンナレッジ）上で公開されている資料を利用しています
                      </td>
                    </tr>
                    <tr>
                      <td class="py-2">
                        【{{ $t('modern-translation') }}】
                        <a
                          href="https://www.aozora.gr.jp/cards/000052/card362.html"
                          >源氏物語（与謝野晶子訳）</a
                        >
                      </td>
                      <td>{{ $t('aozora-buko') }}</td>
                      <td>
                        <a href="https://www.aozora.gr.jp/guide/kijyunn.html">{{
                          $t('free-reuse')
                        }}</a>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <br />※ {{ $i18n.locale == 'ja' ? noteJa : noteEn }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card class="mb-5">
            <v-card-title>
              <h3>{{ $t('software_services') }}</h3>
            </v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">名前</th>
                      <th class="text-left">公開・提供機関</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="py-2">
                      <td class="py-2">
                        <a href="http://codh.rois.ac.jp/icp/"
                          >IIIF Curation Platform</a
                        >
                      </td>
                      <td class="py-2">
                        <a href="http://codh.rois.ac.jp/"
                          >人文学オープンデータ共同利用センター</a
                        >
                      </td>
                    </tr>
                    <tr class="py-2">
                      <td class="py-2">
                        <a href="http://codh.rois.ac.jp/kuronet/"
                          >KuroNetくずし字認識サービス</a
                        >
                      </td>
                      <td class="py-2">
                        <a href="http://codh.rois.ac.jp/"
                          >人文学オープンデータ共同利用センター</a
                        >
                      </td>
                    </tr>
                    <tr class="py-2">
                      <td class="py-2">
                        <a href="https://omeka.org/s/">Omeka S</a>
                      </td>
                      <td class="py-2">
                        <a href="https://rrchnm.org/"
                          >Roy Rosenzweig Center for History and New Media</a
                        >
                      </td>
                    </tr>
                    <tr class="py-2">
                      <td class="py-2">
                        <a href="https://omeka.org/s/modules/Scripto/"
                          >Scripto</a
                        >
                      </td>
                      <td class="py-2">
                        <a href="https://omeka.org/">Omeka Team</a>
                      </td>
                    </tr>
                    <tr class="py-2">
                      <td class="py-2">
                        <a
                          href="https://github.com/TEI-EAJ/parallel_text_viewer/"
                          >Parallel Text Viewer with TEI & IIIF</a
                        >
                      </td>
                      <td class="py-2">
                        <a href="https://tei-c.org/Activities/SIG/EastAsian/"
                          >TEI-C東アジア/日本語分科会</a
                        >
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <v-card class="mb-5">
            <v-card-title>
              <h3>{{ $t('creator') }}</h3>
            </v-card-title>
            <v-card-text>
              <div class="text--primary">
                <ul>
                  <li>
                    <a href="https://researchmap.jp/tam">田村隆</a>
                    東京大学大学院総合文化研究科准教授
                  </li>
                  <li>
                    <a href="https://researchmap.jp/knagasaki">永崎研宣</a>
                    一般財団法人 人文情報学研究所主席研究員
                  </li>
                  <li>
                    <a href="https://researchmap.jp/i2k">大向一輝</a>
                    東京大学大学院人文社会系研究科准教授
                  </li>
                  <li>
                    <a href="https://researchmap.jp/nakamura.satoru">中村覚</a>
                    東京大学情報基盤センター助教
                  </li>
                  <li>東京大学総合図書館職員 有志</li>
                </ul>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6">
          <v-card class="mb-5">
            <v-card-title>
              <h3>
                {{ $t('contributor') }} <small>（所属は協力当時のもの）</small>
              </h3>
            </v-card-title>
            <v-card-text>
              <div class="mb-5">「青空文庫でTEI勉強会」参加者</div>
              <div class="text--primary">
                <ul>
                  <li>王一凡 東京大学</li>
                  <li>
                    <a href="https://researchmap.jp/kzhr/">岡田一祐</a>
                    国文学研究資料館
                  </li>
                  <li>小川潤 東京大学</li>
                  <li>
                    <a href="https://researchmap.jp/kano_yasuyuki/">加納靖之</a>
                    東京大学
                  </li>
                  <li>神谷信武 チューリッヒ大学</li>

                  <li>金甫榮 渋沢栄一記念財団</li>
                  <li>
                    <a href="https://researchmap.jp/knagasaki/">永崎研宣</a>
                    人文情報学研究所
                  </li>
                  <li>
                    <a href="https://researchmap.jp/nakamura.satoru/">中村覚</a>
                    東京大学
                  </li>
                  <li>
                    <a href="https://researchmap.jp/SoMiyagawa/">宮川創</a>
                    京都大学 / ゲッティンゲン大学
                  </li>
                  <li>村田祐菜 東京大学</li>
                </ul>
              </div>
              <div class="my-5">校異源氏物語の頁数付与</div>
              <div class="text--primary">
                <ul>
                  <li>酒寄晴佳 東京大学</li>
                </ul>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <br />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Page extends Vue {
  head() {
    return {
      titleTemplate: null,
    }
  }

  dialog: boolean = false

  introJa: string =
    '東京大学総合図書館所蔵『源氏物語』の公開（2019年6月）を契機に、有志により「『源氏物語』研究にとって有意義なデジタル機能は何か」という検討が始まりました。その成果の一環として、ここに「デジタル源氏物語 - 源氏物語本文研究プラットフォームを目指して -」を公開しました。当サイトでは『源氏物語』に関する様々な関連データを収集・作成し、それらを結びつけることで、『源氏物語』研究はもちろん、古典籍を利用した教育・研究活動の一助となる環境の提案を目指しています。また研究目的以外でも、『源氏物語』を広く楽しんでもらえるような機能の提供も視野に入れサイトの構築を進めています。'

  introEn: string =
    'Volunteers began to consider "what are the meaningful digital functions for the study of "The Tale of Genji" with the opening of "The Tale of Genji" held by the University of Tokyo Library (June 2019). As part of that achievement, "Digital Tale of Genji - Aiming for a textual research platform for the Tale of Genji - " has been released. This site collects and creates various related data related to "The Tale of Genji" and links them together to propose an environment that helps not only research but also educational and research activities.'

  noteJa: string =
    'テキストデータには、著作権保護期間が満了し画像が公開されている『校異源氏物語』（中央公論社、1942年）を用いました。本文の頁数は戦後の『源氏物語大成』校異篇（中央公論社、1953-1954年）と同じです。'

  noteEn: string =
    'We used "校異源氏物語" (中央公論社, 1942), whose copyright protection period has expired. The number of pages in "校異源氏物語" is the same as "源氏物語大成" 校異編 (中央公論社, 1953-1954).'

  news: any[] = [
    {
      date: '2020-09-0x',
      ja: '「Ver.YUMENOUKIHASHI」にアップデートしました。',
      en: 'Updated to "Ver.YUMENOUKIHASHI"',
    },
    {
      date: '2020-05-01',
      ja: '「Ver.OTOME」にアップデートしました。',
      en: 'Updated to "Ver.OTOME"',
    },
    {
      date: '2019-11-30',
      ja: '「Ver.KIRITSUBO」を公開しました。',
      en: 'Released "Ver.YUMENOUKIHASHI"',
    },
  ]

  mounted() {
    if (!sessionStorage.getItem('genji_intro')) {
      this.dialog = true
      sessionStorage.setItem('genji_intro', 'true')
    }
  }
}
</script>
