<template>
  <el-input-number
    size="small"
    v-model="count"
    controls-position="right"
    @change="updata"
    :min="1"
    :max="9"
    style="width: 100%"
  ></el-input-number>
</template>
<script>
export default {
  data() {
    return {
      count: "",
    };
  },
  props: ["orderNum"],
  methods: {
    updata() {
      // 通过自定义子组件事件,给父组件传参
      // this.$emit(自定义子组件事件名,参数);
      this.$emit("child", this.count);
    },
  },
  mounted() {
    this.count = this.orderNum;
  },
};
</script>
