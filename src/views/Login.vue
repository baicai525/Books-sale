<template>
  <div style="position: relative">
    <canvas id="canvas"></canvas>
    <div class="nav">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">用户登录</el-menu-item>
        <span style="font-size: 21px; color: #666">&gt;&gt;</span>
        <el-menu-item index="2">新用户注册</el-menu-item>
      </el-menu>
    </div>
    <div id="login">
      <!-- 注册 -->
      <div class="register" v-show="reg" ref="first">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="20rem"
          style="margin-right: 20rem"
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
          style="margin-right: 20rem"
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
    //canvas
    (() => {
      //获取HTMLCanvasElement元素
      let canvasEle = document.getElementById("canvas");
      //画布宽度与窗口宽度相同
      canvasEle.width = window.innerWidth;
      //画布高度为窗口高度
      canvasEle.height = window.innerHeight;
      //获取CanvasRenderingContext2D对象
      let ctx = canvasEle.getContext("2d");
      //设置填充颜色
      ctx.fillStyle = "rgba(255,255,255,.4)";
      //声明存储50个球体的数组
      let circles = [];
      //声明球体类
      class Circle {
        constructor() {
          //X轴位置
          this.x = Math.floor(Math.random() * canvasEle.width);
          //Y轴位置
          this.y = Math.floor(Math.random() * canvasEle.height);
          //半径(3~8)
          this.radius = Math.ceil(Math.random() * 5) + 3;
          //速度(如果随机数的2倍超过1,则为正数;否则为负数)
          this.xSpeed =
            Math.random() * 2 > 1 ? Math.random() * 2 : -Math.random() * 2;
          this.ySpeed =
            Math.random() * 2 > 1 ? Math.random() * 2 : -Math.random() * 2;
        }
      }

      //初始化 -- 绘制一帧
      function init() {
        for (let n = 0; n < 200; n++) {
          //创建球体对象
          let circle = new Circle();
          //将球体对象添加到circles数组中
          circles.push(circle);
          //开始新的路径
          ctx.beginPath();
          //指定路径的起点
          ctx.moveTo(circle.x, circle.y);
          //通过arc()方法进行绘制路径
          ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
          //通过fill()方法完成绘制
          ctx.fill();
        }
      }

      //循环绘制动画帧
      function animation() {
        //清理画布
        ctx.clearRect(0, 0, canvasEle.width, canvasEle.height);
        for (let n = 0; n < 200; n++) {
          //获取到每一个球体对象
          let circle = circles[n];
          circle.x += circle.xSpeed;
          circle.y += circle.ySpeed;
          //开始新的路径
          ctx.beginPath();
          //指定路径的起点
          ctx.moveTo(circle.x, circle.y);
          //绘制球体
          ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
          //通过fill()方法完成绘制
          ctx.fill();
          if (circle.x > canvasEle.width - circle.radius || circle.x <= 0) {
            circle.xSpeed = -circle.xSpeed;
          }
          if (circle.y > canvasEle.height - circle.radius || circle.y <= 0) {
            circle.ySpeed = -circle.ySpeed;
          }
        }
        connect();
        window.requestAnimationFrame(animation);
      }

      function connect() {
        for (let n = 0; n < 200; n++) {
          for (let i = n + 1; i < 200; i++) {
            //勾股定理
            let distance = Math.sqrt(
              (circles[n].x - circles[i].x) * (circles[n].x - circles[i].x) +
                (circles[n].y - circles[i].y) * (circles[n].y - circles[i].y)
            );
            if (distance <= 60) {
              ctx.strokeStyle = "rgba(140,85,31,.8)";
              ctx.beginPath();
              ctx.moveTo(circles[n].x, circles[n].y);
              ctx.lineTo(circles[i].x, circles[i].y);
              ctx.stroke();
            }
          }
        }
      }

      //调用初始化函数
      init();
      //调用动画处理函数
      animation();
    })();
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
<style>
#login .el-form-item__label{
  color: #fff;
}
</style>
<style scoped>
#canvas {
  display: block;
  background: #000;
  background-size: cover;
}
.nav > .el-menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0.7;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
}
.nav > .el-menu--horizontal > .el-menu-item {
  font-size: 24px;
}
#login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70rem;
  user-select: none;
  color: #fff;
}


#login .login > div:first-child {
  text-align: center;
}
#login .login > div:first-child > img {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 6px rgba(0, 0, 0, 0.32);
  margin: 2rem;
}

#login .login .el-input {
  width: 95%;
}
#login .next {
  width: 29rem;
  font-size: 16px;
  font-weight: bold;
}
</style>
