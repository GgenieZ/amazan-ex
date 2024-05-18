import {renderOrderSummary} from "./check out/orderSumary.js";
import {renderPaymentSummary} from "./check out/paymentSumary.js"
import {updateCheckOut} from "../data/cart.js";
import {loadProductFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js'
//import '../data/backend-pratice.js'

async function loadPage(){
    try{
    console.log('load page')
    await loadProductFetch();
    await new Promise((resolve)=>{
        loadCart(()=>{
            resolve()
        })
    })
}catch{
    console.log('error')
}
    updateCheckOut();
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage()
/*
Promise.all([
    loadProductFetch(),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve()
        })
    })
]).then(()=>{
    updateCheckOut();
    renderOrderSummary();
    renderPaymentSummary();
})



/*loadProduct(()=>{
    updateCheckOut();
    renderOrderSummary();
    renderPaymentSummary();
});
*/
