<template>
  <div class="wrap">
      <header class="header">
          <span class="backbtn"> < 返回</span>
          <p>订单支付</p>
      </header>
      <div class="main">
          <p  class="address" @click="go_to_address">未添加地址,请添加地址<span> > </span></p>
          
      </div>
  </div>
</template>
<script>
export default {
  methods:{
     go_to_address(){
         this.$router.push("/addresslist")
     } 
  }
}
</script>
<style>
.wrap{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
}
    .header{
        width:100%;
        height: 44px;
        text-align: center;
        position: relative;
        line-height: 44px;
        border-bottom: 1px solid #ccc;
    }
    .backbtn{
        width: 80px;
        height: 44px;
        position: absolute;
        left: 10px;
        top:0;
        
    }
    .main{
        width:100%;
        height: auto;
        flex:1;
    }
    .address{
        height:50px;
        line-height: 50px;
        position: relative;
        text-align: left;
        text-indent: 20px;
    }
    .address span{
        position:absolute;
        right: 10px;
        top:0;
        width: 60px;
        height:50px;
    }
</style>


