import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/display.css";
import "element-ui/lib/theme-chalk/base.css";
// collapse 展开折叠
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";
Vue.component(CollapseTransition.name, CollapseTransition);
// 引入购物车修改数量组件
import Updata from "./components/Updata.vue";
Vue.component("Updata", Updata);
// 引入收藏组件
import Collect from "./components/Collect.vue";
Vue.component("Collect", Collect);
// qs中间件
import qs from "qs";
Vue.prototype.qs = qs;
import axios from "axios";
axios.defaults.baseURL = "/api";
Vue.prototype.axios = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
