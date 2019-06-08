<template>
    <div>
        <p>props.info: {{ info }}</p>
        <p>props.name: {{ name }}</p>
        <p>props.list: {{ list }}</p>
        <p>data.a: {{ a }}</p>
        <p>
            <button @click="handleBChange">change data.b</button>
            <button @click="handleAChange">change data.a</button>
        </p>
    </div>
</template>

<script>
export default {
    name:'propAndData',
    props:{//来自父组件的数据
        info:Object,
        name:String,
        list:Array
    },
    data(){//本身的数据
        return {
            a:'hello',
            b:'word'
        }
    },
    updated() {
        console.log('触发 propanddata组件更新')
    },
    methods:{
        handleBChange() {
            this.b = 'vue' + Date.now();
            console.log("data.b 发生了变化",this.b);
        },
        handleAChange() {
            this.a = 'vue' + Date.now();
            console.log("data.a 发生了变化",this.a);
        }
    }
}
</script>

<style>

</style>

