
const _prodcuts = [
    {"id":1,"title":'华为Mate20','price':3999,"inventory":2},
    {"id": 2, "title": "小米 9", "price": 2999, "inventory": 0},
    {"id": 3, "title": "OPPO R17", "price": 2999, "inventory": 5}
]

export default {
    /**
     * 获取产品列表
     * @param {function} cb
     */
    getProducts(cb) {
        setTimeout(()=>cb(_products),100)
    },

    /**
     * 购买产品
     * @param {object} products 产品列表
     * @param {function} cb 购买成功后处理
     * @param {function} errorCb 购买异常处理
     */
    buyProducts(products,cb,errorCb) {
        setTimeout(()=>{
            //模拟购买失败
            Math.random()>0.5
                ?cb()
                :errorCb()
        },100)
    }
}