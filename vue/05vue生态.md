# Vue生态

## Vuex状态管理

多个组件需要共享同一个数据或者数据修改后组件需要更新。

+ 将数据保存到在公有的父项中属性中，通过属性层层传递
+ provide和inject
+ 如果状态非常复杂需要vuex来管理

交互图

![vuex](./imgs/vuex.PNG)

vuex已经和组件没有强相关的内容了,可以独立的提供相应式数据

1. Vuex提供数据驱动视图(Vue Components)
2. 视图通过Disppatch派发Actions
3. 在Action中可以做一些异步的操作(Ajax获取后端数据)
4. 通过Commit形式提交给mutation
5. 由mutation最终更改state,提交记录有devtool记录更改

## 安装Vuex

1. `npm install vuex`就可以为项目安装vuex
2. 在vue中使用vuex

```javascript
import Vue from 'vue'
import Vuex from 'vuex'//导入vuex
import App from './App.vue'

Vue.use(Vuex)
//新建Vuex的Store实例
const store = new Vuex.Store({
  state:{
    count:0
  },
  mutations:{
    increase(state,val){
      state.count= state.count+val;
    }
  },
  actions:{
    increase({commit}) {
      setTimeout(()=>{
        commit('increase',2)
      },3000);
    }
  },
  getters:{
    increaseDouble(state) {
      return state.count*2;
    }
  }
})

new Vue({
  store,//挂载到Vue中
  render: h => h(App),
}).$mount('#app')

```

```html
<template>
  <div id="app">
    count:{{count}}
    <br />
    increaseDouble:{{$store.getters.increaseDouble}}
    <button @click="$store.dispatch('increase')">count++</button>

  </div>
</template>

<script>


export default {
  name: 'app',
  computed:{
    count() {
      return this.$store.state.count;
    }
  }
}
```

|属性|介绍|API|Vuex简写|
|--|--|--|--|
|state|提供响应的数据|this.$store.state.xxx|mapState取值|
|mutations|提供更改相应数据的方法|this.$store.commit('xxx')|mapMutations赋值|
|actions|触发mutations方法,注意参数的写法|this$store.dispatch('xxx')|mapMutations赋值|
|getters|使用vue的计算属性来缓存属性|this.$store.getters.xxx|mapGetters取值|

### 最佳实践

1. 将mutations的类型换成常量,就可以放到单独的文件中。

```javascript
//保存到单独的文件中
export const SOME_MUTATION='SOME_MUTATION'

//在其他文件引入
import {SOME_MUTATION} from './somemuationtypes'

const store = new Vuex.Store({
  state:{...}
  mutations:{
    //ES2015风格计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION](state){
      //一些操作
    }
  }

});
```

2. 开启命名空间 namespace:true
3. 嵌套模块不要过深，尽量扁平化
4. 灵活应用`createNamespacedHelpers`

## VueRouter

+ 监听url的变化执行对应的逻辑
+ 不同的URL对应不同的组件
+ 提供多种方式URL的API(URL的改变不能导致浏览器刷新)

### 使用方式

+ 提供一个路由配置表，不同URL对应不同组件的配置
+ 初始化路由实例new VueRouter()
+ 挂载到Vue实例上
+ 提供一个路由占位，用来挂在URL匹配到的组件

```javascript
//导入vue-router
import VueRouter from 'vue-router'
//安装插件
Vue.use(VueRouter)
//创建router实例
const router = new VueRouter({
  mode:'hash',
  routes//路由配置
})
//添加到Vue中
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

在App.vue中使用<router-view></router-view>

```

routes是一个路由配置，是一个routes.js文件

```javascript

import RouterDemo from './components/RouterDemo'
import RouterChildrenDemo from './components/RouterChildrenDemo'
const routes = [
    {path:'/foo',component:RouterDemo,name:'1'},
    {   path: '/user/:id',
        component: RouterDemo,
        name: '3',
        props: true,
        children: [ {
            path: 'profile',
            component: RouterChildrenDemo,
            name: '3-1' },
        ]
    }
]
export default routes
```

name1:当访问/foo，组件RouterDemo就会渲染到App.vue的`<router-view>`位置中
name3:当访问/user/123,这里是一个嵌套视图，RouterDemo会渲染到App.vue的占位符中
RouterChildrenDemo会渲染到RouterDemo占位符中
props 属性为true表示将123传递到RouterDemo组件中。
