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

export default {
  name: "Home",
  components: {
    NavigationBar,
  }
}
</script>

<style scoped>
.home-nav {
  background: var(--color-tint);
  color: #fff;
}
</style>