<template>
  <div class="wrap">
  	<header class="mine_head">
         <i class="icon iconfont icon-gouwuche-kongxin" @click="go_to_settings"></i> 
         <h2>我的食品商城</h2>  
      </header>
  	<div class="main">
  		<div class="loginPhoto">
  			<dl>
  				<dt><img src="../../static/img/mypic.png" alt=""></dt>
  				<dd>14344233</dd>
  			</dl>
  		</div>
  		<div class="myshop">
  			<p><img src="../../static/img/mypic.png" alt="">我的店铺<span>></span></p>
  		</div>
  		<div class="mine_list">
  			<ul>
  				<li>
  					<em class="icon iconfont icon-shejiao:before"></em>
  					<a href="javascript:;">待付款</a>
  				</li>
  				<li>
  					<em class="icon iconfont icon-shejiao:before"></em>
  					<a href="javascript:;">待发货</a>
  				</li>
  				<li>
  					<em class="icon iconfont icon-shejiao:before"></em>
  					<a href="javascript:;">待收货</a>
  				</li>
  				<li>
  					<em class="icon iconfont icon-shejiao:before"></em>
  					<a href="javascript:;">售后</a>
  				</li>
  				<li>
  					<em class="icon iconfont icon-shejiao:before"></em>
  					<a href="javascript:;">我的订单></a>
  				</li>
  			</ul>
  		</div>
		<div class="mine_more">
			<p><em class="icon iconfont icon-shejiao:before"></em>我的社区<span>></span></p>
			<p><em class="icon iconfont icon-shejiao:before"></em>账户余额<span>></span></p>
			<p @click="go_to_addAddress"><em class="icon iconfont icon-shejiao:before"></em>地址管理<span>></span></p>
		</div>
		<b>热门推荐</b>
		<div class="mine_recommend">
			<a href="javascript:;">
				<dl>
					<dt>
						<img src="../../static/img/mypic.png" alt="">
					</dt>
					<dd>
						<h5>
							当时就觉得返回都是返回假的课就是发喝点水健康1L1*2/瓶
						</h5>
						<h6>￥<small>258.00</small><em class="icon iconfont icon-cart"></em></h6>
					</dd>
				</dl>
			</a>
			<a href="javascript:;">
				<dl>
					<dt>
						<img src="../../static/img/mypic.png" alt="">
					</dt>
					<dd>
						<h5>
							当时就觉得返回都是返回假的课就是发喝点水健康1L1*2/瓶
						</h5>
						<h6>￥<small>258.00</small><em class="icon iconfont icon-cart"></em></h6>
					</dd>
				</dl>
			</a>
			<a href="javascript:;">
				<dl>
					<dt>
						<img src="../../static/img/mypic.png" alt="">
					</dt>
					<dd>
						<h5>
							当时就觉得返回都是返回假的课就是发喝点水健康1L1*2/瓶sdsvcd
						</h5>
						<h6>￥<small>258.00</small><em class="icon iconfont icon-cart"></em></h6>
					</dd>
				</dl>
			</a>
		</div>
		<p class="mine_nomore">没有更多了喔~~~^.^</p>
  	</div>
  </div>
  
</template>
<script>
import router from '../../routes/routes.js'
export default {
  name:"mine",
  data:function(){
	  return{

	  }
  },
  methods:{
	  go_to_settings(){
	  	this.$router.push('/settings')
    },
    go_to_addAddress(){
      this.$router.push('/addresslist')
    }
  },
  beforeRouteEnter: (to, from, next) => {
    // ...
    //router.push('/login');
    next();
  },
  mounted(){
    console.log(this.$route)
  }
}
</script>
<style scoped>
#wrap {
  /* display: flex;
  flex-direction: column; */
  flex:1;
  overflow-y:scroll;
  background: #eee;
  width: 100%;
}

.mine_head{
    width: 100%;
    height: 40px;
    position: relative;
    border-bottom: .5px solid #ccc;

  }
  .mine_head i{
    position: absolute;
    left: 10px;
    top: 8px;
  }
  .mine_head h2{
    font-weight: normal;
    line-height: 40px;
    text-align: center;
    font-size: .3rem;

  }

.main {
  flex: 1;
  overflow-y: scroll;
}
.main .loginPhoto {
  width: 100%;
  height: 1.5rem;
  background: #FC6E41;
}
.main .loginPhoto dl {
  width: 1rem;
  height: 1rem;
  margin-left: 43%;
}
.main .loginPhoto dl dt {
  width: 1rem;
  height: 1rem;
  padding-top: 0.15rem;
}
.main .loginPhoto dl dt img {
  width: 100%;
  height: 100%;
}
.main .loginPhoto dl dd {
  padding-top: 0.1rem;
  height: 0.3rem;
  color: #fff;
  line-height: 0.3rem;
}
.main .myshop {
  box-sizing: border-box;
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  background: #fff;
}
.main .myshop p {
  width: 100%;
  height: 100%;
  line-height: 1rem;
  border-bottom: 1px solid #eee;
  font-size: 0.3rem;
  color: red;
}
.main .myshop p img {
  width: 0.7rem;
  height: auto;
  color: red;
  margin-right: 0.25rem;
  vertical-align: middle;
}
.main .myshop p span {
  float: right;
}
.main .mine_list {
  width: 100%;
  height: 1.5rem;
  margin-bottom: 0.2rem;
  background: #fff;
}
.main .mine_list ul {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main .mine_list ul li {
  flex: 1;
  text-align: center;
}
.main .mine_list ul li em {
  font-size: 0.4rem;
  color: #444;
}
.main .mine_list ul li a {
  display: block;
  color: #444;
}
.main .mine_list ul li:last-child {
  border-left: 1px solid #eee;
}
.main .mine_more {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  background: #fff;
  margin-bottom: 0.15rem;

}
.main .mine_more p {
  box-sizing: border-box;
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: left;
  padding:0 10px;

  color: #444;
  border-bottom: 1px solid #eee;
}
.main .mine_more p em {
  font-size: 0.4rem;
  color: #444;
  margin-right: 0.15rem;
}
.main .mine_more p span {
  float: right;
}
.main b {
  display: block;
  width: 100%;
  height: 0.7rem;
  line-height: 0.7rem;
  background: #fff;
  text-align: center;
  font-weight: 400;
  font-size: 0.3rem;
  margin-bottom: 0.2rem;
}
.main .mine_recommend {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
}
.main .mine_recommend a {
  display: block;
  width: 46%;
  height: 4rem;
  margin: 0.1rem;
  background: #fff;
}
.main .mine_recommend a dl {
  width: 100%;
  height: 100%;
}
.main .mine_recommend a dl dt {
  width: 100%;
  height: 3rem;
}
.main .mine_recommend a dl dt img {
  width: 100%;
  height: 100%;
}
.main .mine_recommend a dl dd h5 {
  font-size: 0.22rem;
  font-weight: 400;
  display: -webkit-box;
  word-break: break-all;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-indent: 2;
}
.main .mine_recommend a dl dd h6 {
  font-size: 0.24rem;
  font-weight: 400;
  color: red;
  padding: 0 0.1rem 0.1rem 0.1rem;
}
.main .mine_recommend a dl dd h6 em {
  float: right;
  font-size: 0.3rem;
  display: block;
}
.main .mine_nomore {
  display: block;
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.24rem;
}

/*# sourceMappingURL=tem.css.map */

</style>
