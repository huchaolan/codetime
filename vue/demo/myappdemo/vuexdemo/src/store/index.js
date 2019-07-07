import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {
            email: '11111@qq.com'
        }
    },
    modules:{//导入购物车和产品列表模块
        cart,
        products
    }
})