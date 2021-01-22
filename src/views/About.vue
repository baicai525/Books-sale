<template>
  <div class="about" v-loading="loading">
    <div>{{ bookInfo.title }}详情</div>
    <!-- <div v-for="(item, index) of bookInfo" :key="index"> -->
    <div class="book_detail">
      <div>
        <span>所属分类: {{ bookInfo.cat }}</span>
        <span>作者: {{ bookInfo.author }}</span>
      </div>
      <div>
        <el-card shadow="always" body-style="background:#eee">
          <el-row :gutter="20">
            <el-col :span="8" v-if="bookInfo.cover">
              <img
                :src="baseUrl + bookInfo.cover"
                style="  border-radius: 0.25rem;
"
                width="360px"
                height="480px"
              />
            </el-col>
            <el-col :span="16" class="text">
              <el-card shadow="hover">
                <p style="color:#606266;font-size:18px;">
                  {{ bookInfo.longIntro }}
                </p>
                <div>
                  <p>
                    上架时间: <span>{{ bookInfo.updated }}</span>
                  </p>
                  <p v-if="bookInfo.rating">
                    评分:
                    <span style="color:red">{{ bookInfo.rating.score }}</span
                    >分
                  </p>
                  <div class="gwc">
                    <p>
                      价格:
                      <span>¥{{ parseInt(bookInfo.retentionRatio).toFixed(2) }}</span>
                    </p>

                    <el-button
                      type="primary"
                      icon="el-icon-shopping-cart-2"
                      @click="add"
                      v-if="isLogined == 1"
                      >加入购物车</el-button
                    >
                    <el-button
                      type="primary"
                      icon="el-icon-shopping-cart-2"
                      v-else
                    >
                      <a href="/login" style="color:#fff">加入购物车</a>
                    </el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      bookInfo: {},
      //获取基础路径
      baseUrl: "http://statics.zhuishushenqi.com",
      loading: false,
    };
  },
  methods: {
    add() {
      let book = this.bookInfo;
      let obj = {
        username: this.$store.state.userInfo.username,
        title: book.title,
        subTitle: book.longIntro,
        img: book.cover,
        price: book.retentionRatio,
      };
      this.axios
        .post("http://127.0.0.1:3000/order", this.qs.stringify(obj))
        .then((res) => {
          if (res.data.code == 1) {
            this.$message({
              message: "加入购物车成功",
              type: "success",
              center: true,
            });
          } else {
            this.$message({
              message: "已加入购物车",
              type: "warning",
              center: true,
            });
          }
        });
    },
  },
  mounted() {
    // 从路由对象中获取 bookId
    let bookId = this.$route.query.bookId;
    this.axios.get("/book/" + bookId).then((res) => {
      this.bookInfo = res.data;
    });
  },
  computed: {
    ...mapState(["userInfo", "isLogined"]),
  },
};
</script>
<style scoped>
.about {
  margin: 0 auto;
  width: 90rem;
  border: 1px solid #ddd;
  font-size: 14px;
  color: #303133;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.about > div:first-child {
  margin: 0 auto;
  text-align: center;
  border-bottom: 1px solid #eee;
  height: 5rem;
  line-height: 5rem;
  font-size: 24px;
  font-weight: bold;
  background-color: #ddd;
}
.about .el-card__body {
  background-color: #000;
}
.book_detail > div:first-child {
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 1.1rem;
  font-weight: bold;
  color: #606266;
}
.book_detail > div:last-child .text {
  margin-left: 7rem;
  width: 50%;
  font-size: 1.25rem;
  text-indent: 2em;
  padding: 20px;
}
.text p:first-child {
  padding: 10px 0;
}
.text p:first-child > span {
  color: #666;
  font-weight: bold;
}
.text .gwc {
  width: 26rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text .gwc > p > span {
  font-size: 1.75rem;
  color: #0aa1ed;
}
</style>
