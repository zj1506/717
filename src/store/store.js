import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
let store=new vuex.Store({
    state:{
        cart_list:[],
        del_list:[],
        adr_list:[]
    },
    mutations:{
        updated_cart(state,data){
            console.log(data)
            state.cart_list=data;
        },
        add_to_cart(state,data){
                let flag=false;
                state.cart_list.forEach((val)=>{
                   
                    if(val.id==data.id){
                        val.count++
                        flag=true;
                    }
                })
                if(!flag){
                    state.cart_list.push(data)
                }
        
                
            
        },
        change_count(state,arr){
            
            state.cart_list.forEach((val)=>{
                if(val.id==arr[0]){
                    val.count=arr[1]
                }
            })
        },
        change_item_selected(state,arr){
             //改变是否被选中
             console.log(state.cart_list[0].id)   
              console.log(arr[0])  
            state.cart_list.forEach((val)=>{
                if(val.id==arr[0]){    
                               
                    val.selected=arr[1]
                }
            })
           
        }
    },
    getters:{
        getSum(state){          
            let sum=0;
            state.cart_list.forEach((val)=>{
                if(val.selected){
                    sum+=val.price*val.count
                }
                
            })
            
            return sum
        }
    }
})

export default store;

