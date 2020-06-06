<template>
    <van-address-list
            v-model="chosenAddressId"
            :list="list"
            :disabled-list="disabledList"
            disabled-text="以下地址超出配送范围"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            @select="onselect"
    />
</template>

<script>
    import {Toast} from 'vant';

    export default {
        data() {
            return {
                chosenAddressId: '1',
                list: []
            }
        },
        created() {
            const _this = this;
            axios.get("http://localhost:8181/address/list").then(function (resp) {
                _this.list = resp.data.data
            })
        },
        methods: {
            onAdd() {
                this.$router.push('/addressNew');
            },
            onEdit(item) {
                let data = JSON.stringify(item);
                this.$router.push(
                    {
                        path: "/addressEdit",
                        //字符串格式数据
                        query: {item: data}
                    })
            },
            onselect(item) {
                const _this=this;
                let OrderDTO={
                    name: item.name,
                    tel: item.tel,
                    address: item.address,
                    specsId: this.$store.state.specsId,
                    quantity:this.$store.state.quantity
                }
                axios.post("http://localhost:8181/order/create",OrderDTO).then(function (resp) {
                    if (resp.data.code==0){
                        let instance = Toast('下单成功');
                        setTimeout(() => {
                            instance.close();
                            _this.$router.push('/detail?orderId='+resp.data.data.orderId)
                        }, 1000)

                    }
                })
            }
        },
    };
</script>
