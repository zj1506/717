<template>
    <div class="message">

        <header class="head">
            <i class="iconfont icon-back" @click="back"></i>
            <span>收货地址</span>
            <i class="iconfont icon-home"></i>
        </header>
        <section>
            <input type="text" placeholder="收货人姓名" v-model="name">
            <input type="text" placeholder="手机号" v-model="phone">
            <p class="select">
                <select v-model="sheng">
                    <option value="1">请选择省</option>
                    <option :value="x.name" v-for="x in sheng_list" :key="x.name">{{x.name}}</option>
                </select>
                <select v-model="city">
                    <option value="1">请选择市</option>
                    <option :value="y.name" v-for="y in city_list" :key="y.name">{{y.name}}</option>

                </select>
            </p>

            <select class="district" v-model="area">
                <option value="1">请选择区</option>
                <option :value="x" v-for="x in area_list" :key="x">{{x}}</option>
            </select>
            <input type="text" placeholder="详细地址" v-model="site">
            <span class="default">
                <i>√</i>设为默认地址</span>
            <button class="save" @click="save">保存</button>
        </section>
    </div>
</template>

<script>
import token from "../../utils/gettoken.js";
import tip from '../../components/tip.vue';
import masker from '../../components/loading.vue';
export default {
    data() {
        return {
            name: "",
            phone: "",
            site: "",
            title: "",
            Show: false,
            sheng: "",
            sheng_list: [],
            city: "",
            city_list: [],
            area_list: [],
            area: "",//
            site: ""
        }
    },

    watch: {
        'sheng': function(newv) {
          //  console.log(newv)
            this.sheng_list.forEach((v, i) => {
                if (v.name == newv) {
                    this.city_list = v.city;

                }
            })

        },
        'city': function(n) {
            this.city_list.forEach((v, i) => {

                if (v.name == n) {
                    this.area_list = v.area;

                }
            })
        }
    },
    created() {

        //地址的渲染
        let get_address_info = new Promise((resolve,reject)=>{
            this.$http.post('/address').then((res)=>{

                 console.log(res.data.data)
                  this.sheng_list=res.data.data;
                resolve(res.data.data)
                
            })
        })
        let edit_address_info = new Promise((resolve,reject)=>{
            let id = this.$route.params.id
            this.$http.post('/edit_address',{id:id,token:token()}).then((res)=>{
    
               resolve(res.data)
                
            })
        })

        Promise.all([get_address_info,edit_address_info]).then((res)=>{
            this.sheng_list = res[0];
            if(res[1]){
                this.name = res[1].name;
                this.phone = res[1].phone;
                this.sheng = res[1].sheng;
                this.city = res[1].city;
                this.area = res[1].area;
                this.site = res[1].site;
            }
            
       

        })



    },
    methods: {
        back() {
            history.go(-1)
        },
        save() {
            if (!this.name) {
                alert("请输入姓名")
                return
            }





            this.$http.post("/save_address", {
                name: this.name,
                phone: this.phone,
                sheng: this.sheng,
                city: this.city,
                area: this.area,
                site: this.site,
                token: token()
            }).then(res => {
                if (res.data == 1) {
                    this.$router.replace("/addresslist")
                }

            })
        }

    }
}
</script>

<style scoped>
input {
    outline: none;
}

.dia {
    position: absolute;
    top: 40%;
    left: 20%;
}

.default {
    display: block;
    padding-left: .3rem;
    margin-top: .3rem;
}

.default i {
    font-style: normal;
    display: inline-block;
    width: .5rem;
    height: 0.5rem;
    line-height: .5rem;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 50%;
    margin-right: .2rem;
    color: #fff;
    background: red;
}

.save {
    width: 60%;
    height: .8rem;
    background: red;
    border: none;
    border-radius: .45rem;
    color: #fff;
    font-size: .32rem;
    margin-left: 20%;
    margin-top: .6rem;
    outline: none;
}

.message {
    width: 100%;
    height: 100%;
    background: #eee;
    box-sizing: border-box;
}

.head {
    width: 100%;
    height: .85rem;
    background: #fff;
    line-height: .85rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    background: #fff;
}

.icon-home {
    display: inline-block;
    width: .6rem;
    height: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 50%;
    text-align: center;
    line-height: .6rem;
    margin-top: 5px;
}

section {
    width: 100%;
}

input {
    width: 92%;
    background: #fff;
    border: none;
    height: .8rem;
    margin-top: .3rem;
    padding-left: .2rem;
}

select {
    width: 40%;
    height: .7rem;
    border: none;
    padding-left: .2rem;
}

.select {
    display: flex;
    justify-content: space-between;
    padding: 0 .3rem;
    margin-top: .28rem;
}

.district {
    width: 90%;
    margin-top: .28rem;
}
</style>
