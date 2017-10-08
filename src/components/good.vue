<template>
    <dl @click="go_to_shop">
        <dt><img :src="item.baseinfo.picGroup[0]" alt=""></dt>
        <dd>
            <p>{{ item.name.shortName }}</p>
            <span>{{ item.price.actPrice }}</span>
            <i class="icon iconfont icon-jiagouwuche" @click.stop="add_to_cart"></i>
        </dd>

    </dl>
</template>
<script>
import token from "../utils/gettoken.js"
export default {
    props: ["item"],
    methods: {
        add_to_cart: function() {
            this.$http.post("/h5/mtop.trade.addbag", {
                item: {
                    name:this.item.name.shortName,
                    price:this.item.price.actPrice,
                    url:this.item.baseinfo.picGroup[0],
                    id: this.item.baseinfo.juId,
                    count: 1,
                    token: token()
                }, token: token()
            }).then((data) => {
                if (data.status == 200) {
                    this.$emit("active-show", true)
                    let data = {
                        id: this.item.baseinfo.juId,
                        name: this.item.name.shortName,
                        price: this.item.price.actPrice,
                        count: 1,
                        url: this.item.baseinfo.picGroup[0],
                        selected: false
                    }
                    this.$store.commit("add_to_cart", data)


                }
                this.$router.push("/entry/cart")
            })
        },
        go_to_shop: function() {
            this.$router.push("/shop")
        }
    }
}
</script>

<style>

</style>

