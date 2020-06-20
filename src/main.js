import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import {vuetify} from "./plugins/vuetify";
import store from "./vuex/store"
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

Vue.use(Vuelidate);
Vue.use(Notifications);
Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    store: store,
    render: h => h(App)
}).$mount('#app');
