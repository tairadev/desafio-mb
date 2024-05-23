import { createApp } from 'vue';
import App from './App.vue';
import { vMask } from './plugins/Directives';

createApp(App)
    .directive('mask', vMask)
    .mount('#app');
