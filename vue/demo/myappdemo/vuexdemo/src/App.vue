<template>
  <div id="app">
    count:{{count}}
    <br />
    increaseDouble:{{$store.getters.increaseDouble}}
    <button @click="$store.dispatch('increase')">count++</button>

  </div>
</template>

<script>


export default {
  name: 'app',
  computed:{
    count() {
      return this.$store.state.count;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
