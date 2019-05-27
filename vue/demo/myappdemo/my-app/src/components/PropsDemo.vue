<template>
    <div>
        <span>name1:</span>{{name1}}<br />
        <span>type:</span>{{type}}<br />
        <span>list:</span>{{list}}<br />
        <span>isVisible:</span>{{isVisible}}<br />
        <span>onChange:</span>{{onChange}}<br />
        <button @click="handleClick">changeType</button>
    </div>
</template>

<script>
export default {
    name:'propsdemo',
    //props:['name','list','type','isVisible'] 定义默认属性名称
    props:{
        name1:{
            type:String
        },//定义name属性是字符型
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
            default:() => {}
        }
    },
    methods:{
        handleClick() {
            console.log("111",this.type);
            this.onChange(this.type==='success'?'warning':'success');
        }
    }

}
</script>

<style>

</style>
