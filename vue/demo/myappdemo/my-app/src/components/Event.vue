<template>
    <div>
        name:{{name||'--'}}<br />
        <input :value="name" @change="handleChange" />
        <br />
        <br />
        <div @click="handleDivClick">
            <button @click="handleClick">重置成功</button>&nbsp;&nbsp;&nbsp;
            <button @click.stop="handleClick">重置失败</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'eventdemo',
    props:{
        name:String
    },
    methods:{
        handleChange(e){//input调用事件
            console.log('input调用事件',e.target.value);
            this.$emit('change',e.target.value);//调用父组件的change事件
        },
        handleDivClick(e) {//div调用事件
            console.log('div调用事件');
            this.$emit('change',"");
        },
        handleClick(e){//按钮调用事件
            console.log('按钮调用事件');
            //e.stopPropagation();//阻止冒泡
        }

    }
}
</script>

<style>

</style>
