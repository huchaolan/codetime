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
    <div>
        <propsdemo
          :name1="msg"
          :list="list"
          :is-visible="false"
          :type="type"
          v-bind:onChange="handlePropChange"
        />
    </div>
    <div>
        <eventdemo :name="msg" @change="handleMsgChange"></eventdemo>
    </div>
</div>
</template>
<script>
import  tolist  from './components/ToList';
import  propsdemo from './components/PropsDemo';
import  eventdemo from './components/Event';

export default {
    name: 'app',
    components: {
    tolist,
    propsdemo,
    eventdemo
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
