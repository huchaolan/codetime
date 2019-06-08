<template>
    <div>
        <select
            :value="phoneInfo.areaCode"
             placeholder="区号"
             @change="handleAreaCodeChange">
            <option value="+86">+86</option>
            <option value="+60">+60</option>
        </select>
        <input
            :value="phoneInfo.phone"
            type="number"
            placeholder="手机号"
            @input="handlePhoneChange"
        />
        <input
            :value="zipCode"
            type="number"
            placeholder="邮政编码"
            @input="handleZipCodeChange"
        />
    </div>
</template>

<script>
export default {
    name:'phoneInfo',
    props: {
        phoneInfo:Object,
        zipCode:String
    },
    model: {
        prop: "phoneInfo", // 默认 value
        event: "change" // 默认 input
    },
    methods: {
        handleAreaCodeChange(e) {
            this.$emit("change",{
                ...this.phoneInfo,
                areaCode:e.target.value
            });
        },
        handlePhoneChange(e) {
            this.$emit("change",{
                ...this.phoneInfo,
                phone:e.target.value
            })
        },
        handleZipCodeChange(e) {
            this.$emit("update:zipCode",e.target.value);
        }
    }

}
</script>

<style>

</style>
