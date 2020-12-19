import Vue from 'vue';
import InfiniteLoading from 'vue-infinite-loading'
import vueConfig from 'vue.config';
import App from './App.vue';

import './styles/main.scss';

Vue.config.productionTip = false;

Vue.use(InfiniteLoading, {});

new Vue({
  render: (h) => h(App),
}).$mount('#root');
