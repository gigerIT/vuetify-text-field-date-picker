<script setup>
import { useLocale } from 'vuetify'
import { computed, ref, watch } from 'vue'

const locale = useLocale()
</script>

<template>
  Vuetify Info
<pre>
<!--  Locale Current {{ locale.current }}-->
</pre>
</template>

<style scoped>

</style>