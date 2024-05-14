import { cart } from "../../data/cart.js";
import {getproduct} from "../../data/products.js" ;
import { getDeliveryOption } from "../../data/deliveryOption.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary(){
    let productPriceCents=0;
    let shippingPriceCents =0;
    let cartQuantity =0;
    cart.forEach((cartItem)=>{
	cart.forEach((cartItem)=>{
	cartQuantity+=cartItem.quantity
	})
        const product = getproduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
        shippingPriceCents += deliveryOption.priceCents
    })
    const totalBeforeTaxes = productPriceCents+ shippingPriceCents;
    const taxesCents = totalBeforeTaxes*0.1;
    const totalCents = totalBeforeTaxes + taxesCents;

    const paymentSumaryHTML =
    `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxes)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxesCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `
    document.querySelector('.js-payment-summary').innerHTML=paymentSumaryHTML;
    
}