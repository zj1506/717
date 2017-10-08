<template>
    <div class="siteModel">
        <header class="head">
            <i class="iconfont icon-back" @click="back"></i>
            <span>收货地址</span>
            <i class="iconfont icon-home"></i>
        </header>
        <section class="main">
            <ul class="uls">
                  <li v-for="(x,ind) in adr_list" :key="x.token">
                    <span class="name_phone">{{x.name}}<b>{{x.phone}}</b></span>
                     <small class="site">{{x.sheng+x.city+x.area+x.site}}</small> 
                    <p class="default">
                        <span class="dui"><i class="btns icon iconfont icon-check"></i>设为默认</span>
                        <span class="cancel">
                            <span @click="edit(ind)"><i class="iconfont icon-send"></i>编辑</span>
                            <span @click="del_adr(ind)"><i class="iconfont icon-apps"></i>删除</span>
                        </span>
                    </p>
                </li>  
            </ul>
            
        </section>
        <div class="footer">
            <button class="add" @click="add">+新增加地址</button>
        </div>
        
    </div>
</template>

<script>
import token from "../../utils/gettoken.js"
export default {
    data(){
        return {
            adr_list:[]
        }
    },
    created(){
        this.$http.post("/get_address",{token:token()}).then(res=>{
            console.log(res)
            this.adr_list=res.data
        })
    },
    methods:{
        add(){
            this.$router.push("/addadr")
        },
        edit(ind){
            //传的是下标
            this.$router.push({name:"addadr",params:{id:ind}})
        },
        back(){
            history.go(-1)
        },
        del_adr(ind){
           //传的是下标+1
            this.$http.post("/del_adr",{token:token(),id:ind+1}).then(res=>{
                this.adr_list=res.data

            })
        }
    }
}
</script>

<style scoped>
    .siteModel{
        width:100%;
        height:100%;
        background: #f5f5f5;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    .main{
        flex:1;
        height:auto;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .uls{
        width:100%;
        background: #fff;
        box-sizing: border-box;
    }
    .uls li{
        min-height:2rem;
    }
    .name_phone{
        display:block;
       padding-top:.28rem;
        font-size: .3rem;
        padding-left:.3rem;
        text-align: left;
    }
    .name_phone b{
        font-weight: normal;
        padding-left:.3rem;
    }
    .site{
        display: block;
        color:#666;
        padding-left:.3rem;
        margin-top:.2rem;
        text-align: left;
    }
    .default{
        width:100%;
        margin-top:.28rem;
        line-height: .8rem;
        border-bottom:1px solid #eee;
        display:flex;
        justify-content: space-between;
        padding-right:.2rem;
        color:#666;
    }
     .dui {
         font-size: 14px;
     }
    .dui i{
        vertical-align: middle;
        display: inline-block;
        font-style:normal;
        width:.5rem;
        height: 0.5rem;
        border-radius:50%;
        margin-right:.2rem;
        border:1px solid #ccc;
        line-height: .5rem;
        text-align: center;
        font-size:.32rem;
        background: red;
        color:#fff;
    }
    .cancel i{
        padding:.2rem .2rem;
    }

    .footer{
        width: 100%;
        height:1rem;
        text-align: center;
    }

    .add{
        width:70%;
        height:.85rem;
        background:red;
        border:none;
        border-radius:.55rem;
        color:#fff;
        font-size:.29rem;
        outline: none;
        margin:5px 0;
        margin-left:12%;
        
    }


    .head{
        width:100%;
        height:.85rem;
        background: #fff;
        line-height: .85rem;
        display: flex;
        justify-content: space-between;
   
        border-bottom:1px solid #ccc;
        font-size: 14px;
    }
    .icon-home{
        display: inline-block;
        width:.6rem;
        height: 0.6rem;
        border:1px solid #ccc;
        border-radius:50%;
        text-align: center;
        line-height: .6rem;
        margin-top:5px;
    }
</style>
