<script setup>
import { useLocale } from 'vuetify'
import { computed, ref, watch } from 'vue'

const locale = useLocale()
</script>

<template>
  Vuetify Info
  Locale Current {{ locale.current }}
</template>

<style scoped>

</style>