<template>
  <v-footer :dark="true" class="mt-5">
    <v-container>
      <v-row>
        <v-col>
          <p class="text-center my-5">
            <small>{{ $t('acknowledgement') }}</small>
          </p>
        </v-col>
        <v-col>
          <p class="my-5">
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
