import {renderOrderSummary} from "../../scripts/check out/orderSumary.js"
import { cart,loadFromStorage} from "../../data/cart.js"

describe('test suite: renderOrederSummary', ()=>
{
    const productId1 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'
        const productId2 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    beforeEach(()=>{
        spyOn(localStorage,'setItem')
        document.querySelector('.js-test-container').innerHTML=`
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        <div class="js-return-home"></div>
        `
        spyOn(localStorage,'getItem').and.callFake(()=>
        {return JSON.stringify([
                {
                    productId: productId1,
                    quantity: 2,
                    deliveryOptionId:'2',
                    },{
                    productId: productId2,
                    quantity: 1,
                    deliveryOptionId:'1',
                }
            ])
        })
        loadFromStorage()
        renderOrderSummary()
    })

afterEach(()=>{
    document.querySelector('.js-test-container').innerHTML=``
})
    it('display the cart',()=>{
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2')
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1')
        
    })
    

    it('remove a product',()=>{
        document.querySelector(`.js-delete-link-${productId1}`).click()
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).toEqual(null);
        expect(cart.length).toEqual(1)
        expect(cart[0].productId).toEqual(productId2)
        
    })
})