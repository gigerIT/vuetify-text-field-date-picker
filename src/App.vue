<script setup lang="ts">
import VDatePickerTextField from "./components/VDatePickerTextField.vue";
import {ref} from "vue";
import VuetifyInfo from "./VuetifyInfo.vue";

const date = ref(null);

</script>

<template>
  <v-app>
    <v-container style="max-width: 600px">

      <v-date-picker-text-field
          v-model="date"
          :date-picker="{ min: new Date()}"
          :text-field="{ placeholder: 'Select a date' }"
          locale="de"
          :fullscreen-mobile="true"
      ></v-date-picker-text-field>
      <code class="my-5">{{ date }}</code>
      <vuetify-info class="mt-10"></vuetify-info>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>