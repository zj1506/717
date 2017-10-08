<template>
	<div>
		<header class="search-b">
			<input type="text" class="txta" placeholder="请输入您要购买的商品">
			<span>搜索</span>
		</header>
		<div class="classify">
			<div class="classify-left">
				<ul>

					<li  v-for="(x,i) in products" :key="x.id">
						<router-link :to="{name:'list',params:{ind:i}}" tag="p">
							<i class="icon iconfont icon-cart"></i>
							{{x.title}} 
						</router-link>
					</li>

				</ul>

			</div>
			<div class="classify-right">
				<dl v-for="it in products_list" @click="go_to_shop">
					<dt><img :src="it.pic" alt=""></dt>
					<dd>{{it.name}}</dd>
				</dl>
				
			</div>
		</div>
		<mask-com :isActive="isshow" v-if="isif"></mask-com>
	</div>
</template>
<script>
import mask from "../../components/global_mark.vue"
export default {
	data() {
		return {
			isshow: true,
			isif: true,//是否显示遮罩层
			products: [],
			indx:0,	//下标
			products_list:[]  //对应下标产品
		}

	},
	components: {
		"mask-com": mask
	},
	watch:{
		"$route":function(n,o){
			let indx=n.params.ind;
			this.products_list=this.products[indx].items;
		}
	},
	created() {
		this.$http.post("/h5/mtop.relationrecommend.wirelessrecommend.recommend").then((res) => {
			this.products = [...res.data.data.data.result[0].moduleList];
			this.products_list=this.products[0].items;
			//console.log(this.products)
			setTimeout(()=>{
				this.isif=false
			},2000)
			
		})
	},
	methods:{
		go_to_shop:function(){
			this.$router.push("/shop")
		}
	}
}
</script>
<style scoped>
.wrap{
		display: flex;
		flex-direction:column;
		overflow: hidden;
	}
	.classify{
		flex:1;
		overflow-y:scroll;
	}
	.search-b{
		width: 100%;
		height: 44px;
	}
	.txta{
		width: 70%;
		margin-left: 5%;
		text-align: center;
		outline: none;
	}
	.search-b span{
		line-height:44px;
		margin-left: 20px;
		font-size:.3rem;
	}
	.classify{
		width: 100%;
		margin-top: 10px;
	}
	.classify-left{
		width: 30%;
		background: #f0f0f0;
		float: left;
	}
	.classify-left ul li{
		text-align: center;
		height: 40px;
		line-height: 40px;

	}
	.classify-left ul li a{
		display: block;
		width: 100%;
		height: 100%;
	}
	.router-link-active{
		border-left: 2px solid red;
		background: #fff;
		color: red;
	}

	.classify-left ul li i{
		padding-right: 5px;
	}
	.classify-right{
		width: 68%;
		height: 300px;
		float: left;
		margin-left: 2%;
	}
	.classify-right dl{
		width: 33%;
		float: left;
		
	}
	.classify-right dl img{
		width: 90%;
	}
	.classify-right dl dd{
		text-align: center;
	}
</style>
