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
</div>
</template>

<script>
import  tolist  from './components/ToList';

export default {
  name: 'app',
  components: {
    tolist
  },
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
}
</script>

<style>
</style>
