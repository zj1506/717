<template>
  <div class="mask" :class='{"active":isActive}'>
    <span><i class="icon iconfont icon-trashbin"></i></span>
  </div>
</template>
<script>
export default {
  props:["isActive"]
}
</script>
<style>
    .mask{
        position: absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        color:#fff;
        background:rgba(0,0,0,.8);
        display:none;
        
    }
    .mask span{
         width: 100px;
        height: 100px;
        display:inline-block;
    }
    .mask i{
       
        
        font-size: 60px;
        color:red;
    }
    .active{
        display:block;
    }
</style>


