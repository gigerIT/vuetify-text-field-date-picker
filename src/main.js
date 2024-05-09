import {createApp} from "vue";


import {createVuetify} from "vuetify";
import 'vuetify/styles';

import {de} from 'vuetify/locale'
import App from "./App.vue";

const vuetify = createVuetify(
    {
        locale: {
            locale: 'de',
            fallback: 'en',
            messages: {de}
        }
    }
);

createApp(App).use(vuetify).mount("#app");