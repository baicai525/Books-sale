import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import axios from "axios";
import qs from "qs";

import { Notification, Message } from "element-ui";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogined: sessionStorage.getItem("isLogined") || 0,
    userInfo: JSON.parse(sessionStorage.getItem("userInfo")) || {},
  },
  mutations: {
    // 登录
    setUser(state, userInfo) {
      state.isLogined = 1;
      state.userInfo = userInfo;
    },
    //退出登录
    logout(state) {
      //修改登录状态为0
      state.isLogined = 0;
      //修改登录用户的相关信息为空对象
      state.userInfo = {};
      sessionStorage.clear();
    },
  },
  actions: {
    // 用户登录
    log(context, user) {
      axios
        .post(
          "http://127.0.0.1:3000/login",
          `uname=${user.uname2}&pass=${user.pass2}`
        )
        .then((res) => {
          // console.log(res.data);
          if (res.data.code == 1) {
            Notification.success({
              title: "登录成功",
              message: `欢迎`,
              offset: 100,
              position: "top-left",
            });
            sessionStorage.setItem("isLogined", 1);
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify(res.data.userInfo)
            );
            context.commit("setUser", res.data.userInfo);
            router.push("/");
          } else {
            Notification.error({
              title: "登录提示",
              message: "用户名或者密码错误",
              offset: 100,
            });
          }
        });
    },

    // 注册
    regForm(context, formName) {
      let obj = {
        username: formName.uname,
        password: formName.pass,
        age: formName.age,
        phone: formName.phone,
        sex: formName.radio,
      };
      axios
        .post(
          "http://127.0.0.1:3000/reg",
          // `username=${formName.uname}&password=${formName.pass}&age=${formName.age}&phone=${formName.phone}&sex=${this.radio}`
          qs.stringify(obj)
        )
        .then((res) => {
          if (res.data.code == 1) {
            Message({
              message: "恭喜你,已完成注册",
              type: "success",
              center: true,
            });
            // this.resetForm("ruleForm");
          } else {
            Message({
              message: "该用户已存在",
              type: "warning",
              center: true,
            });
          }
        });
    },
  },
  modules: {},
});
