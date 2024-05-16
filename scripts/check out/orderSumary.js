import {cart,removeFromCart,updateDeliveryOption,updateCartQuantity} from "../../data/cart.js";
import {products,getproduct} from "../../data/products.js" ;
import{formatCurrency} from "../utils/money.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import {deliveryOptions,getDeliveryOption} from "../../data/deliveryOption.js"
import { renderPaymentSummary } from "./paymentSumary.js";
import {updateCheckOut} from "../../data/cart.js"

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
        `<div class="cart-item-container js-cart-item-container js-cart-container-${matchinProduct.id}">
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
    ${matchinProduct.getPrice()}
            </div>
            <div class="product-quantity  js-product-quantity-${matchinProduct.id}">
            <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <input class="new-quantity-input link-primary js-input-link-${matchinProduct.id}" type="text" value="${cartItem.quantity} "></input>
            <span class="update-quantity-link link-primary js-update-link"}">
                Update
            </span>
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchinProduct.id}">
                Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchinProduct.id}" data-product-id="${matchinProduct.id}">
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
            updateCheckOut();
        })
    })

    document.querySelectorAll('.js-update-link').forEach((link)=>{
        link.addEventListener('click',(event)=>{
            const cartItemContainer = event.target.closest('.cart-item-container');
                if (cartItemContainer) {
                    // Thêm lớp "is-editing-quantity"
                    cartItemContainer.classList.add('is-editing-quantity');
                }
        })
    })

    document.querySelectorAll('.js-save-link').forEach((link)=>{
        link.addEventListener('click',(event)=>{
            const productId = link.dataset.productId
            const inputQuantity = document.querySelector(`.js-input-link-${productId}`);
            const newQuantity = parseInt(inputQuantity.value, 10);
            updateCartQuantity(newQuantity,productId)
            const cartItemContainer = event.target.closest('.cart-item-container');
                if (cartItemContainer) {
                    // loai lớp "is-editing-quantity"
                    cartItemContainer.classList.remove('is-editing-quantity')
                }
                renderOrderSummary()
                renderPaymentSummary()
                updateCheckOut();
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
