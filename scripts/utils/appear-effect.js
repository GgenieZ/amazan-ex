export function displaySave(event){
    const cartItemContainer = event.target.closest('.cart-item-container');
    console.log(cartItemContainer)
    if (cartItemContainer) {
        cartItemContainer.classList.add('is-editing-quantity');
}}

export function reDisplayUpdate(event){
    const cartItemContainer = event.target.closest('.cart-item-container');
        if (cartItemContainer) {
            cartItemContainer.classList.remove('is-editing-quantity')
    }}

export function displayAddedMess(productId){
    const addedMess = document.querySelector(`.js-added-to-cart-${productId}`)
    addedMess.classList.add('show')
    setTimeout(() => {
        addedMess.classList.remove('show');
    }, 1000);
}