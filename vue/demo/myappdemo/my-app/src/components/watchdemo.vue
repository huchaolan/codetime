<template>
   <div>
       a:{{a}}|b:{{b}}|c:{{c}}|e:{{e}}|h:{{h}}<br />
       <button @click="changea">change a</button>
   </div>
</template>

<script>
export default {
    name:'watchdemo',
    data(){
        return {
            a:1,
            b:2,
            c:{
                d:3
            },
            e:{
                f:{
                    g:4
                }
            },
            h:[]
        }
    },
    watch:{
        a:function(val,oldval) {
            console.log('a','val:'+val+'|oldval:'+oldval);
            this.b += 1;
        },
        'b':function(val,oldval){
            console.log('b','val:'+val+'|oldval:'+oldval);
             this.c.d += 2;
        },
        'c.d':function(val,oldval) {
            console.log('c.d','val:'+val+'|oldval:'+oldval);
            this.e.f.g += 3;
        },
        e: {
            handler:function(val,oldval) {
                console.log('e','val:'+val+'|oldval:'+oldval);
                this.h.push('\u12345');
            },
            deep:true
        },
        h(val,oldval) {
            console.log('h','val:'+val+'|oldval:'+oldval);
        }
    },
    methods:{
        changea:function(){
            this.a+=1;
        }
    }
}
</script>

<style>

</style>
