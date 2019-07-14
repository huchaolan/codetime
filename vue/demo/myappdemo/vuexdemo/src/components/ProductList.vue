<template>
<ul>
    <li v-for="product in products" :key="product.id">
        {{product.title}}-{{product.price}}
        <br>
        <button :disabled="!product.inventory" @click="addProductToCart(product)">
            加入购物车
        </button>
    </li>
</ul>
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
    name:'prodcutlist',
    computed:{
        ...mapState({
            products:state=>state.products.all,
        }),
    },
    created(){
        this.$store.dispatch('products/getAllProducts')
    },
    methods:mapActions('cart',['addProductToCart']),
}
</script>

<style>

</style>
