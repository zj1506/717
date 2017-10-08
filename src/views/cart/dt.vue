<template>
    
		<dl>
			<dt>
				 <span class="check" 
				 :class='{"checked":addClass}' 
				 @click="checked" >√</span>
      	 		<img :src="item.url" alt="">
   			</dt>
      	 		
      	 	<dd>
      	 		<p>{{item.name}}</p>
      	 		
      	 		<div class="price">
      	 			<div class="price-left">
      	 				<span>x{{count}}</span>
      	 				<span class="univalent">￥{{item.price}}</span>
      	 			</div>
      	 			<div class="price-right">
      	 				<span class="jian" @click="jian">-</span>
      	 				<span class="count">{{count}}</span>
      	 				<span class="jia" @click="jia">+</span>
      	 			</div>
      	 			
      	 		</div>
      	 	</dd>
      	 </dl>
</template>
<script>
export default {
  props:["item","seletctAll"]
  ,
  data(){
	  return {
		  addClass:false,
		  count:1
	  }
  },
	methods:{
		jian() {
			this.count--;
			if(this.count<1){
				this.count=1
			}
			this.$store.commit("change_count", [this.item.id,this.count])
			
		},
		jia() {
			this.count++;
			this.$store.commit("change_count", [this.item.id,this.count])
			
		},
		checked(){		
			this.addClass=!this.addClass;
			//console.log(this.addClass)
			console.log(this.item)
				this.$emit("get_id",{id:this.item.id,selected:this.addClass})
			
			
			
		}
		
	},
	watch:{
		 seletctAll:function(n){
		 	this.addClass=n
		 },
		addClass:function(m){
			console.log(this.item)
			this.$store.commit("change_item_selected",[this.item.id,m])
		}
	},
	mounted:function(){
		this.count=this.item.count;
		this.addClass=this.seletctAll;
	}
}
</script>
<style>
.checked{
		width: 20px;
		height: 20px;
		border:1px solid #ccc;
		border-radius: 50%;
		display:inline-block;
		float:left;
		margin:50px 0 0 4px;
		background: red;
		color:#fff;
		opacity: 1;
	}
</style>


