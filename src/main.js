import { createApp } from 'vue';
import mdiVue from 'mdi-vue/v3';
import * as mdijs from '@mdi/js';
import mitt from 'mitt';
import App from './App.vue';
import 'normalize.css';

const eventBus = mitt();

const app = createApp(App);
app.use(mdiVue, { icons: mdijs });
app.config.globalProperties.eventBus = eventBus;
app.mount('#app');
