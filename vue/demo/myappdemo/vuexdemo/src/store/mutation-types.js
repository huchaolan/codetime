/**
 * 购物车的action
 */
export const CART = {
    /**
     * 向购物车添加商品
     */
    PUSH_PRODUCT_TO_CART:'pushProductToCart',
    /**
     * 添加物件的数量
     */
    INCREMENT_ITEM_QUANTITY:'incrementItemQuantity',
    /**
     * 设置购物车商品
     */
    SET_CART_ITEMS:'setCartItems',
    /**
     * 设置购物车的状态
     */
    SET_CHECKOUT_STATUS:'setCheckoutStatus',
}
/**
 * 产品的Action
 */
export const PRODUCTS = {
    /**
     *设置所有产品的信息
     */
    SET_PRODUCTS: 'setProducts',
    /**
     * 减库存
     */
    DECREMENT_PRODUCT_INVENTORY:'decrementProductInventory'
}