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
    <hr>
    <div>
        phoneinfo:{{phoneinfo}},zipCode:{{zipCode}}
        <phoneinfo v-model="phoneinfo" :zipCode.sync="zipCode" />
        <phoneinfo
            :phoneInfo="phoneinfo"
            :zipCode="zipCode"
            @change="val=>(phoneinfo=val)"
            @update:zipCode="val=>(zipCode=val)"
        />
    </div>
    <hr>
    <div>
        <p>
            <button @click="handleNameChange">change this.name</button>
            <button @click="handleInfoChange">change this.info</button>
            <button @click="handleListChange">change this.list</button>
        </p>
        <pd :name="pd.name" :info="pd.info" :list="pd.list" />
    </div>
    <hr>
    <computeddeme/>
</div>
</template>
<script>
import  tolist  from './components/ToList';
import  propsdemo from './components/PropsDemo';
import  eventdemo from './components/Event';
import  slotdemo from './components/SlotDemo';
import  phoneinfo from './components/PhoneInfo';
import  pd from './components/propanddata';
import  computeddeme from './components/fullName';

export default {
    name: 'app',
    components: {
        tolist,
        propsdemo,
        eventdemo,
        slotdemo,
        phoneinfo,
        pd,
        computeddeme
    },
    data() {
        return {
            msg:'hello vue',
            info:'',
            list:['1','2','3'],
            helloword:'HelloWord',
            type:'warning',
            phoneinfo :{
                areaCode:'',
                phone:''
            },
            zipCode:'',
            pd:{
                name:'',
                info:{
                    number:''
                },
                list:[]
            }
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
        },
        handleNameChange() {
            this.pd.name = "vue" + Date.now();
            console.log("this.name 发生了变化", this.name);
        },
        handleInfoChange() {
            this.pd.info.number = 1;
            // this.$set(this.info, 'number', 1)
            console.log("this.info 发生了变化", this.info);
        },
        handleListChange() {
            this.pd.list.push(1, 2, 3);
            console.log("this.list 发生了变化", this.list);
        }
    }
}
</script>

<style>
</style>
