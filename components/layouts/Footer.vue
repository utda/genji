<template>
  <v-footer :dark="true" class="mt-5">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <p class="text-center mb-5">
            {{ $t('acknowledgement') }}
          </p>
        </v-col>
        <v-col cols="12" sm="6">
          <p class="mb-5">
            {{ $t('suishin') }}
            <br />digital-archive [at] lib.u-tokyo.ac.jp
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Footer extends Vue {}
</script>
