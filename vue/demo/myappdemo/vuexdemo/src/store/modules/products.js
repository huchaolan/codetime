import shop from '../../api/shop'
import {PRODUCTS} from '../mutation-types'

const state = {
    all:[]
}

const getters = {
}

const actions = {
    /**
     * 获取所有产品信息，相当于ajax请求
     * @param {object} commit
     */
    getAllProducts({commit}) {
        shop.getProducts(products=>{
            commit(PRODUCTS.SET_PRODUCTS,products)
        });
    }
}
const mutations = {
    [PRODUCTS.SET_PRODUCTS](state,products) {
        state.all = products
    },
    [PRODUCTS.DECREMENT_PRODUCT_INVENTORY](state,{id}) {
        const product = state.all.find(product=>product.id===id)
        product.inventory--
    }
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}