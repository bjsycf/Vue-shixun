<template>
  <div>
    <swiper class="detail-swiper">
      <swiper-item v-for="item in topImages">
        <img v-bind:src="item">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from "@/components/commons/Swiper/Swiper";
import SwiperItem from "@/components/commons/Swiper/SwiperItem";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>