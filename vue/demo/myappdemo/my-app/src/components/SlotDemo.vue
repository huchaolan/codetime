<template>
    <div>
        <slot></slot>
        <slot name="title"></slot>
        <slot name="item" v-bind="{value:'vue111'}"></slot>
    </div>
</template>

<script>
export default {
    name:'slotdemo'
}
</script>
<style>

</style>
