import Vue from "vue"
import VueRouter from "vue-router"
import entry from '../views/entry/entry.vue'
import home from '../views/home/home.vue'
import list from '../views/list/list.vue'
import gam from '../views/gam/gam.vue'
import cart from '../views/cart/cart.vue'
import mine from '../views/mine/mine.vue'
import search from '../views/search/search.vue'
import shop from '../views/shop/shop.vue'
import login from '../views/login/login.vue'
import paylist from '../views/paylist/paylist.vue'
import addresslist from '../views/addresslist/addresslist.vue'
import addadr from '../views/addadr/addadr.vue'
import settings from '../views/settings/settings.vue'


Vue.use(VueRouter)

let routes=[
	{
		path:"/",
		redirect:"/entry/home"
	},
	{
		name:"search",
		path:"/search",
		component:search
	},
	{
		name:"shop",
		path:"/shop",
		component:shop
	},
	{
		name:"login",
		path:"/login",
		component:login
	},
	{
		name:"paylist",
		path:"/paylist",
		component:paylist
	},
	{
		name:"addresslist",
		path:"/addresslist",
		component:addresslist
	},
	{
		name:"addadr",
		path:"/addadr/:id?",
		component:addadr
	},
	{
		name:"settings",
		path:"/settings",
		component:settings
	},
	{
		name:"entry",
		path:"/entry",
		component:entry,
		children:[
			{
				name:"home",
				path:"home",
				component:home
			},
			{
				name:"list",
				path:"list/:ind?",
				component:list
			},
			{
				name:"gam",
				path:"gam",
				component:gam
			},
			{
				name:"cart",
				path:"cart",
				component:cart
			},			
			{
				name:"mine",
				path:"mine",
				component:mine
			}

		]
	}
	


]


let router = new VueRouter({
	routes
})

router.beforeEach(function(to,from,next){
	//console.log(to)//to.mane  打印出当前路由  home
	if(to.name=="login"){
		next()
	}else if(to.name=="mine"){
		console.log("到了mine")
		let cookie_list=document.cookie.split(";")
		//console.log(cookie_list)
		let token=null;
		cookie_list.forEach((val)=>{
			if(val.indexOf("1505B")>-1){
				//console.log(111111)
				token=val.split("=")[1]
				
			}
		})
		//console.log(token)
		if(!token){
			next({
				path:"/login"
			})
		}else{
			next()
		}
	 }else{
	 	next()
	 }
	
})


export default router;
