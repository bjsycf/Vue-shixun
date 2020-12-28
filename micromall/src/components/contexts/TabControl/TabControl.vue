<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  background: #fff;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 5px;
}
</style>