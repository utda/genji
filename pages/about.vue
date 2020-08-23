<template>
  <div>
    <v-container>
      <v-card class="my-5">
        <v-card-text>
          <p class="display-1 text--primary text-center my-5">
            このサイトについて
          </p>
          <div class="text--primary">
            デジタル源氏物語では、インターネット上に一般公開されている『源氏物語』の画像や関連データを用い、以下のシステムを構築しています。
            <img width="100%" src="assets/overview.png" class="my-5" />
          </div>
        </v-card-text>
      </v-card>

      <br />

      <v-card class="my-5">
        <v-card-text>
          <p class="display-1 text--primary text-center my-5">全般</p>
          <div class="text--primary">
            このサイトの翻刻文は、国立国会図書館デジタルコレクションで公開されている
            <a href="http://dl.ndl.go.jp/info:ndljp/pid/3437686"
              >『校異源氏物語』</a
            >（インターネット公開（保護期間満了））の画像をOCR処理し、作成したものです。このサイトで提供する翻刻文へのリンクは、『校異源氏物語』の頁単位を基準に設置されています。
            また、この頁番号は『源氏物語大成』の頁番号とも同一であるため、研究書との比較においても参照することが可能です。
            <br />画像は、東京大学総合図書館所蔵『源氏物語』、九州大学文学部所蔵『源氏物語』（古活字版）、個人蔵『源氏物語』（無跋無刊記整版本,
            九州大学附属図書館による画像公開）を利用しています。九州大学が公開する二点の『源氏物語』には『源氏物語大成』の頁番号が付与されていたこと、いずれもパブリックドメインの画像として公開されていたことから、本サイトでの活用データとしました。
          </div>
        </v-card-text>
      </v-card>

      <br />

      <v-card class="my-5">
        <v-card-text>
          <p class="display-1 text--primary text-center my-5">
            画像とテキストを一緒にみる
          </p>
          <div class="text--primary">
            <ul>
              <li>
                画面左側に『源氏物語』の公開画像が並びます。画面右側の上段は翻刻文（『校異源氏物語』）が、下段は現代語訳（与謝野晶子訳）が表示されます。
              </li>
              <li>
                翻刻文にあるIIIFアイコンをクリックすると、該当箇所の画像が開きます。
              </li>
              <li>
                画像上に表示される青色のマークは、「新編日本古典文学全集」へのリンクです。同じくオレンジ色のマークは翻刻文の画像（国立国会図書館デジタルコレクション）へのリンクです。
              </li>
              <li>
                翻刻文と現代語訳は、「桐壺」のみ対応箇所がハイライト表示されます。（「桐壺」以降の帖も、順次ハイライト機能を追加する予定です。）
              </li>
              <li>
                『校異源氏物語』のテキストデータを活用したい場合は、「<a
                  href="https://w3id.org/kouigenjimonogatari/"
                  >校異源氏物語テキストDB</a
                >」のサイトをご利用ください。
              </li>
            </ul>
          </div>
        </v-card-text>
      </v-card>

      <br />

      <v-card class="my-5">
        <v-card-text>
          <p class="display-1 text--primary text-center my-5">その他の機能</p>
          <div class="text--primary">
            <ul>
              <li>
                「頁数でさがす」では、『校異源氏物語』あるいはジャパンナレッジ上の「新編日本古典文学全集」の頁番号から、該当箇所を参照することができます。
              </li>
              <li>
                その他、IIIF対応で画像が一般公開されている『源氏物語』のリストも提供しています。
              </li>
            </ul>
          </div>
        </v-card-text>
      </v-card>

      <br />

      <v-card class="my-5">
        <v-card-text>
          <div class="text--primary">
            <p>
              今後、東京大学総合図書館所蔵本の『校異源氏物語』および『新編日本古典文学全集』の頁番号付けやテキストデータ作成などの作業を進めていきます。
            </p>

            <div>
              なお、このサイトのバージョン名は、データの公開状況によって変化します。
              <ul>
                <li>
                  東京大学総合図書館所蔵『源氏物語』及び九州大学附属図書館公開の二種類の『源氏物語』のいずれにも『校異源氏物語』の頁番号付与・公開
                </li>
                <li>『校異源氏物語』のテキストデータ公開</li>
              </ul>
              上記2つの条件を満たす帖のうち、最も後段の名称をバージョン名としています。<br />
              Ver.KIRITSUBOから始まり、ゆくゆくはVer.YUMENOUKIHASHI
              を公開できるよう作業を進めています。
            </div>
            <p>
              このサイトの機能について、また「デジタル源氏物語」の取組全般に関してご意見等ありましたら、ページ最下段の東京大学学術資産アーカイブ化推進室までご連絡ください。
            </p>
          </div>
        </v-card-text>
      </v-card>

      <br />
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: true,
  }),
}
</script>
