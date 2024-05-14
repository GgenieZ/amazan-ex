import {cart,removeFromCart,updateDeliveryOption} from "../../data/cart.js";
import {products,getproduct} from "../../data/products.js" ;
import{formatCurrency} from "../utils/money.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import {deliveryOptions,getDeliveryOption} from "../../data/deliveryOption.js"
import { renderPaymentSummary } from "./paymentSumary.js";

export function renderOrderSummary(){
    let cartSummaryHTML='';
    cart.forEach((cartItem)=>{
        const productId = cartItem.productId;
        const matchinProduct = getproduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId
       const deliveryOption = getDeliveryOption(deliveryOptionId)
        
        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays,
            'days'
        )
        const DateString = deliveryDate.format(
            'dddd, MMMM D'
        )
        


        cartSummaryHTML +=
        `<div class="cart-item-container js-cart-container-${matchinProduct.id}">
        <div class="delivery-date">
        Delivery date: ${DateString}
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image"
            src="${matchinProduct.image}">

        <div class="cart-item-details">
            <div class="product-name">
            ${matchinProduct.name}
            </div>
            <div class="product-price">
    ${formatCurrency(matchinProduct.priceCents)}
            </div>
            <div class="product-quantity">
            <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchinProduct.id}">
                Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchinProduct.id}">
                Delete
            </span>
            </div>
        </div>
        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
            ${deliveryOptionHTML(matchinProduct,cartItem)}
        </div>
        </div>
    </div>`

    })
    document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((link)=>{
        link.addEventListener('click',()=>{
            const productId = link.dataset.productId
            removeFromCart(productId)
            const container=document.querySelector(`.js-cart-container-${productId}`)
            container.remove();
            renderPaymentSummary();
        })
    })



    function deliveryOptionHTML(matchinProduct,cartItem){
        let html='';
        deliveryOptions.forEach((deliveryOption)=>{
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays,
                'days'
            )
            const DateString = deliveryDate.format(
                'dddd, MMMM D'
            )
            const priceString = deliveryOption.priceCents===0
            ? 'FREE '
            :   `$${formatCurrency(deliveryOption.priceCents)} - `

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        
            html+=
            `
            <div class="delivery-option js-delivery-option"
            data-product-id="${matchinProduct.id}"
            data-delivery-option-id="${deliveryOption.id}"
            >
            <input type="radio" 
            ${isChecked ? 'checked':'' }
                class="delivery-option-input"
                name="delivery-option-${matchinProduct.id}">
            <div>
                <div class="delivery-option-date">
                ${DateString}
                </div>
                <div class="delivery-option-price">
                ${priceString}Shipping
                </div>
            </div>
            </div>`

        })
        return html;
    }

    document.querySelectorAll('.js-delivery-option').forEach((element)=>
    {
        element.addEventListener('click',()=>{
            const{productId,deliveryOptionId} =element.dataset;
updateDeliveryOption(productId,deliveryOptionId)
            renderOrderSummary();
            renderPaymentSummary();
        })
    })
}
