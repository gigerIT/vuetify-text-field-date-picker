<script setup lang="ts">
import VDatePickerTextField from "./components/VDatePickerTextField.vue";
import {ref} from "vue";
import VuetifyInfo from "./VuetifyInfo.vue";

const date = ref(new Date());

</script>

<template>
  <v-app>
    <v-container style="max-width: 600px">
      <pre class="mb-4">{{ date }}</pre>
      <v-date-picker-text-field
          v-model="date"
          :date-picker="{title: 'Test yo'}"
          :text-field="{label: 'Date Picker'}"
          locale="de"
      ></v-date-picker-text-field>

      <vuetify-info class="mt-10"></vuetify-info>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>