<template>
  <div class="collect">
    <img
      :src="require('../assets/header/' + loveImg)"
      alt="未收藏"
      id="love"
      class="love_out"
      @click="changeLove"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      loveImg: "noLove.png",
      qh: 0,
    };
  },
  methods: {
    changeLove() {
      if (this.qh == 1) {
        this.qh = "0";
        this.loveImg = "noLove.png";
      } else {
        this.qh = "1";
        this.loveImg = "love.png";
      }
    },
  },
};
</script>
<style scoped>
.collect img#love {
  width: 50px;
  height: 50px;
}
.love_in {
  animation: fadeInBottomRight 2s;
  animation-fill-mode: both;
}
.love_out {
  animation: fadeOutBottomRight 2s;
  animation-fill-mode: both;
}
</style>
