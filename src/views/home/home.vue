<template>
    <div>
        <header>
            <img src="../../static/img/1_03.png" alt="">
            <input type="text" @focus="go_to_search" placeholder="请输入您要购买的商品">
            <ul>
                <li></li>
                <li></li>
            </ul>
        </header>
        <section @scroll="load_more" ref="main">
            <div class="main_wrap">

                <div class="swiper-container">
                    <ul class="swiper-wrapper">
                        <li class="swiper-slide"><img src="../../static/img/pic_1.png"></li>
                        <li class="swiper-slide"><img src="../../static/img/pic_2.png"></li>
                        <li class="swiper-slide"><img src="../../static/img/pic_3.png"></li>
                        <li class="swiper-slide"><img src="../../static/img/pic_4.png"></li>
                    </ul>
                    <div class="swiper-pagination"></div>
                </div>
                <nav>
                    <ul>
                        <li>
                            <span><img src="../../static/img/swiper1.png" alt=""></span>家乡味道</li>
                        <li>
                            <span><img src="../../static/img/swiper2.png" alt=""></span>进口食品</li>
                        <li>
                            <span><img src="../../static/img/swiper3.png" alt=""></span>牛奶乳品</li>
                        <li>
                            <span>
                                <img src="../../static/img/swiper4.png" alt="">
                        
                            </span>茶果饮品</li>
                    </ul>
                    <ul>
                        <li>
                            <span><img src="../../static/img/swiper5.png" alt=""></span>米面粮油</li>
                        <li>
                            <span><img src="../../static/img/seiper6.png" alt=""></span>休闲零食</li>
                        <li>
                            <span><img src="../../static/img/swiper7.png" alt=""></span>酒水调料</li>
                        <li>
                            <span><img src="../../static/img/swiper8.png" alt=""></span>家乡味道</li>
                    </ul>
                </nav>
                <div class="text">
                    <div class="icon">商城动态</div>
                    <ul>
                        <li>绿色无公害 无污染 无添加</li>
                        <li>绿色无公害 无污染 无添加</li>
                    </ul>
                </div>
                <div class="title_n">
                    <img src="../../static/img/2_03.png" alt="">
                    <h3>天天特惠</h3>
                    <span>每天都有惊喜</span>
                    <a href="#">更多></a>
                </div>
                <p class="p"></p>
                <div class="coupon">
                    <div class="coupon-left">
                        <img src="../../static/img/home1.png" alt="">
                    </div>
                    <div class="coupon-right">
                        <img src="../../static/img/ruwei.png" alt="">
                        <img src="../../static/img/gaodian.png" alt="">
                    </div>
                </div>
                <p class="p"></p>
                <div class="homeBox">
                    <div class="title_n title_ns">
                        <p>————<img src="../../static/img/2_03.png" alt="">家乡的味道————</p>
                        <a href="#">更多></a>
                    </div>
                    <p class="p"></p>
                    <div class="content_home ks-clear">
                         <com-dl v-for="item in homeList" :item="item" @active-show="changeActive" :key="item.id"></com-dl>                         
                    </div>

                </div>
                <div class="loading" v-if="isShow">{{loadtxt}}</div>
                <tips-com :isActive="active"> 添加成功</tips-com>
            </div>
        </section>

    </div>
</template>
<script>
import axios from "axios";
import good from "../../components/good.vue"
import tips from "../../components/tip.vue"

export default {
    name: 'home',
    data() {
        return {
            homeList: [],
            isadd: true,//是否加载
            num: 1,
            isShow: true,//loading是否显示
            loadtxt:"loading...",
            active:false
        }
    },
    components:{
        "com-dl":good,
        "tips-com":tips
    },
  
    methods: {
        go_to_search() {
            this.$router.push('/search')
        },
        changeActive(data){
          this.active= data
          setTimeout(()=>{
              this.active= false
          },1000)
        },
        load_more() {
            let main = this.$refs.main;
            let mainH = main.offsetHeight;
            let scrollTop = main.scrollTop;
            let height = document.querySelector(".main_wrap").offsetHeight;

            if (scrollTop + mainH >= height - 10) {

                if (this.isadd) {
                    this.isadd = false;
                    this.num++;
                   // console.log(this.num)
                    if (this.num > 3) {
                        this.loadtxt="我是有底线的"
                        //console.log(this.num + "停止")
                        return
                    }
                    setTimeout(()=>{
                         axios.post("/mall/index/getGoodsChannel", { channel_id: this.num }).then((res) => {
                           this.homeList =this.homeList.concat(res.data.data.itemList)
                          //  console.log(this.homeList)
                            this.isadd = true;

                        })
                    },2000)
                   



                }

            }

        }
    },
    mounted: function() {
        new Swiper(".swiper-container", {
            autoplay: 1000,
            loop: true,
            pagination: ".swiper-pagination"
        })
        axios.post("/mall/index/getGoodsChannel", { channel_id: 1 }).then((res) => {
         
            this.homeList = [].concat(res.data.data.itemList)
            // console.log(res.data.data.itemList)
        })
    }
}
</script>
<style>

