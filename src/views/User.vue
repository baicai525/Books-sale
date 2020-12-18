<template>
  <div class="user">
    <div>
      <span>用户信息</span>
    </div>
    <div>
      <el-row>
        <el-col :span="24">
          <div align="center" style="margin:2rem 1rem">
            <img
              :src="require('../assets/header/default.png')"
              width="150px"
              style="border-radius:50%"
            />
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      radio: 1,
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style>
/* 性别 */
.user .el-form-item__label {
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
.user .aaaa .el-input-group__prepend {
  padding: 0 25px;
}
</style>
<style scoped>
/* 修改用户信息 */
.user {
  margin: 0 auto;
  width: 70rem;
  border: 1px solid #ddd;
  font-size: 14px;
  color: #303133;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.user > div:first-child {
  margin: 0 auto;
  text-align: center;
  border-bottom: 1px solid #eee;
  height: 5rem;
  line-height: 5rem;
  font-size: 24px;
  font-weight: bold;
  background-color: #ddd;
}
</style>
