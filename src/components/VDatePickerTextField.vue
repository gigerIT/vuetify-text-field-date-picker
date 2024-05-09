<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue'

const { label, color, modelValue } = defineProps([
  'label',
  'color',
  'modelValue',
])
const emit = defineEmits('update:modelValue')

const isMenuOpen = ref(false)
const selectedDate = ref(modelValue)

const formattedDate = computed(() => {
  return selectedDate.value ? selectedDate.value.toLocaleDateString('de') : ''
})

watch(modelValue, newDate => {
  selectedDate.value = newDate
})

watch(selectedDate, newDate => {
  emit('update:modelValue', newDate)
  setTimeout(function () {
    isMenuOpen.value = false
  }, 150)
})
</script>

<template>
  <v-menu v-model="isMenuOpen" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-text-field
          :label="label"
          :model-value="formattedDate"
          readonly
          v-bind="props"
          variant="outlined"
          hide-details
      ></v-text-field>
    </template>
    <v-date-picker
        v-model="selectedDate"
        hide-actions
        title="Test"
        :color="color"
    >
    </v-date-picker>
  </v-menu>
</template>
<style>
.v-overlay__content:has(> .v-date-picker) {
  min-width: auto !important;
}</style>
