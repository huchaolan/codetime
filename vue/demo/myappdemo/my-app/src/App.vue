<template>
<div id="app">{{msg}}
    <div>
        <input type="text" v-model="info" />
        <button @click="handleClick">添加</button>
        <ul>
            <tolist v-for="item in list" :key="item">
                <template v-slot:item="itemProps">
                  <span :style="{fontSize:'20px',color: itemProps.checkedState ? 'red': 'blue'}">{{item}}</span>
                </template>
            </tolist>
        </ul>
    </div>
    <hr>
    <div>属性演示</div>
    <div>
        <propsdemo
          :name1="msg"
          :list="list"
          :is-visible="false"
          :type="type"
          v-bind:onChange="handlePropChange"
        />
    </div>
     <hr>
    <div>事件演示</div>
    <div>
        <eventdemo :name="msg" @change="handleMsgChange"></eventdemo>
    </div>
    <hr>
    <div>插槽显示2.5语法</div>
     <div>
        <slotdemo>
            <p>默认插槽</p>
            <p slot="title">命名插槽1</p>
            <p slot="title">命名插槽2</p>
            <p slot="item" slot-scope="props">item slot-scope {{props}}</p>
        </slotdemo>
    </div>
    <div>插槽显示2.6语法</div>
    <div>
        <slotdemo>
            <p style="color:green">默认插槽</p>
            <template v-slot:title>
                <p style="color:red">命名插槽1</p>
                <p style="color:blue">命名插槽2</p>
            </template>
            <template v-slot:item="props">
                item slot-scop{{props}}
            </template>
        </slotdemo>
    </div>
</div>
</template>
<script>
import  tolist  from './components/ToList';
import  propsdemo from './components/PropsDemo';
import  eventdemo from './components/Event';
import  slotdemo from './components/SlotDemo';

export default {
    name: 'app',
    components: {
        tolist,
        propsdemo,
        eventdemo,
        slotdemo
    },
    data() {
        return {
            msg:'hello vue',
            info:'',
            list:['1','2','3'],
            helloword:'HelloWord',
            type:'warning'
        }
    },
    methods: {
        handleClick() {
            this.list.push(this.info);
            this.info='';
        },
        handlePropChange(val) {
           console.log("handlePropChange",val);
           this.type=val;
        },
        handleMsgChange(val){
            console.log('handleMsgChange',val);
            this.msg=val;
        }
    }
}
</script>

<style>
</style>
