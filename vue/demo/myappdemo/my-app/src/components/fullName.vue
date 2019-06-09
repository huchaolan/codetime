<template>
    <div>
        <p>message:{{message}}</p>
        <p>comutedMethod:{{comutedMethod}}</p>
        <p>reversedMessage1:{{reversedMessage1()}}</p>
        <button @click="() => $forceUpdate()">forceUpdate</button>
        <p>{{now}}</p>
        <input v-model="message"/>
    </div>
</template>

<script>
export default {
    name:'computedDemo',
    data() {
        return {
            message:'Hello Vue'
        }
    },
    computed:{
        now:function() {
            return  Date.now();
        },
        comutedMethod:function(){
            console.info("comutedMethod");
            return this.message.split('').reverse().join('');
        }
    },
    methods:{
        reversedMessage1:function() {
            console.info("reversedMessage");
            return this.message.split('').reverse().join('');
        }
    }
}
</script>

<style>

</style>
