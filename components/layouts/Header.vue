<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      :permanent="!isMobile() ? true : false"
      width="300"
    >
      <v-list>
        <v-list-item link :to="localePath({ name: 'index' })">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!--
        <v-list-item
          link
          v-bind:to="{name: 'main'}">
          <v-list-item-content>
            <v-list-item-title>帖一覧から探す</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        -->

        <v-list-item link :to="localePath({ name: 'main' })">
          <v-list-item-action> </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{
              $t('browse_image_and_text')
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group sub-group no-action value="true">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ $t('browse_by_page') }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            link
            :to="
              localePath({
                name: 'search-id-vol',
                params: {
                  id: 'taisei',
                  vol: 1,
                },
              })
            "
          >
            <v-list-item-title>{{ $t('校異源氏物語') }}</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            :to="
              localePath({
                name: 'search-id-vol',
                params: {
                  id: 'zenshu',
                  vol: 1,
                },
              })
            "
          >
            <v-list-item-title>
              {{ $t('新編日本古典文学全集') }}
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <!-- 
        <v-list-group sub-group no-action value="true">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>現代語訳</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link v-bind:to="{name: 'yosano'}">
            <v-list-item-title>
              青空文庫
              <br />与謝野晶子訳
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
        -->

        <v-list-item link :to="localePath({ name: 'list' })">
          <v-list-item-action>
            <v-icon>mdi-view-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{
              $t('iiif_genji_collection')
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="localePath({ name: 'ds' })">
          <v-list-item-action>
            <v-icon>mdi-alert</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{
              $t('東大本・脱文錯簡リスト')
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="localePath({ name: 'about' })">
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('about') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon v-show="isMobile()" @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ $t('digital_genji') }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn depressed btn v-on="on">
            <v-icon class="mr-2">mdi-translate</v-icon>
            <template v-if="!isMobile()">
              {{ $i18n.locale == 'ja' ? '日本語' : 'English' }}
              <v-icon class="ml-2">mdi-menu-down</v-icon>
            </template>
          </v-btn>
        </template>

        <v-list>
          <v-list-item :to="switchLocalePath('ja')">
            <v-list-item-title>日本語</v-list-item-title>
          </v-list-item>
          <v-list-item :to="switchLocalePath('en')">
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Header extends Vue {
  drawer: boolean = false

  isMobile() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return true
    } else {
      return false
    }
  }
}
</script>
