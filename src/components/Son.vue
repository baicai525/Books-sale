<template>
  <div class="son">
    <table>
      <tr>
        <td>
          收件人
        </td>
        <td>
          <input
            type="text"
            :class="{ red: red }"
            v-model="input"
            @blur="test"
          />
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          添加抄送 - 添加密送 | 分别发送
        </td>
      </tr>
    </table>

    <div>{{ reg }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      reg: "",
      red: false,
    };
  },
  methods: {
    test() {
      let inputReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/g;
      if (inputReg.test(this.input)) {
        this.reg = "格式正确";
      } else {
        this.red = true;
        this.reg = "格式不正确";
        setTimeout(() => {
          this.red = false;
        }, 3000);
      }
    },
  },
};
</script>
<style scoped>
.son {
  color: #4daedfa2;
}
.red {
  color: red;
}
</style>
