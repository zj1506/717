<template>
	<div>
	  <header class="header">
      <input type="text" placeholder="搜索您想要找的商品" v-model.trim="search_txt">
      <button class="search_btn" @click="search_fn">搜索</button>
    </header>
    <div class="main">
      <div class="hist">
          <p>最近搜索</p>
          <i class="icon iconfont icon-jiagouwuche"></i>
          <ul>
            <li v-for="ite in his_list">{{ite}}</li>
            <!-- <li>大米</li>
            <li>小米</li> -->
          </ul>
      </div>
      <div class="hot">
          <p>大家都在搜</p>
          <ul>
            <li>三黄鸡</li>
            <li>巧克力</li>
            <li>红枣</li>
          </ul>
      </div>
      
    </div>
	</div>


</template>

<script>
export default {
  data () {
    return {
      search_txt:"",
      his_list:[]
    }
  },
  methods:{
    search_fn:function(){
      let ls=window.localStorage;
      let arr=[];
      if(!this.search_txt)return;
        if(ls.getItem("keyss")){
          arr=[...JSON.parse(ls.getItem("keyss"))]
        }
        arr.push(this.search_txt)
      
        ls.setItem("keyss",JSON.stringify(arr))
    }
  },
  created(){
    let sr=localStorage.getItem("keyss")
    console.log(sr)
    this.his_list=[...JSON.parse(sr)]
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
      padding:10px;
      box-sizing: border-box;
    }
    .main p{
      width: 80%;
      text-align: left;
      float:left;
    }
    .main i{
      float:right;
    }
    .main ul{
      width: 100%;
      height:auto;
      clear:both;
    }
    .main ul li{
      width: 30%;
      height: 20px;
      text-align: center;
      border:1px solid #ccc;
      margin:10px;
      border-radius: 5px;
      line-height: 20px;
    }


</style>