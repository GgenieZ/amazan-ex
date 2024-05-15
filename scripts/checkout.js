import {renderOrderSummary} from "./check out/orderSumary.js";
import {renderPaymentSummary} from "./check out/paymentSumary.js"
import { cart } from "../data/cart.js";

updateCheckOut();

export function updateCheckOut (){
let cartQuantity =0;
	cart.forEach((cartItem)=>{
	cartQuantity+=cartItem.quantity
	})
	document.querySelector('.js-return-home').innerHTML =`${cartQuantity} items`
}
renderOrderSummary();
renderPaymentSummary();