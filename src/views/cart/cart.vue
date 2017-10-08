<template>
	<div class="shopcar">
		<div class="shop-header">
			<a href="#">
				< </a>
					<h3>购物车</h3>
					<span @click="change_edit">{{edit}}</span>
		</div>
		<div class="shop-content">
			<dl-com v-for="item in list" 
			:item='item' 
			:seletctAll="addClass" 
			:key="item.price"
			@get_id="get_id">
			</dl-com>
		</div>
		<div class="balance">
			<span class="check" :class='{"checked":addClass}' 
			id="balance1" :all="getall" @click="checkedAll">√</span>
			<label for="balance1">全选</label>
			<div class="zong">
				<p>合计：
					<span>￥{{getSum}}</span>
				</p>
				<p>(运费:￥20)</p>
			</div>

			<div class="balance-btn" @click="del">{{edit2}}</div>

		</div>
	</div>
</template>
<script>
import { mapState, mapGetters,mapMutations} from "vuex";
import items from "./dt.vue";
import token from "../../utils/gettoken.js"
export default {
	data() {
		return {
			list: [],
			count: 1,
			addClass: false,
			edit:"编辑",
			edit2:"结算",
			flag:true,
			edit_list:[] //删除状态数组
			
		}

	},
	computed: {
		...mapState(["cart_list"]),
		
		...mapGetters(["getSum"])
	},
	methods: {

		checkedAll() {//全选取反
			this.addClass = !this.addClass
		},
		getall(m) {
			console.log("父" + m)
			this.addClass = m
		},
		pay(){
			this.$router.push("/paylist")
		},
		change_edit(){
			
			if(this.flag){
				this.edit="完成"
				this.edit2="删除"
				this.flag=false;
			}else{
				this.edit="编辑"
				this.edit2="结算"
				this.flag=true;
			}
			
		},
		get_id(obj){
			//console.log(obj);
			let flag=true
			this.edit_list.forEach((val)=>{
				if(val.id==obj.id){
					val.selected=obj.selected;
					flag=false
				}
			})

			if(flag){
				this.edit_list.push(obj)
			}
		},
		del(){
			if(!this.flag){
				
				for(let i=0;i<this.cart_list.length;i++){
					for(let j=0;j<this.edit_list.length;j++){
						if(this.cart_list[i].id==this.edit_list[j].id){
							this.cart_list.splice(i,1);
							i--;
						}
					}
				}
			}
			console.log(token())
			this.$http.post("/del_cart",{list:this.cart_list,token:token()}).then(res=>{
				if(res.status==200){
					this.updated_cart(res.data)
					this.list=res.data
				}
			})
			
		},
		...mapMutations(['updated_cart'])

	},
	components: {
		"dl-com": items
	},
	
	
	created: function() {
		this.list = this.$store.state.cart_list;
		
		this.$http.post("/cart/list",{token:token()}).then((res)=>{
			//let shop_list=res.data;//localStroage中的购物车列表
			//console.log(this.updated_cart)
			this.list=[...res.data]
			
		})
	}
	
}
</script>
<style>
.shopcar {
	display: flex;
	flex-direction: column;
}

.shop-content {
	flex: 1;
	overflow-y: scroll;
}

.balance {
	width: 100%;
	height: 44px;
	display: flex;
}

.balance input {
	margin-top: 17px;
	margin-left: 10px;
}

.balance label {
	line-height: 44px;
}

.zong {
	flex: 1;
	text-align: right;
	padding-right: 10px;
}

.zong p {
	line-height: 20px;
}

.zong p span {
	color: red
}

.balance-btn {
	flex: .6;
	width: 100px;
	height: 44px;
	line-height: 44px;
	color: #fff;
	background: red;
	text-align: center;
}

.shop-header {
	width: 100%;
	height: 44px;
	position: relative;
	border-bottom: .5px solid #ccc;
}

.shop-header a {
	line-height: 44px;
	position: absolute;
	left: 10px;
}

.shop-header span {
	position: absolute;
	right: 15px;
	top: 10px
}

.shop-header h3 {
	text-align: center;
	line-height: 44px;
}

.shop-content {
	width: 100%;
	height: auto;
	background: #f0f0f0;
}

.check {
	width: 20px;
	height: 20px;
	border: 1px solid #ccc;
	border-radius: 50%;
	display: inline-block;
	float: left;
	margin: 50px 0 0 4px;
	color: #fff;
}

.checked {
	width: 20px;
	height: 20px;
	border: 1px solid #ccc;
	border-radius: 50%;
	display: inline-block;
	float: left;
	margin: 50px 0 0 4px;
	background: red;
	color: #fff;
	opacity: 1;
}

#balance1 {
	width: 20px;
	height: 20px;
	border: 1px solid #ccc;
	border-radius: 50%;
	display: inline-block;
	float: left;
	margin: 10px 0 0 4px;
	color: #fff;
}

.shop-content dl {
	width: 100%;
	height: auto;
	margin-top: 20px;
	display: flex;
	background: #fff;
	margin-top: 10px;
}

.shop-content dl dt {
	width: 150px;
	position: relative;
}

.shop-content dl dd {
	margin-left: 5px;
	flex: 1;
}

.shop-content dl dt input {
	position: absolute;
	top: 40px;
	left: 10px;
}

.shop-content dl dt img {
	border: 1px solid #ccc;
	border-radius: 5px;
	width: 100px;
	height: 100px;
	margin-left: 10px;
	margin-top: 10px;
}

.shop-content dl dd p {
	height: 36px;
	overflow: hidden;
	margin-top: 10px;
}

.shop-content dl dd span {
	margin-top: 10px;
	display: block;
}

.price {
	width: 100%;
	height: 35%;
}

.price-left {
	float: left;
}

.price-left span {
	font-size: 13px;
}

.price-left .univalent {
	color: red;
}

.price-right {
	width: 60%;
	float: right;
	margin-top: 20px;
}

.price-right span {
	width: 20px;
	height: 25px;
	border: .5px solid #ccc;
	display: inline-block;
	float: left;
	text-align: center;
	line-height: 25px;
}

.price-right span.jian {
	border-bottom-left-radius: 5px;
	border-top-left-radius: 5px;
}

.price-right span.jia {
	border-bottom-right-radius: 5px;
	border-top-right-radius: 5px;
}

.price-right span.count {
	width: 40px;
}
</style>