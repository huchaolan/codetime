<template>
  <div id="app">
    <h1></h1>
    <p>账号:{{email}}</p>
    <hr>
    <h2>产品</h2>
    <prodcutlist/>
    <shoppcart/>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import prodcutlist from './components/ProductList'
import shoppcart from './components/ShoppingCart'
export default {
  name: 'app',
  components:{
    prodcutlist,
    shoppcart
  },
  computed: mapState({
    email:state=>state.userInfo.email
  }),
  methods:{

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
