<template>
    <div>
        <h2>v-text</h2>
        <div v-text="'hello vue'"><p>hello world</p></div>
        <h2>v-html</h2>
        <div v-html="'<span style=&quot;color:red&quot;>hello vue</span>'"></div>
        <h2>v-show</h2>
        <div v-show='show'>show vue</div>
        <button @click="show=!show">change Show</button>
        <h2>v-if v-else-if v-else</h2>
        <div v-if="number===1">v-if Hello vue {{ number }}</div>
        <div v-else-if="number===2">v-else-if Hello vue {{ number }}</div>
        <div v-else>v-else Hello vue {{ number }}</div>
        <button @click="number++">change Number</button>
        <h2>v-for,v-bind</h2>
        <div v-for="num in [1,2,3]" v-bind:key="num">Vue Num {{num}}</div>
    </div>
</template>

<script>
export default {
    name:'directDemo',
    data:function() {
        return {
            show:true,
            number:1
        }
    }
}
</script>

<style>

</style>
