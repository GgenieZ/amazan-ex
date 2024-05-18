import{cart,addToCart,}from '../data/cart.js'
import{products,loadProductFetch}from '../data/products.js'
import {displayAddedMess} from '../scripts/utils/appear-effect.js'
let productHTML ='';

loadProductFetch(renderProductsGrid)

function renderProductsGrid(){
updateCartquantity();


products.forEach((products)=>{
	productHTML += `
	<div class="product-container">
	<div class="product-image-container">
		<img class="product-image"
			src="${products.image}">
	</div>

	<div class="product-name limit-text-to-2-lines">
		${products.name}
	</div>

	<div class="product-rating-container">
		<img class="product-rating-stars"
			src="${products.getStarUrl()}">
		<div class="product-rating-count link-primary">
			${products.rating.count}
		</div>
	</div>

	<div class="product-price">
		${products.getPrice()}
	</div>

	<div class="product-quantity-container">
		<select class="js-quantity-select-${products.id}">
			<option selected value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
			<option value="8">8</option>
			<option value="9">9</option>
			<option value="10">10</option>
		</select>
	</div>

	${products.extraInfoHTML()}

	<div class="product-spacer"></div>

	<div class="added-to-cart js-added-to-cart-${products.id}">
		<img src="images/icons/checkmark.png">
		Added
	</div>

	<button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${products.id}">
		Add to Cart
	</button>
</div>`
});

document.querySelector('.js-produc-grid').innerHTML=productHTML

function updateCartquantity(){
	let cartQuantity =0;
	cart.forEach((cartItem)=>{
	cartQuantity+=cartItem.quantity
	})
	document.querySelector('.js-cart-quantity').innerHTML =cartQuantity 
}

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
	button.addEventListener('click',()=>{
		const productId = button.dataset.productId;
		displayAddedMess(productId);
		let addQuantity=parseInt(document.querySelector(`.js-quantity-select-${productId}`).value,10);
		console.log(addQuantity);
		addToCart(productId,addQuantity);
		updateCartquantity()
		
	})
})
}