<script setup>
import VDatePickerTextField from "./components/VDatePickerTextField.vue";
import {ref} from "vue";

const date = ref(new Date());

</script>

<template>
  <v-app>
    <v-container style="max-width: 500px">
      {{date}}
      <v-date-picker-text-field v-model="date"></v-date-picker-text-field>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>