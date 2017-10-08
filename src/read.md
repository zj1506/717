# 717安全食品商城项目
## 项目概要
 * 本项目主要用vue-cli脚手架搭建
 * vuex管理数据
 * 借助axios-mock-adapter：axios的模拟调试器，来模拟数据
 * localStorage模拟数据库的数据存储
## 地址管理
* 地址存储：向服务器发送请求，参数携带用户信息及token身份令牌，以数组形式存储，数组中每个子集以对象的形式存储，键名token，键值为数组形式存储用户信息、id等
* 地址列表：通过token身份令牌，到数据库取出用户存储的地址列表，渲染到页面列表
* 地址删除：通过向服务器发送删除地址的下标+1，将服务器中token相对应的数组取出遍历匹配相应id值，操作数组后，重新更新数据库
* 地址修改：通过params参数传递需要修改地址的下标，将服务器中token相对应的数组取出遍历匹配相应id值，相匹配的一组数据返回给客户端渲染，进行修改后重新存储到数据库
## 公共部分路由entry
* entry主要内容是footer部分，功能主要提供的是切换子路由，以及部分路由传参传参
* 运用vue-router中的<router-link>组件支持用户在具有路由功能的应用中导航。通过to属性指定目标地址，默认渲染成a链接，可通过配置tag更改生成别的标签。
```
<router-link :to="{name:'home'}" tag="em">
	<p>首页</p>
</router-link>
```


## 路由的搭建:
* 引入vue和vue-router，Vue.use调用install里面的组件，配置路由参数routes，将routes注入到路由实例中，最后抛出路由实例。
```
//在routes.js中配置路由
      import Vue from "vue"
      import VueRouter from "vue-router"
      Vue.use(VueRouter)
      let routes=[
        {
            path:"/",
            //重定向
            redirect:"/entry/home"
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
                }
            ]
        }
    ]
    let router = new VueRouter({
        routes
    })
    export default router;
```
## 首页---home部分
* 首页home为entry子路由，功能部分的技术点主要包括
* 搜索功能：切换路由至搜索页，用@focus获取焦点触发go_to_search方法，跳转路由，运用localStorage模拟数据库，请求返回搜索过的数据，渲染到最近搜索相应的结构中
```
<input type="text" @focus="go_to_search" placeholder="请输入您要购买的商品">
go_to_search() {
    this.$router.push('/search')
}
```
* search页面
单击搜索按钮时，将文本框内容存储到localStorage里面，进行页面最近搜索结构里v-for；
```
<input type="text" placeholder="搜索您想要找的商品" v-model.trim="search_txt">
search_fn:function(){//存储到localStorage里面
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
  created(){//取出数据，v-for渲染到页面
    let sr=localStorage.getItem("keyss")
    console.log(sr)
    this.his_list=[...JSON.parse(sr)]
  }

```

