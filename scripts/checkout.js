import {renderOrderSummary} from "./check out/orderSumary.js";
import {renderPaymentSummary} from "./check out/paymentSumary.js"
import {updateCheckOut} from "../data/cart.js";
import { loadProduct } from "../data/products.js";
//import '../data/cart-class.js'
//import '../data/backend-pratice.js'

loadProduct(()=>{
    updateCheckOut();
    renderOrderSummary();
    renderPaymentSummary();
});
