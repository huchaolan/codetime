<template>
    <li >
        <input type="checkbox" v-model="checkedState">
        <slot name="item" v-bind="{checkedState}"></slot>
    </li>
</template>

<script>
export default {
    name: 'tolist',
    props:['item'],
    data() {
        return {
            checkedState:false
        }
    }
}
</script>

<style scoped>
.itemcolor {
    color:red;
}
</style>
