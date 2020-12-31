<template>
  <div class="goods">
    <waterfall v-bind:col="col" v-bind:data="[1]">
      <template>
        <goods-list-item v-for="item in goods" v-bind:goodsItem="item"></goods-list-item>
      </template>
    </waterfall>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    },
    list: {
      type: Array,
      default: () => []
    },
    col: {
      type: Number,
      default: 2
    },
    width: {
      type: Number,
      default: 292
    },
    gutterWidth: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      active: -1,
      waterfall: {
        col: 3,
        width: 340
      }
    }
  },
  components: {
    GoodsListItem,
  },
  mounted() {
    this.calcWaterfall()
    window.addEventListener('resize', this.calcWaterfall)
  },
  destroyed() {
    window.removeEventListener('resize', this.calcWaterfall)
  },
  methods: {
    handleChange(index) {
      this.active = index
      // this.$emit('play', true)
    },
    loadmore(index) {
      // this.$emit('loadmore', index)
    },
    scroll(scrollData) {
      // this.$emit('scroll', scrollData)
    },
    calcWaterfall() {
      let elParent = document.getElementById('waterfallContainer')
      if (elParent) {
        let width = elParent.offsetWidth
        let col = Math.round((width + 20) / 360)
        this.waterfall.col = col < 1 ? 1 : col
        this.waterfall.width = col < 1 ? width : (width / col) - 20
      }
    }
  },
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
