<template>
  <div>
      <header class="header">
        <input type="text" placeholder="搜索您想要找的商品">       
      </header>
      <div class="main">
        <ul class="navs">
          <li>综合</li>
          <li>销量</li>
          <li>价格</li>
        </ul>
        <ul class="navs2">
          <li>东南</li>
          <li>西北</li>
          <li>中原</li>
          <li>东北</li>
          <li>西南</li>
        </ul>
        <div class="content_home">
            <com-dl v-for="item in productlist" :item="item" :key="item.id"></com-dl>  
        </div>
      </div>
  </div>
</template>
<script>
import good from "../../components/good.vue"
export default {
  data(){
    return {
      productlist:[] 
    }
    
    }  //产品列表
   ,
  components:{
        "com-dl":good
    },
  mounted:function(){
    this.$http.post("/mall/index/getGoodsChannel", { channel_id: 1 }).then((res) => {
			this.productlist = [...res.data.data.itemList];
			 // console.log(res.data.data.itemList)
			
			
		})
   }
}
</script>
<style>
  .header{
      width: 100%;
      height: .6rem;
      border-bottom:1px solid #ccc;
    }
    .header input{
      margin-left:20px;
      width: 70%;
      height: .5rem;
      line-height: .6rem;
      outline:none;
      border:none;
      background:#F6F6F6;
    }
    .main{
      width: 100%;
      height: auto;

    }
    .navs{
      width: 100%;
      height: 0.44rem;
      display: flex;
      justify-content: center space-around;
    }
    .navs li{
      flex-grow: 1;
    }
    .navs2{
      width: 100%;
      height: 0.44rem;
      display: flex;
      justify-content: center space-around;
    }
    .navs2 li{
      flex-grow: 1;
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


