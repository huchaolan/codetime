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
          v-bind:name1="msg"
          v-bind:list="list"
          v-bind:is-visible="false"
          :type="type"
          :onChange="handlePropChange"
        />
    </div>
</div>
</template>
<script>
import  tolist  from './components/ToList';
import  propsdemo from './components/PropsDemo';

export default {
    name: 'app',
    components: {
    tolist,
    propsdemo
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
    }
}
</script>

<style>
</style>
