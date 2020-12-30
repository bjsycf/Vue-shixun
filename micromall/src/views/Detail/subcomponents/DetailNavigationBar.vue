<template>
  <div>
    <navigation-bar>
      <div slot="left" class="back" v-on:click="backClicked">
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="title-item" v-on:click="titleClicked(index)"
             v-bind:class="{active:currentIndex===index}">
          {{ item }}
        </div>
      </div>
    </navigation-bar>
  </div>
</template>

<script>
import NavigationBar from "@/components/commons/Navigation/NavigationBar";

export default {
  name: "DetailNavigationBar",
  components: {
    NavigationBar,
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    }
  },
  methods: {
    backClicked() {
      this.$router.back()
    },
    titleClicked(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
  font-size: 14px;
}

.title-item {
  flex: 1;
}

.back img {
  margin-top: 12px;
}

.active {
  color: var(--color-tint);
}
</style>
