<template>
	
	<div class="container">
		
		 <router-view class="wrap"></router-view> 
			
		<nav class="footer">
			<router-link :to="{name:'home'}" tag="em">
				<span class="icon iconfont icon-shouye"></span>
				<p>首页</p>
			</router-link>
			<router-link :to="{name:'list',params:{ind:0}}" tag="em" @click="getlist">
				<span class="icon iconfont icon-fenlei"></span>
				<p>分类</p>
			</router-link>
			<router-link :to="{name:'gam'}" tag="em">
				<span class="icon iconfont icon-shejiao"></span>
				<p>社交</p>
			</router-link>
			<router-link :to="{name:'cart'}" tag="em">
				<span class="icon iconfont icon-gouwuche-kongxin"></span>
				<p>购物车</p>
			</router-link>
			<router-link :to="{name:'mine'}" tag="em">
				<span class="icon iconfont icon-wode"></span>
				<p>我的</p>
			</router-link>

		</nav>
		
	</div>
	


</template>

<script>
import '../../css/fontset.js'
export default {
  name: 'app',
  data () {
    return {
      
    }
  },
    methods:{
        go_to_search(){
            this.$router.push('/search')
		},
		getlist(){
			console.log(11111)
			this.$http.post("/h5/mtop.relationrecommend.wirelessrecommend.recommend").then((res)=>{
				console.log(res)
			})
		}
    }
}
</script>
<style>
.container{
	width: 100%;
	height: 100%;
    display: flex;
    flex-direction: column;
	overflow: hidden;
}	

.wrap{
	flex: auto;
}


.footer{
	width: 100%;
  	height: 1rem;	 
	display:flex;
}
.footer em{
	width: 20%;
	height:50%;
	border-top:1px solid #ccc;
	
}
.footer em span{
	width: 60%;
	height: 60%;
	font-size: 26px;
	display:inline-block;
}
.footer em p{
	font-size: 16px;
}

.router-link-active{
	color:red;
}



</style>