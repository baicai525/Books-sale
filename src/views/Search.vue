<template>
  <div class="search">
    <div>
      <span>{{ keywords }}</span
      >&nbsp;&nbsp;&nbsp;相关的内容
    </div>
    <div>
      <el-row>
        <el-col :span="12" v-for="(item, i) of bookList.books" :key="i">
          <div>
            <el-card style="margin:5px">
              <el-row class="bookList">
                <router-link :to="`/about?bookId=${item._id}`">
                  <el-col :span="8">
                    <img :src="baseUrl + item.cover" />
                  </el-col>
                  <el-col :span="16">
                    <div class="bookIntr">
                      <div>
                        <div>{{ item.title }}</div>
                        <div>作者: {{ item.author }}</div>
                        <div>{{ item.shortIntro }}</div>
                        <div>销售量: {{ item.latelyFollower }}本</div>
                        <div>
                          <el-button type="danger" plain style="width:18rem;">
                            查看详情
                          </el-button>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </router-link>
              </el-row>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      baseUrl: "http://statics.zhuishushenqi.com",
      bookList: [],
      keywords: "",
    };
  },
  methods: {},
  mounted() {
    let keywords = this.$route.query.keywords;
    this.keywords = keywords;
    // console.log(keywords);
    this.axios.get("/book/fuzzy-search?query=" + keywords).then((res) => {
      this.bookList = res.data;
    });
  },
};
</script>
<style scoped>
.search {
  margin: 0 auto;
  width: 90rem;
  border: 1px solid #ddd;
  font-size: 14px;
  color: #303133;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
/* 页头 */
.search > div:first-child {
  margin: 0 auto;
  text-align: center;
  border-bottom: 1px solid #eee;
  height: 5rem;
  line-height: 5rem;
  font-size: 24px;
  font-weight: bold;
  background-color: #ddd;
}
.search > div:first-child > span {
  color: #0aa1ed;
  font-size: 28px;
}
/* 图书推荐 */
.bookList img {
  width: 100%;
  height: 19rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), 0 0 6px rgba(0, 0, 0, 0.3);
}
.bookList .bookIntr {
  margin: 0 auto;
  width: 90%;
  height: 19rem;
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
  display: flex;
  justify-content: center;
}
</style>
