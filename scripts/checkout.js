import {renderOrderSummary} from "./check out/orderSumary.js";
import {renderPaymentSummary} from "./check out/paymentSumary.js"
import {updateCheckOut} from "../data/cart.js";
import { loadProduct } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js'
//import '../data/backend-pratice.js'

new Promise((resolve)=>
{
    loadProduct(()=>{
    resolve();
   })
}).then(()=>{
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve()
        })
    })
}).then(()=>{
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
