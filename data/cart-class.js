class Cart{
    cartItems;
    #localStorageKey;
    constructor (localStorageKey){
  this.localStorageKey=localStorageKey   
        this.#loadFromStorage()
    }
    #loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey))
    
        if(!this.cartItems){
            this.cartItems =[
                {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId:'2',
                },{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId:'1',
            }];
        }
    }
    saveToStorage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
                }
    addToCart(productId){
        let matchinIitem;
    
        this.cartItems.forEach((cartItem)=>{
            if(productId=== cartItem.productId){
                matchinIitem =cartItem
            }
        })
        if(matchinIitem){
            matchinIitem.quantity+=1;
        }else{
            this.cartItems.push({
                productId,
                quantity:1,
            })
        }
        this.saveToStorage()
        }
        removeFromCart(productId){
        const newCart=[];
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId !== productId){
                newCart.push(cartItem)
            }
        })
        this.cartItems=newCart;
        saveToStorage()
        }
        updateDeliveryOption (productId,deliveryOptionId){
        let matchinIitem;
    
        this.cartItems.forEach((cartItem)=>{
            if(productId=== cartItem.productId){
                matchinIitem =cartItem
            }
        })
        matchinIitem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
        }
        updateCartQuantity(newQuantity,productId){
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId === productId){
                cartItem.quantity=newQuantity
            }
            this.saveToStorage()
        })
        }
        updateCheckOut (){
        let cartQuantity =0;
        this.cartItems.forEach((cartItem)=>{
            cartQuantity+=cartItem.quantity
            })
            document.querySelector('.js-return-home').innerHTML =`${cartQuantity} items`
        }
}


const cart = new Cart('cart-oop');
const bussinessCart = new Cart('cart-bussiness')



console.log(cart)
console.log(bussinessCart)
console.log(bussinessCart instanceof Cart)