* 首页---轮播图
* swiper插件的运用，做首页轮播图,引入在mounted里面运行
在main.js引入import './css/swiper-3.3.1.min.js'
home文件中@import url("../../css/swiper-3.3.1.min.css");
```
new Swiper(".swiper-container", {
            autoplay: 1000,
            loop: true,
            pagination: ".swiper-pagination"
        })

```
* 首页---家乡味道
* 渲染商品列表：
定义局部组件good,v-for遍历商品数据，:item="item"动态传参,good组件中props: ["item"]接收，渲染到结构中。点击购物车图标调用add_to_cart方法。定义load_more方法，根据滚动条滑动距离判断是否加载更多。
```
//home页
components:{
     "com-dl":good
 }
 <com-dl v-for="item in homeList" :item="item" @active-show="changeActive"></com-dl>

<section @scroll="load_more">

load_more() {//手否加载更多
            let main = this.$refs.main;
            let mainH = main.offsetHeight;
            let scrollTop = main.scrollTop;
            let height = document.querySelector(".main_wrap").offsetHeight;
            if (scrollTop + mainH >= height - 10) {
                if (this.isadd) {
                    this.isadd = false;
                    this.num++;
                    if (this.num > 3) {
                        this.loadtxt="我是有底线的"
                        return
                    }
                    setTimeout(()=>{
                         axios.post("/mall/index/getGoodsChannel", { channel_id: this.num }).then((res) => {
                           this.homeList =this.homeList.concat(res.data.data.itemList)
                            this.isadd = true;
                        })
                    },2000)
                }
            }
        }

 //good页面
 add_to_cart: function() {
     //模拟请求数据，传参内容商品名，价格，图片路径，商品id,数量，身份令牌等
            this.$http.post("/h5/mtop.trade.addbag", {
                item: {
                    name:this.item.name.shortName,
                    price:this.item.price.actPrice,
                    url:this.item.baseinfo.picGroup[0],
                    id: this.item.baseinfo.juId,
                    count: 1,
                    token: token()
                }, token: token()
            }).then((data) => {
                if (data.status == 200) {
                    this.$emit("active-show", true)
                    let data = {
                        id: this.item.baseinfo.juId,
                        name: this.item.name.shortName,
                        price: this.item.price.actPrice,
                        count: 1,
                        url: this.item.baseinfo.picGroup[0],
                        selected: false
                    }
                    this.$store.commit("add_to_cart", data)
                }
                this.$router.push("/entry/cart")
            })
        }
//mock.js中  模拟数据返回
import axios from "axios";
import AxiosAdapter from "axios-mock-adapter"
let mocker = new AxiosAdapter(axios)
import getGoodsChannel from "../service/goodsChannel.json"
mocker.onPost("/mall/index/getGoodsChannel", { channel_id: 1 }).reply(200, {
    data: getGoodsChannel
})

```

