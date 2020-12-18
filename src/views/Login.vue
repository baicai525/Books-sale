<template>
  <div class="login">
    <div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        background-color="#e8e8e8"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">用户登录</el-menu-item>
        <span style="font-size:21px;color:#666">&gt;&gt;</span>
        <el-menu-item index="2">新用户注册</el-menu-item>
      </el-menu>
    </div>
    <!-- 注册 -->
    <div class="register" v-show="reg" ref="first">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="20rem"
        style="margin-right:20rem"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="uname">
          <el-input
            type="username"
            v-model="ruleForm.uname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input type="number" v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.number="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="ruleForm.radio">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
            <el-radio :label="3">保密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="regForm(ruleForm)" class="next"
            >免费注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 登录 -->
    <div class="login" v-show="login">
      <div>
        <img :src="avatar" alt="" />
      </div>
      <el-form
        :model="logForm"
        status-icon
        :rules="rules"
        ref="logForm"
        label-width="20rem"
        style="margin-right:20rem"
        class="demo-logForm"
      >
        <el-form-item label="用户名" prop="uname2">
          <el-input
            type="username"
            @blur="getAvatar"
            v-model="logForm.uname2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass2">
          <el-input
            type="password"
            v-model="logForm.pass2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="log(logForm)" class="next"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      const checkPhone = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (checkPhone.test(value)) {
        callback();
      } else {
        callback(new Error("请输入合法手机号"));
      }
    };
    var validateUname = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var checkAge = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("年龄不能为空"));
      }
      callback();
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      avatar: "",

      reg: false,
      login: true,
      activeIndex: "1",

      active: 0,
      ruleForm: {
        uname: "",
        pass: "",
        checkPass: "",
        age: "",
        phone: "",
        radio: 1,
      },
      logForm: {
        uname2: "",
        pass2: "",
      },
      rules: {
        // 登录验证
        uname2: [
          { min: 6, max: 12, message: "长度在6~12位之间", trigger: "blur" },
          { validator: validateUsername, trigger: "blur" },
        ],
        pass2: [
          { min: 8, max: 16, message: "长度在8~16位之间", trigger: "blur" },
          { validator: validatePassword, trigger: "blur" },
        ],
        // 注册验证
        phone: [{ validator: validatePhone, trigger: "blur" }],
        uname: [
          { min: 6, max: 12, message: "长度在6~12位之间", trigger: "blur" },
          { validator: validateUname, trigger: "blur" },
        ],
        pass: [
          { min: 8, max: 16, message: "长度在8~16位之间", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.avatar = require("../assets/header/default.png");
  },
  methods: {
    ...mapActions(["log", "regForm"]),

    getAvatar() {
      this.axios
        .post(
          "http://127.0.0.1:3000/getAvatar",
          "username=" + this.logForm.uname2
        )
        .then((res) => {
          if (res.data.code == 1 && res.data.avatar != null) {
            this.avatar = require("../../public/upload/" + res.data.avatar);
          } else {
            this.avatar = require("../assets/header/default.png");
          }
        });
    },
    handleSelect(key, keyPath) {
      if (key == 1) {
        this.reg = false;
        this.login = true;
      } else {
        this.reg = true;
        this.login = false;
      }
    },
    // log(user) {
    //   this.$refs.logForm.validate((valid) => {
    //     if (valid) {
    //       console.log(user.uname2, user.pass2);
    //       this.$store.dispatch("login", user);
    //     }
    //   });
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
.login {
  margin: 0 auto;
  width: 70rem;
  border: 1px solid #ddd;
  user-select: none;
}

.login > div:first-child > {
  text-align: center;
}
.login > div:first-child > .el-menu {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #aaa;
  color: #333;
}
.login > div:first-child > .el-menu--horizontal > .el-menu-item {
  font-size: 24px;
}

.login > div:nth-child(2) {
  padding: 40px 15px;
}
.login .next {
  width: 28rem;
  font-size: 16px;
  font-weight: bold;
}
.login .login > div:first-child {
  text-align: center;
}
.login .login > div:first-child > img {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 6px rgba(0, 0, 0, 0.32);
  margin: 2rem;
}
.login .login {
  margin-top: 4rem;
}

.login .login .el-input {
  width: 95%;
}
</style>
