<script setup lang="ts">
import {computed, defineEmits, defineProps, onMounted, onUnmounted, ref, watch} from 'vue';
import {VDatePicker, VDialog, VMenu, VTextField} from 'vuetify/components';

type UnwrapReadonlyArray<A> = A extends Readonly<Array<infer I>> ? I : A;

const props = defineProps({
  modelValue: Date,
  datePicker: Object as () => UnwrapReadonlyArray<VDatePicker>,
  textField: Object as () => UnwrapReadonlyArray<VTextField>,
  locale: {
    type: String,
    default: 'en'
  },
  fullscreenMobile: {
    type: Boolean,
    default: false
  },
  closeOnSelect: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits('update:modelValue');

const isOpen = ref(false);
const selectedDate = ref(props.modelValue);
const isMobile = ref(window.innerWidth < 600);

const onResize = () => {
  isMobile.value = window.innerWidth < 600;
};

onMounted(() => {
  window.addEventListener('resize', onResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
});

const formattedDate = computed(() => {
  return selectedDate.value ? selectedDate.value.toLocaleDateString(props.locale) : '';
});

watch(props.modelValue, (newDate) => {
  selectedDate.value = newDate;
});

watch(selectedDate, (newDate) => {
  emit('update:modelValue', newDate);
  if (props.closeOnSelect) {
    isOpen.value = false;
  }
});


// const datePicker = ref(null);

const prevMonth = () => {
  console.log('prevMonth todo: find a way to manipulate the month value of the datePicker');
};

const nextMonth = () => {
  console.log('nextMonth todo: find a way to manipulate the month value of the datePicker');
};

</script>

<template>
  <div>
    <!-- Mobile: Fullscreen Dialog -->
    <v-dialog v-if="isMobile && props.fullscreenMobile" v-model="isOpen" fullscreen>
      <template v-slot:activator="{ props }">
        <v-text-field
            :model-value="formattedDate"
            readonly
            v-bind="{...props, ...textField}"
            @click="isOpen = true"
        ></v-text-field>
      </template>
      <v-date-picker
          ref="datePicker"
          v-model="selectedDate"
          hide-actions
          v-touch="{
            left: nextMonth,
            right: prevMonth
          }"
          v-bind="datePicker"
          @input="props.closeOnSelect ? isOpen = false : null"
      ></v-date-picker>
    </v-dialog>

    <!-- Non-Mobile: Menu -->
    <v-menu v-else v-model="isOpen" :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-text-field
            :model-value="formattedDate"
            readonly
            v-bind="{...props, ...textField}"
            @click="isOpen = true"
        ></v-text-field>
      </template>
      <v-date-picker
          class="hide-title"
          v-model="selectedDate"
          hide-actions
          v-bind="datePicker"
          @input="props.closeOnSelect ? isOpen = false : null"
          title=""
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<style>
.v-overlay__content:has(> .v-date-picker) {
  min-width: auto !important;
}

.v-date-picker.hide-title .v-picker-title {
  padding: 0 !important;
}
</style>