## 分类
* 左侧导航栏渲染：通过watch检测$route变化发起axios请求，渲染导航栏。
```

watch:{//根据下标改变，切换数据
		"$route":function(n,o){
			let indx=n.params.ind;
			this.products_list=this.products[indx].items;
		}
	}
```
* 右侧视图区渲染：切换路由时created默认发起axios请求，传递参数默认为下标0，根据下标返回相应的分类数据，进行右侧视图区渲染
```
created() {//默认下标0的数据
		this.$http.post("/h5/mtop.relationrecommend.wirelessrecommend.recommend").then((res) => {
			this.products = [...res.data.data.data.result[0].moduleList];
			this.products_list=this.products[0].items;
			//console.log(this.products)
			setTimeout(()=>{
				this.isif=false
			},2000)
			
		})
	}
```
##我的---登陆注册
* 用localStroage模拟后台数据库,用1个变量控制v-if和v-else切换。登陆发送数据，对比本地存储中是否匹配。
```
register() {//注册模拟发送数据
            this.$http.post("/register", {
                phone: this.phone_number,
                pass: this.password
            }).then((res) => {
                if (res.status == 200) {
                    this.is_login = true
                }
            })
        }
//mock.js
mocker.onPost("/register").reply(function (config) {
    let data = JSON.parse(config.data);
    let ls = window.localStorage;
    let arr = [];
    if (!ls.getItem("keys")) {
        arr.push(data)
    } else {
        arr = JSON.parse(ls.getItem("keys"))
        arr.push(data)
    }
    ls.setItem("keys", JSON.stringify(arr))
    return [200, "注册成功"]
})

//登陆
logined() {
            this.$http.post("/isLogin", {
                phone: this.login_phone,
                pass: this.login_pass
            }).then((res) => {
                console.log(res)
                if(res.status==200){
                    document.cookie="1505B="+res.data.tocken;
                    this.$router.push({name:'mine'})
                }else{
                    console.log(res[1])
                }
            })
        }

```
##我的---地址管理
* 点击新增地址按钮，跳转路由输入用户相关信息，v-model绑定，将数据存储到localStorage里
```
created() {

        //地址的渲染
        let get_address_info = new Promise((resolve,reject)=>{
            this.$http.post('/address').then((res)=>{
                  this.sheng_list=res.data.data;
                resolve(res.data.data)
                
            })
        })
        //编辑地址，根据Id到后台找出对应数据，localStorage存储形式以address_list为键名，以对象形式存储，token为键名，当前用户地址信息为键值。
        let edit_address_info = new Promise((resolve,reject)=>{
            let id = this.$route.params.id
            this.$http.post('/edit_address',{id:id,token:token()}).then((res)=>{
    
               resolve(res.data)
                
            })
        })

        Promise.all([get_address_info,edit_address_info]).then((res)=>{
            this.sheng_list = res[0];
            if(res[1]){
                用户信息
            }
        })
    }

//mock.js
//修改地址
mocker.onPost("/edit_address").reply((config) => {
    let params = JSON.parse(config.data);
    let token = params.token;
    let ind = params.id;//下标
    let ls = window.localStorage;
    if(ls.getItem("address_list")){
         let address_list = JSON.parse(ls.getItem("address_list"))[token]
        console.log(address_list)
            return [200,address_list[ind]]
    }
})
```
## 购物车---添加删除功能
* 添加删除：在编辑所在的span标签上绑定click事件，用一个变量改变span的内容，用于切换编辑和删除的状态。
```
<span @click="change_edit">{{edit}}</span>
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
	}
//获取vuex里面购物车里的数据
created: function() {
		this.list = this.$store.state.cart_list;
		
		this.$http.post("/cart/list",{token:token()}).then((res)=>{
			//let shop_list=res.data;//localStroage中的购物车列表
			//console.log(this.updated_cart)
			this.list=res.data
			
		})
	}
//删除，当span内容为完成时，给删除按钮绑定click事件del.
del(){
			if(!this.flag){
				//购物车数据和要删除的数组对比去重
				for(let i=0;i<this.cart_list.length;i++){
					for(let j=0;j<this.edit_list.length;j++){
						if(this.cart_list[i].id==this.edit_list[j].id){
							this.cart_list.splice(i,1);
							i--;
						}
					}
				}
			}
            //更新本地存储里面的购物车数据
			this.$http.post("/del_cart",{list:this.cart_list,token:token()}).then(res=>{
				if(res.status==200){
					this.updated_cart(res.data)
					this.list=res.data
				}
			})
			
		}
```
* 渲染列表：定义组件dl-comp,v-for循环渲染,根据class名addClass判断当前是否被选中，选中为true，
```
components: {
		"dl-com": items
	}
<dl-com v-for="item in list" 
			:item='item' 
			:seletctAll="addClass" 
			:key="item.price"
			@get_id="get_id">
			</dl-com>
```
* 计算总价：首先判断当前商品是否被选中，通过watch检测是否被添加class选中样式，将被选中商品信息传递给给vuex中的mutations方法中，将这些被选中的商品放到数组中进行遍历循环，计算结果，通过mapGetters映射到结构中总计的位置。
```
checked(){//改变选中状态
	this.addClass=!this.addClass;
		this.$emit("get_id",{id:this.item.id,selected:this.addClass})			
	}
//@get_id="get_id"调用
get_id(obj){
	let flag=true
	this.edit_list.forEach((val)=>{
	    if(val.id==obj.id){//匹配id，改变选中状态
			val.selected=obj.selected;
				flag=false
			}
		})
        //没有相同id直接添加到编辑列表中
		if(flag){
			this.edit_list.push(obj)
		}
	}
//计算
...mapGetters(["getSum"])
getSum(state){ //遍历被选中计算和     
            let sum=0;
            state.cart_list.forEach((val)=>{
                if(val.selected){
                    sum+=val.price*val.count
                }
                
            })
            
            return sum
        }
```
* 更改数量：通过v-model双向数据绑定，在methods中定义加减方法，在加减按钮上绑定点击事件，将改变后的值赋值给v-model绑定的位置。

