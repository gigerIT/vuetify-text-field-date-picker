<script setup lang="ts">
import {computed, defineEmits, defineProps, ref, watch} from 'vue'

import type { VTextField, VDatePicker } from 'vuetify/components'
type UnwrapReadonlyArray<A> = A extends Readonly<Array<infer I>> ? I : A;

// import { useLocale } from 'vuetify'

const props = defineProps({
  modelValue: {
    type: Date,
    required: false
  },
  datePicker: {
    type: Object as () => UnwrapReadonlyArray<VDatePicker>,
    required: false
  },
  textField: {
    type: Object as () => UnwrapReadonlyArray<VTextField>,
    required: false
  },
  locale: {
    type: String,
    required: false,
    default: 'en'
  }
});

const emit = defineEmits('update:modelValue')

const isMenuOpen = ref(false)
const selectedDate = ref(props.modelValue)

// const locale = useLocale()
const formattedDate = computed(() => {
  return selectedDate.value ? selectedDate.value.toLocaleDateString(props.locale) : ''
})

watch(props.modelValue, newDate => {
  selectedDate.value = newDate
})

watch(selectedDate, newDate => {
  emit('update:modelValue', newDate)
  isMenuOpen.value = false
  // setTimeout(function () {
  //   isMenuOpen.value = false
  // }, 150)
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
