import {renderOrderSummary} from "./check out/orderSumary.js";
import {renderPaymentSummary} from "./check out/paymentSumary.js"
import {updateCheckOut} from "../data/cart.js";
import '../data/cart-class.js'

updateCheckOut();
renderOrderSummary();
renderPaymentSummary();