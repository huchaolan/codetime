<template>
    
</template>

<script>
export default {
    name:'propsdemo',
    //props:['name','list','type','isVisible'] 定义默认属性名称
    props:{
        name:'String',//定义name属性是字符型
        type: {
            validator:function(value){//新增校验器
               return ['success','warning','danger'].includes(value);
            }
        },
        list:{//数组类型属性定义
            type:Array,
            default:() => []
        },
        isVisible:{//布尔类型定义
            type:Boolean,
            default:false
        },
        onChange: {//函数类型
            type:Function,
            default:() => []
        }
    }

}
</script>

<style>

</style>
