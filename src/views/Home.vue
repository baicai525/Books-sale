<template>
  <div
    class="home"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.5)"
  >
    <div class="header">
      <div>
        <img src="../assets/header/logo.jpg" />
        <span>Book Store</span>
      </div>
      <div>
        <el-input
          placeholder="请输入想要搜索的内容"
          @blur.stop="close"
          v-model="input"
        >
          <template slot="append">
            <!-- <router-link :to="`/search?keywords=${input}`" style="color:#666"> -->
            <el-button @click="search" v-if="input !== ''">
              <a :href="`/search?keywords=${input}`" style="color:#aaa">搜索</a>
            </el-button>
            <el-button v-else disabled>搜索</el-button>
            <!-- </router-link> -->
          </template>
        </el-input>
        <div style="width:25.55rem;height: 400px;position: absolute;top:80px;">
          <el-collapse-transition>
            <div v-show="show">
              <div class="transition-box">
                <div
                  class="search"
                  v-for="(item, index) of searchList"
                  :key="index"
                  @click="selected"
                >
                  {{ item }}
                </div>
              </div>
            </div>
          </el-collapse-transition>
        </div>
      </div>
      <div style="position: relative;">
        <el-breadcrumb separator="|">
          <el-breadcrumb-item>
            <a
              href="#"
              title="用户中心"
              @click="openuser"
              v-if="isLogined == 1"
            >
              <img src="../assets/header/user.png" alt="" />
            </a>
            <a href="/login" title="用户中心" v-else>
              <img src="../assets/header/user.png" alt="" />
            </a>
          </el-breadcrumb-item>

          <!-- 修改用户信息开始 -->
          <el-drawer :visible.sync="drawer" direction="ltr" size="100%">
            <div class="user">
              <div>
                <span>用户信息</span>
              </div>
              <el-row>
                <el-col :span="24">
                  <div align="center" style="margin:2rem 1rem">
                    <el-upload
                      action="dddd"
                      :http-request="upload"
                      :show-file-list="false"
                    >
                      <img
                        v-if="imageUrl"
                        :src="imageUrl"
                        style="border-radius:50%;width:120px;height:120px"
                      />
                      <img
                        v-else
                        :src="require('../assets/header/default.png')"
                        style="border-radius:50%;width:120px;height:120px"
                      />
                    </el-upload>

                    <div style="margin-top:10px;">修改头像</div>
                  </div>
                </el-col>
                <el-col :span="24">
                  <el-row
                    type="flex"
                    justify="space-around"
                    align="middle"
                    style="padding:10px;border-top:1px solid #aaa;margin:0 auto;font-size:18px"
                  >
                    <el-col :span="12">
                      <el-input placeholder="请输入内容" v-model="input1">
                        <template slot="prepend">用户名:</template>
                      </el-input>
                      <div class="aaaa">
                        <el-input placeholder="请输入内容" v-model="input2">
                          <template slot="prepend">年&nbsp;龄:</template>
                        </el-input>
                        <el-input placeholder="请输入地址" v-model="input3">
                          <template slot="prepend">地&nbsp;址:</template>
                        </el-input>
                      </div>

                      <el-form>
                        <el-form-item label="性别:">
                          <el-radio-group v-model="radio">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="2">女</el-radio>
                            <el-radio :label="3">保密</el-radio>
                          </el-radio-group>
                        </el-form-item>
                        <el-button type="primary">保存修改</el-button>
                      </el-form>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </el-drawer>
          <!-- 修改用户信息结束 -->

          <el-breadcrumb-item v-if="isLogined == '0'">
            <a href="/login" title="购物车">
              <img src="../assets/header/gwc.png" alt="" />
            </a>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-else>
            <a href="#" title="购物车" @click="showgwc = !showgwc">
              <img src="../assets/header/gwc.png" alt="" />
            </a>
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/login` }" v-if="isLogined == '0'"
            ><span>登录</span></el-breadcrumb-item
          >
          <el-breadcrumb-item v-else>
            <span>欢迎,{{ userInfo.username }}</span>
            <el-button type="info" plain size="mini" @click.stop="logout"
              >注销</el-button
            >
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div
          style="margin-top: 20px; height: 200px;position: absolute;top:3.55rem;right:-4.5rem"
        >
          <el-collapse-transition>
            <div v-show="showgwc">
              <div class="transition-box">
                <div class="total">
                  <span style="padding-left:10px"
                    >商品总价:
                    <span style="font-size:24px;color:red">
                      ¥ {{ totalPrice.toFixed(2) }}</span
                    ></span
                  >
                  <el-button type="danger">立即购买</el-button>
                </div>
                <div v-if="orderData.length == '0'">购物车为空</div>
                <div v-for="(item, index) of orderData" :key="index" v-else>
                  <el-row class="order_list">
                    <el-col :span="4">
                      <img :src="baseUrl + item.img" />
                    </el-col>
                    <el-col :span="12" style="padding: 0 5px;color:#333;">
                      <div class="order_subTitle">{{ item.subTitle }}</div>
                      <div style="padding:10px;color:red">
                        <span>{{ item.title }}</span>
                      </div>
                      <div style="color:#0aa1ed;font-size:12px;">
                        <span>¥ {{ parseInt(item.price).toFixed(2) }}</span>
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <!-- child 自定义子组件事件名 -->
                      <Updata
                        :orderNum="item.orderNum"
                        @child="updata($event, item, index)"
                      ></Updata>
                    </el-col>
                    <el-col :span="3">
                      <el-button
                        size="mini"
                        circle
                        type="danger"
                        class="el-icon-delete-solid"
                        @click="del(item, index)"
                      ></el-button>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </el-collapse-transition>
        </div>
      </div>
    </div>

    <div class="content">
      <el-row class="tac">
        <el-col :span="4" class="aside">
          <!-- 手风琴开始 -->
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="男生爱好" name="1">
              <div
                :class="i == num ? active : ''"
                @click="getText(i, item.name)"
                v-for="(item, i) of bookType.male"
                :key="i"
                class="aside_text"
              >
                {{ item.name }}
              </div>
            </el-collapse-item>
            <el-collapse-item title="女生爱好" name="2">
              <div
                :class="i == num ? active : ''"
                @click="getText(i, item.name)"
                v-for="(item, i) of bookType.female"
                :key="i"
                class="aside_text"
              >
                {{ item.name }}
              </div>
            </el-collapse-item>
            <el-collapse-item title="漫画" name="3">
              <div
                :class="i == num ? active : ''"
                @click="getText(i, item.name)"
                v-for="(item, i) of bookType.picture"
                :key="i"
                class="aside_text"
              >
                {{ item.name }}
              </div>
            </el-collapse-item>
            <el-collapse-item title="新闻界" name="4">
              <div
                :class="i == num ? active : ''"
                @click="getText(i, item.name)"
                v-for="(item, i) of bookType.press"
                :key="i"
                class="aside_text"
              >
                {{ item.name }}
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- 手风琴结束 -->
        </el-col>
        <el-col :span="20">
          <!-- 轮播开始 -->
          <el-carousel :interval="4000" arrow="always" height="400px">
            <el-carousel-item
              v-for="(item, i) of banner"
              :key="i"
              style="margin:0rem auto"
            >
              <img
                :src="require(`../assets/banner/${item}`)"
                alt="图片未加载"
              />
            </el-carousel-item>
          </el-carousel>
          <!-- 轮播结束 -->

          <!-- 推荐书籍开始 -->
          <div
            class="infinite-list-wrapper"
            infinite-scroll-distance="30"
            style="overflow:auto;width:100%;height:800px;"
          >
            <el-row
              class="list"
              v-infinite-scroll="load"
              infinite-scroll-immediate="false"
            >
              <div class="bookName">
                图书分类: {{ bookName == "" ? "所有图书" : bookName }}
              </div>
              <el-col :span="12" v-for="(item, i) of bookList.books" :key="i">
                <div
                  @mouseenter.stop="mouseOver(i)"
                  @mouseleave.stop="mouseLeave(i)"
                >
                  <el-card style="margin:5px">
                    <el-row class="bookList">
                      <router-link :to="`/about?bookId=${item._id}`">
                        <el-col :span="8">
                          <img :src="baseUrl + item.cover" class="bookimg" />
                        </el-col>
                        <el-col :span="16">
                          <div class="bookIntr">
                            <div>
                              <div>{{ item.title }}</div>
                              <div>作者: {{ item.author }}</div>
                              <div>{{ item.shortIntro }}</div>
                              <div>销售量: {{ item.latelyFollower }}本</div>
                              <div>
                                <span
                                  >¥
                                  {{
                                    parseInt(item.retentionRatio).toFixed(2)
                                  }}</span
                                >
                                <el-button type="danger">
                                  查看详情
                                </el-button>
                              </div>
                            </div>
                          </div>
                        </el-col>
                      </router-link>
                      <div style="display:inline-block;">
                        <!-- <img
                          :src="require('../assets/header/' + loveImg)"
                          alt="未收藏"
                          class="love love_out"
                          ref="elem"
                          @click="changeLove"
                        /> -->
                        <Collect ref="elem"></Collect>
                      </div>
                    </el-row>
                  </el-card>
                </div>
              </el-col>
              <!-- <div v-if="loading" class="loadMore">加载中...</div> -->
            </el-row>
          </div>
          <!-- 推荐书籍结束 -->
          <!-- 图书分类信息 -->
        </el-col>
      </el-row>

      <!-- 首页底部 -->
      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data() {
    return {
      //用户信息
      imageUrl: "",
      input1: "",
      input2: "",
      input3: "",
      radio: 3,
      drawer: false,

      count: 1,
      searchList: [],
      //搜索相关内容
      show: false,
      // 购物车显示与隐藏
      showgwc: false,
      //轮播图片
      banner: ["banner1.jpg", "banner2.jpg", "banner3.jpg", "banner4.jpg"],
      //获取基础路径
      baseUrl: "http://statics.zhuishushenqi.com",
      // 侧边手风琴
      activeName: null,
      //搜索内容
      input: "",
      // 图书分类信息
      bookType: {},
      // 图书列表信息
      bookList: {},
      bookLove: "",
      bookName: "",
      // 订单
      orderData: [],
      totalPrice: 0,
      // 推荐书籍无限滚动
      loading: false,
      startCount: 0,
      pageCount: 10,
      // 侧边导航添加单击样式
      num: undefined,
      active: { active: true },
      // 防抖定时器
      timer: null,
    };
  },
  methods: {
    ...mapMutations(["logout"]),

    mouseOver(index) {
      this.$refs.elem[index].$el.firstElementChild.className = "love_in";
    },
    mouseLeave(index) {
      this.$refs.elem[index].$el.firstElementChild.className = "love_out";
    },

    upload(image) {
      // console.log(image);
      let file = image.file;
      let formData = new FormData();
      formData.set("username", this.userInfo.username);
      formData.append("avatar", file);
      this.axios.post("http://127.0.0.1:3000/avatar", formData).then((res) => {
        if (res.data.code == 1) {
          sessionStorage.setItem("avatar", res.data.avatar);
          setTimeout(() => {
            this.imageUrl = require("../../public/upload/" + res.data.avatar);
          }, 1500);
        }
      });
    },

    // 切换用户信息面板
    openuser() {
      this.drawer = true;

      let userInfo = this.userInfo;
      // 显示用户头像

      if (sessionStorage.getItem("avatar")) {
        this.imageUrl = require("../../public/upload/" + sessionStorage.avatar);
      } else if (userInfo.avatar != null) {
        this.imageUrl = require("../../public/upload/" + userInfo.avatar);
      } else {
        this.imageUrl = require("../assets/header/default.png");
      }

      this.input1 = userInfo.username;
      this.input2 = userInfo.age;
      this.input3 = userInfo.address;
      if (this.radio != userInfo.sex) {
        this.radio = userInfo.sex * 1;
      }
    },

    // 订单信息请求
    orderDetail() {
      this.axios
        .post(
          "http://127.0.0.1:3000/orderList",
          `username=${this.userInfo.username}`
        )
        .then((res) => {
          let t = 0;
          this.orderData = res.data.results;
          this.orderData.forEach((elem, index) => {
            t += parseInt(elem.price) * elem.orderNum;
            this.totalPrice = t;
          });
        });
    },
    updata(orderNum, item, index) {
      let obj = {
        orderNum,
        title: item.title,
      };
      this.axios
        .post("http://127.0.0.1:3000/updata", this.qs.stringify(obj))
        .then((res) => {
          if (res.data == 1) {
            this.orderDetail();
          }
        });
    },
    del(item, index) {
      this.orderData.splice(index, 1);
      let obj = {
        title: item.title,
        username: this.userInfo.username,
      };
      this.axios
        .post("http://127.0.0.1:3000/del", this.qs.stringify(obj))
        .then((res) => {
          if (res.data == 1) {
            this.totalPrice -= parseInt(item.price) * item.orderNum;
          }
        });
    },
    close(e) {
      this.show = false;
    },
    //选择查询内容
    selected(e) {
      // console.log(e.target.innerHTML);
      this.input = e.target.innerHTML;
      this.show = false;
      this.$router.push("/Search?keywords=" + e.target.innerHTML);
    },
    search() {
      if (this.timer !== null) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (this.input.trim() !== "") {
          // console.log(`查找 ${this.input.trim()} 相关的内容...`);
          this.axios
            .get("/book/auto-complete?query=" + this.input.trim())
            .then((res) => {
              this.searchList = res.data.keywords;
              this.show = true;
            });
        }
      }, 1500);
    },
    getText(num, bookType) {
      this.resetLoad();
      this.num = num;
      this.bookName = bookType;
      this.bookList.books = [];
      this.loadData(`${this.bookLove}`, bookType, 0, 10);
    },
    loadData(gender, bookType, startCount, pageCount) {
      this.loading = true;
      this.axios
        .get(
          `/book/by-categories?gender=${gender}&type=hot&major=${bookType}&minor=&start=${startCount}&limit=${pageCount}`
        )
        .then((res) => {
          res.data.books = this.bookList.books.concat(res.data.books);
          this.bookList = res.data;
          this.loading = false;
        });
    },
    load() {
      setTimeout(() => {
        this.loadData(
          `${this.bookLove == "" ? "press" : this.bookLove}`,
          `${this.bookName == "" ? "传记名著" : this.bookName}`,
          `${(this.startCount += 10)}`,
          `${(this.pageCount += 10)}`
        );
      }, 500);
    },
    resetLoad() {
      this.startCount = 0;
      this.pageCount = 10;
    },
  },
  watch: {
    input(newValue) {
      if (newValue !== "") {
        this.search();
      } else {
        this.show = false;
      }
    },
    activeName(newValue) {
      if (newValue == "1") {
        this.bookLove = "male";
        this.resetLoad();
      } else if (newValue == "2") {
        this.bookLove = "female";
        this.resetLoad();
      } else if (newValue == "3") {
        this.bookLove = "picture";
        this.resetLoad();
      } else {
        this.bookLove = "press";
        this.resetLoad();
      }
    },
  },
  computed: {
    ...mapState(["userInfo", "isLogined"]),
  },
  components: {
    HelloWorld,
  },
  mounted() {
    // 购物车信息
    this.orderDetail();
    // 图书分类
    this.axios.get("/cats/lv2/statistics").then((res) => {
      this.bookType = res.data;
    });
    // 图书列表
    this.axios
      .get(
        `/book/by-categories?gender=press&type=hot&major=传记名著&minor=&start=0&limit=10`
      )
      .then((res) => {
        this.bookList = res.data;
      });
  },
};
</script>

<style>
/* 推荐书籍加入购物车 */
.home .content .el-card__body {
  position: relative;
}
.home .content .el-card__body:hover {
  background-color: rgba(55, 55, 55, 0.15);
}
.home .content .bookList #love {
  width: 50px;
  height: 50px;
  display: inline-block;
  position: absolute;
  opacity: 0.5;
  bottom: 3px;
  right: 3rem;
}
/* .love_in {
  animation: fadeInBottomRight 2s;
  animation-fill-mode: both;
}
.love_out {
  animation: fadeOutBottomRight 2s;
  animation-fill-mode: both;
} */

.home .transition-box {
  position: relative;
  top: -5px;
  width: 32rem;
  height: 300px;
  overflow-y: auto;
  border-radius: 0 0 8px 8px;
  border: 1px solid #0aa1ed;
  box-shadow: 1px 8px 10px rgba(0, 0, 0, 0.5), 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  color: #606266;
  box-sizing: border-box;
  z-index: 999;
}
.home .transition-box .search {
  font-size: 1rem;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
  padding: 12px 10px;
}
.home .transition-box .search:hover {
  background-color: #ddd;
}
.home .el-collapse-item__header {
  font-size: 1rem;
  font-weight: 700;
  padding-left: 10px;
  text-shadow: 1px 1px 8px #cdcdcd;
  background-color: #e8e8e8;
}
.home .el-collapse-item__header:hover {
  background: #ddd;
}
.home .el-collapse-item__header.is-active {
  background-color: #333;
  color: #e8e8e8;
}

/* 用户信息 */
.home .user {
  margin: 0 auto;
  width: 70rem;
  border: 1px solid #ddd;
}
.home .header .user img {
  width: 200px;
}
/* 性别 */
.home .user .el-form-item__label {
  background-color: #f5f7fa;
  color: #909399;
  vertical-align: middle;
  display: inline-block;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 28px;
  white-space: nowrap;
  margin-right: 10px;
}
.home .user .aaaa .el-input-group__prepend {
  padding: 0 25px;
}
.home .user {
  margin: 0 auto;
  width: 70rem;
  border: 1px solid #ddd;
  font-size: 14px;
  color: #303133;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.home .user > div:first-child {
  margin: 0 auto;
  text-align: center;
  border-bottom: 1px solid #eee;
  height: 5rem;
  line-height: 5rem;
  font-size: 24px;
  font-weight: bold;
  background-color: #ddd;
}
/* 为侧边图书分类添加样式 */
.home .el-collapse-item__content {
  padding-bottom: 0;
}
.home .el-collapse-item__content .active {
  color: red;
}
</style>
<style scoped>
* {
  user-select: none;
}
.home {
  min-width: 100rem;
  margin: 0 auto;
}
.header {
  margin: 0px auto;
  width: 100%;
  height: 7rem;
  border: 1px solid #ccc;
  background: #e8e8e8;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  flex: 1 0 33.33%;
}
.header > div:first-child > img {
  width: 6rem;
  height: 4rem;
  border-radius: 1rem;
}
.header > div:first-child > span {
  padding: 0 20px;
  font-size: 24px;
  color: #fff;
  text-shadow: 2px 2px 8px orange;
  opacity: 0.9;
}
.header > div:nth-child(2) {
  width: 35rem;
}
.home .el-breadcrumb {
  display: flex;
  align-items: center;
}
.header > div:last-child img {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.header > div:last-child span {
  cursor: pointer;
  font-size: 18px;
}
.header > div:last-child span:active {
  color: red;
}

/* 购物车 */
.home .total {
  width: auto;
  height: 40px;
  line-height: 40px;
  background: #999;
  color: #fff;
  display: flex;
  justify-content: space-between;
}
.home .order_list {
  height: 8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 6px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  text-align: center;
  margin: 2px;
}
.home .header > div:last-child .order_list img[data-v-fae5bece] {
  width: 4.5rem;
  height: 7rem;
  border-radius: 6px;
}
.home .order_subTitle {
  white-space: nowrap; /* 规定文本是否折行 */
  overflow: hidden; /* 规定超出内容宽度的元素隐藏 */
  text-overflow: ellipsis;
}

/* 轮播样式 */

.home .content {
  width: 100%;
  margin: 0 auto;
  background-color: #e8e8e8;
  border: 1px solid #ccc;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
}

/* 图书分类 */
.tac .aside_text {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  font-size: 16px;
  font-weight: bold;
  background-color: #e8e8e8;
  text-align: center;
  border-bottom: 1px solid #fff;
}
.tac .aside_text:hover {
  background-color: #ddd;
}

.home .list > .bookName {
  width: 100%;
  height: 50px;
  background-color: #999;
  line-height: 50px;
  text-align: center;
  font-size: 21px;
  font-weight: bold;
  color: red;
}

/* 图书推荐 */

.bookList .bookimg {
  width: 100%;
  height: 20rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), 0 0 6px rgba(0, 0, 0, 0.3);
}
.bookList .bookIntr {
  margin: 0 auto;
  width: 90%;
  height: 20rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 6px rgba(0, 0, 0, 0.2);
  color: #aaa;
}
.bookList .bookIntr > div {
  padding: 10px;
}
.bookList .bookIntr > div > div:first-child {
  text-align: center;
  color: #333;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 1px 1px 3px #ccc;
}
.bookList .bookIntr > div > div:nth-child(2) {
  text-align: right;
  margin: 10px;
}
.bookList .bookIntr > div > div:nth-child(3) {
  width: 100%;
  height: 7rem;
  text-indent: 2em;
  line-height: 23px;
  overflow: hidden;
}
.bookList .bookIntr > div > :nth-child(4) {
  font-size: 16px;
  font-weight: bold;
  text-shadow: 1px 1px 1px #aaa;
  color: #333;
  margin-top: 5px;
}
.bookList .bookIntr > div > :nth-child(5) {
  margin: 0.7rem 1rem;
}
.bookList .bookIntr > div > :nth-child(5) > span {
  color: #0aa1ed;
  font-size: 21px;
  margin: 1.5rem;
}
/* 无线滚动 */
.home .loadMore {
  text-align: center;
  font-size: 21px;
  color: red;
  padding: 20px;
  border-left: 1px solid #ccc;
}
.footer {
  height: 20px;
}
</style>
