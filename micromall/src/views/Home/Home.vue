<template>
  <div>
    <navigation-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </navigation-bar>
  </div>
</template>

<script>
import NavigationBar from "@/components/commons/Navigation/NavigationBar";
import {getHomeMultiData} from "@/network/home";

export default {
  name: "Home",
  components: {
    NavigationBar,
  },
  created() {
    getHomeMultiData().then(
        res => {
          console.log(res);
        }
    )
  }
}
</script>

<style scoped>
.home-nav {
  background: var(--color-tint);
  color: #fff;
}
</style>