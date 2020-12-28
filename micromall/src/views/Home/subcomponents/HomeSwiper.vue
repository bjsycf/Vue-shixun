<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" v-bind:key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '../../../components/commons/Swiper'

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false   //判断是否已经加载
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      //还需要执行一次
      if (!this.isLoad) {
        this.$emit("swiperImageLoad")
        this.isLoad = !this.isLoad
      }
    }
  }
}
</script>

<style scoped>

</style>
