import axios from "axios";
import AxiosAdapter from "axios-mock-adapter"

let mocker = new AxiosAdapter(axios)

import getGoodsChannel from "../service/goodsChannel.json"
import getGoodsChannel2 from "../service/goodsChannel2.json"
import getGoodsChannel3 from "../service/goodsChannel3.json"
import getaddress from "../service/getaddress.json"
import beijingshi from "../service/beijingshi.json"
import beijing from "../service/beijing.json"




mocker.onPost("/mall/index/getGoodsChannel", { channel_id: 1 }).reply(200, {
    data: getGoodsChannel
})

mocker.onPost("/mall/index/getGoodsChannel", { channel_id: 2 }).reply(200, { data: getGoodsChannel2 })
mocker.onPost("/mall/index/getGoodsChannel", { channel_id: 3 }).reply(200, { data: getGoodsChannel3 })

//淘宝数据
import taobaolist from "../service/taobaolist.json"
mocker.onPost("/h5/mtop.relationrecommend.wirelessrecommend.recommend").reply(200, { data: taobaolist })

//淘宝零食分类
import product from "../service/product.json"
mocker.onPost("/h5/mtop.relationrecommend.wirelessrecommend.recommend").reply(200, { data: product })

//添加购物车
import cart from "../service/taobaocart.json"
mocker.onPost("/h5/mtop.trade.addbag").reply((config) => {
    let token = JSON.parse(config.data).token;
    let item = JSON.parse(config.data).item;

    let ls = window.localStorage;
    let arr = [];
    if (ls.getItem(token)) {
        arr = JSON.parse(ls.getItem(token))
    }
    arr.push(item)
    ls.setItem(token, JSON.stringify(arr))

    return [200, cart]
})
//验证码
mocker.onPost("/certify").reply(function (config) {
    let data = JSON.parse(config.data);
    //console.log(data)
    return [200, data.phone.substr(-4)]
})
//存储注册的用户名  密码
mocker.onPost("/register").reply(function (config) {
    let data = JSON.parse(config.data);
    console.log(data)
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

mocker.onPost("/isLogin").reply(function (config) {
    let data = JSON.parse(config.data);
    let ls = window.localStorage;
    let login_arr = JSON.parse(ls.getItem("keys"));
    let res = false;
    login_arr.forEach((val) => {
        if (val.phone == data.phone && val.pass == data.pass) {
            res = true
        }
    })
    console.log(res)
    if (res) {
        return [200, {
            tocken: data.phone
        }]
    } else {
        return [500, "登陆信息有误"]
    }

})

//地址数据

mocker.onPost("/api.m.taobao.com/h5/com.taobao.mtop.deliver.getdivisionchild", { "divisionCode": "1" }).reply(200, { data: getaddress })
//北京市
mocker.onPost("/api.m.taobao.com/h5/com.taobao.mtop.deliver.getdivisionchild", { "divisionCode": "110100" }).reply(200, { data: beijingshi })
//北京区
mocker.onPost("/api.m.taobao.com/h5/com.taobao.mtop.deliver.getdivisionchild").reply(200, { data: beijing })

//登陆后的已存在的购物车数据
mocker.onPost("/cart/list").reply((config) => {

    let token = JSON.parse(config.data).token;//取cookie里面的1840144

    //  console.log(token)


    let datas = JSON.parse(localStorage.getItem(token))
    return [200, datas]
})
//删除和购物车数据

mocker.onPost("/del_cart").reply((config) => {
    let params=JSON.parse(config.data)
    let token=params.token;
     let list=params.list;
   // let token = JSON.parse(config.data).token;//取cookie里面的1840144
    if(!list){
        list=[]
    }
    console.log(token)
     console.log(list)
    localStorage.setItem(token,JSON.stringify(list))

   // let datas = JSON.parse(localStorage.getItem(token))

    return [200, list]
})
//地址选项渲染
import address from "../service/address.json"

mocker.onPost("/address").reply(200, { data: address })

//存储新增地址信息
mocker.onPost("/save_address").reply((config) => {
    let adr_info = JSON.parse(config.data)
    console.log(adr_info)
    let token = adr_info.token;
    let ls = window.localStorage;
    let arr = [];
    if (!ls.getItem("address_list")) {
        let obj = {};
        adr_info.id = 1;
        obj[token] = [adr_info]
        //console.log(obj)
        ls.setItem("address_list", JSON.stringify(obj))
    } else {
        let objs = JSON.parse(ls.getItem("address_list"));
        //{1834545: Array(1)}
        console.log(token)
        adr_info.id = objs[token].length + 1;
        objs[token].push(adr_info)
        
        ls.setItem("address_list", JSON.stringify(objs))
    }

    let adr_list = JSON.parse(ls.getItem("address_list"));
    // console.log(adr_list)
    return [200, 1]
})

//获取地址信息
mocker.onPost("/get_address").reply((config) => {
    let token = JSON.parse(config.data).token;
    let address_list;
    // console.log(token)
    let ls = window.localStorage;
    if(ls.getItem("address_list")){
         address_list = JSON.parse(ls.getItem("address_list"))[token]
    }
   

    return [200, address_list && address_list]

})

//删除地址
mocker.onPost("/del_adr").reply((config) => {
    let params = JSON.parse(config.data);
    let token = params.token;
    let id = params.id;
    let ls = window.localStorage;
    let obj = JSON.parse(ls.getItem("address_list"));//对象
    let address_list = obj[token];
    let idx;
    address_list.forEach((val, ind) => {
        if (val.id == id) {
            idx = ind
        }
    })
    address_list.splice(idx, 1)
    obj[token] = address_list;
    //更新后台数据
    ls.setItem("address_list", JSON.stringify(obj))
    return [200, address_list]
})

//修改地址
mocker.onPost("/edit_address").reply((config) => {
    let params = JSON.parse(config.data);
    let token = params.token;
    let ind = params.id;//下标
    //console.log(ind)
    let ls = window.localStorage;
    if(ls.getItem("address_list")){
         let address_list = JSON.parse(ls.getItem("address_list"))[token]
        console.log(address_list)
            return [200,address_list[ind]]
    }
   

})
