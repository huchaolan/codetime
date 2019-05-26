# 第一个Vue程序

## 加载vuejs

`<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>`

## Helloword

```javascript
<div id="app">{{msg}}</div>
<script>
    new Vue({
        el:'#app',
        data() {
            return {
                msg:'hello vue'
            }
        }
    })
</script>
```

`{{msg}}`查值表达式

## todolist

```javascript
<div id="app">
    {{msg}}
    <div>
        <input type="text" v-model="info" />
        <button @click="handleClick">添加</button>
        <ul>
            <!--<li v-for="item in list">{{item}}</li>-->
            <tolist v-for="item in list" :item="item"></tolist>
        </ul>
    <div>
</div>
<script>
    Vue.component("tolist",{
        props:['item'],
        template:"<li class='red'>{{item}}</li>"
    });
    new Vue({
        el:'#app',
        data() {
            return {
                msg:'hello vue',
                info:'',
                list:[]
            }
        },
        methods: {
            handleClick() {
                this.list.push(this.info);
                this.info='';
            }
        }
    })
</script>
```

知识点:
指令:
v-model 在表单控件或者组件上创建双向绑定
v-for 基于源数据多次渲染元素或模板块。此指令之值，必须使用特定语法 alias in expression ，为当前遍历的元素提供别名
选项/数据
methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例
props 可以是数组或对象，用于接收来自父组件的数据
全局 API
Vue.component 注册或获取全局组件。注册还会自动使用给定的id设置组件的名称

坑:
1.开始调用handleClick方法时一直不生效,最后把对比老师放到git上代码发现只有在#app元素下的元素才收到Vue的控制,其他地方没有效果