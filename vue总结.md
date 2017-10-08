# vue整理
## vue与angular相比的优点
* api简单，快速上手，学习成本低；
* Angular和vue都支持双向绑定，但vue默认为单向绑定，数据从父组件单向传给子组件；
* 在vue中组件和指令区分的很清楚，指令只封装dom结构,而组件有自己的视图和数据逻辑。angular有些混淆。
* vue的数据更新是根据依赖追踪的观察系统并且异步列队去更新，数据变化都是独立的触发队列中相应的事件。angular的脏检查机制，如果项目比较大，会降低性能。
## vue的引入
* 1、直接使用CDN引入：
	   http://cdn.jsdelivr.net/vue/1.0.26/vue.min.js；
       http://cdnjs.cloudflare.com/ajax/libs/vue/1.0.26/vue.min.js
* 2、下载到本地：
      http://v1-cn.vuejs.org/guide/installation.html 
      此页面可以进行下载开发环境与生产环境的对应文件；
* 3、项目安装：
      使用npm包管理工具进行安装：
      Npm install vue   (此种方式一般在2.0中使用) 
## vue的使用
* 实例化 Vue 时，传入一个对象选项，选项包含数据、模板、挂载元素、方法、生命周期钩子等选项。
* 模板的属性：template、el。注意template中必须有个根节点
* 数据可以对外部数据进行代理，外部传入的数据如果为对象，对此数据进行的浅拷贝，此时我们称为数据的响应式；$watch方法对数据进行监听，在回调函数中接受新值和旧值。
* 方法：methods定义方法,可使用v-on来监听事件.
* 生命周期：在vue实例创建时一系列的初始化步骤：
      beforeCreate、created、beforeComplie、compiled、beforeDestroy、destroyed.
## 常用的指令
* v-for 遍历循环，用于遍历数据，渲染视图。
* v-if v-else 一般用于切换某些功能。
* v-on 监听事件
* v-model 绑定数据
## 自定义指令
* 注册：全局自定义指令通过 Vue.directive(id, definition) 方法注册一个全局自定义指令，接收参数 id 和定义对象。id 是指令的唯一标识，定义对象则是指令的相关属性及钩子函数。directives 选项注册一个局部的自定义指令
## 组件
* 组件注册  全局注册：全局注册需要在根实例初始化前注册，这样才能使组件在任意实例中被使用，方式：Vue.component(“组件名”,组件)。局部注册：组件只能在被注册的组件中使用，而无法在其他组件中使用.方式：Vue.components(“组件名”,组件)
* 组件的选项：template：模板或引入的结构文件。data两个属性，不可以直接赋值，比如data如果直接赋值，组件使用多次的时候，多个组件将公用一个对象；如果一个改变，则所有都会改变；所以使用function方式，每次return出一个新的对象。props：组件间的作用域是孤立的，在vue中，props起到了父子组件间的桥梁作用；
* 组件间通信：
* 父传子方法（一） 属性传递 props
```
//子组件
<template> 
    <ul>
        <li v-for="item in dataList">{{item}}</li>
    </ul> 
</template>

<script>
    export default { 
        props : { dataList : [] }//接收父组件的数据
    }
</script>
//父组件
<template>
//组件的传值
    <component-child v-bind:data-list="dataList"> </component-child> 
    <input v-model="dataInput" v-on:keyup.13="addDataItem()" ></input>
</template>

<script>

import ComponentChild from './child.vue'
export default { 
    data () { 
        return { 
            dataInput: "", 
            dataList : [ 'hello world!','welcome to use vue.js' ] 
        } 
    }, 
    components : { ComponentChild }, //组件的注册
    methods : { 
        addDataItem () { 
            let self = this 
            if( !(self.dataInput && self.dataInput.length > 0) ) { return } 
            self.dataList.push( self.dataInput ) 
            self.dataInput = "" 
        } 
    }
}
</script>
```
* 父传子方法（二） 广播事件传递 vm.$broadcast
```
//子组件
<template> 
    <ul> 
        <li v-for="item in dataList">{{item}}</li> 
    </ul> 
</template>

<script>
export default { 
    data () { 
        return { 
            dataList : [ 'hello world!', 'welcome to use vue.js' ] 
        } 
    }, 
    events : { 
        addChildDataEvent : function ( dataInput ) { 
            this.dataList.push( dataInput ) 
        } 
    }
}
</script>

//父组件
<template> 
    <component-child></component-child> 
    <input v-model="dataInput" v-on:keyup.13="addDataItem()" ></input>
</template>

<script>
    import ComponentChild from './child.vue'
    export default { 
        data () { 
            return { dataInput: "" } 
        }, 
        components : { ComponentChild }, 
        methods : { 
            addDataItem () { 
                let self = this 
                if( !(self.dataInput && self.dataInput.length > 0) ) { return } 
                   //广播到子组件 
                self.$broadcast( 'addChildDataEvent', self.dataInput ) 
                self.dataInput = "" } 
            }
        }
</script>
```