@import url("../../css/swiper-3.3.1.min.css");
.loading {
    width: 100%;
    height: 30px;
    background: rgba(0, 0, 0, .3)
}

.swiper-container {
    width: 100%;
    height: 150px;
    overflow: hidden;
}

.swiper-container img {
    width: 100%;
    height: 100%;
}

.wrap {
    display: flex;
    flex-direction: column;
    flex: 1;
}

section {
    flex: 1;
    overflow-y: scroll;
}

header {
    width: 100%;
    height: 44px;
}

header img {
    width: 60px;
    height: 30px;
    float: left;
    margin-left: 10px;
    margin-top: 5px;
}

header input {
    float: left;
    width: 50%;
    height: 30px;
    border-radius: 5px;
    background: #f5f5f5;
    border: none;
    margin-top: 5px;
    padding-left: 10px;
}

section {
    width: 100%;
    height: auto;
}

section .swiper {
    width: 100%;
    height: 150px;
}

section .swiper img {
    width: 100%;
    height: 100%;
}

section nav {
    width: 100%;
    height: 150px;
}

section nav ul {
    width: 100%;
    height: 50%;
    display: flex;
}

section nav ul li {
    width: 25%;
    height: 75px;
    text-align: center;
}

section nav ul li span {
    width: 40px;
    height: 40px;
    background: #f8c986;
    border-radius: 50%;
    display: block;
    margin-left: 15px;
    margin-top: 5px;
    line-height: 40px;
    color: #fff;
}

section nav ul li span img {
    width: 100%;
    height: 100%;
}

.text {
    width: 90%;
    height: 44px;
    display: flex;
    margin-left: 5%;
}

.text .icon {
    width: 40px;
    font-size: 15px;
    color: #ff6d00;
}

.text ul {
    flex: 1;
    height: 38px;
    border: .5px solid #ccc;
    border-radius: 5px;
    margin-top: 3px;
}

.title_n {
    width: 100%;
    height: 44px;
    margin-top: 10px;
    display: flex;
    position: relative;
}

.title_n img {
    width: 30px;
    height: 30px;
    margin-left: 15px;
}

.title_n h3 {
    font-size: .3rem;
    color: #ff6d00;
    line-height: 35px;
    margin-left: 5px;
}

.title_n span {
    line-height: 35px;
    margin-left: 10px;
}

.title_n a {
    text-decoration: none;
    position: absolute;
    right: 10px;
    top: 5px;
    color: #000;
}

.title_ns {
    height: 40px
}

.title_ns p {
    width: 100%;
    text-align: center;
    color: #ff6d00;
}

.title_ns img {
    width: 20px;
    height: 20px;
}

.p {
    width: 100%;
    height: 3px;
    background: #eeeeee;
}

.coupon {
    width: 100%;
    height: 160px;
    display: flex;
    background: #eeeeee;
}

.coupon .coupon-left {
    width: 48%;
    margin-left: 1%;
}

.coupon .coupon-left img {
    width: 100%;
    height: 99%;
}

.coupon .coupon-right {
    width: 48%;
    margin-left: 2%;
}

.coupon .coupon-right img {
    width: 100%;
    height: 48%;
}

.content_home {
    width: 100%;
    height: auto;
}

.content_home dl {
    width: 49%;
    height: 246px;
    background: #fff;
    float: left;
    margin-left: 1%;
}
/* .content_home dl dt{
     height: 70%;
} */

.content_home dl dt img {
    width: 95%;
    height: 70%;
    margin-left: 2%;
}

.content_home dl dd p {
    margin-left: 5px;
    height: 36px;
    overflow: hidden;
}

.content_home dl dd span {
    color: red;
    margin-left: 5px;
}

.content_home dl dd i {
    color: red;
    margin-left: 50%;
}
</style>

