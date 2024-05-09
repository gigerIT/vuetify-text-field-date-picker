<script setup lang="ts">
import {computed, defineEmits, defineProps, ref, watch} from 'vue'
import { DatePickerProps, TextFieldProps } from 'vuetify/types'

const props = defineProps({
  modelValue: {
    type: Date,
    required: false
  },
  datePicker: {
    type: Object as () => DatePickerProps,
    required: false
  },
  textField: {
    type: Object as () => TextFieldProps,
    required: false
  }
});

const emit = defineEmits('update:modelValue')

const isMenuOpen = ref(false)
const selectedDate = ref(props.modelValue)

const formattedDate = computed(() => {
  return selectedDate.value ? selectedDate.value.toLocaleDateString('de') : ''
})

watch(props.modelValue, newDate => {
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
          :model-value="formattedDate"
          readonly
          v-bind="{...props, ...textField}"
      ></v-text-field>
    </template>
    <v-date-picker
        v-model="selectedDate"
        hide-actions
        v-bind="datePicker"
    >
    </v-date-picker>
  </v-menu>
</template>
<style>
.v-overlay__content:has(> .v-date-picker) {
  min-width: auto !important;
}</style>
