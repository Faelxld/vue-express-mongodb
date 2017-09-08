<style lang="scss">
@import './assets/scss/index';
</style>

<template>
<div id="app">
  <transition name="slide-fade">
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>
