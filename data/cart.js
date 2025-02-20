export let  cart

loadFromStorage()

export function loadFromStorage(){
	cart = JSON.parse(localStorage.getItem('cart'))

	if(!cart){
		cart =[
			{
			productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
			quantity: 1,
			deliveryOptionId:'2',
			},{
			productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
			quantity: 2,
			deliveryOptionId:'1',
		}];
	}
}

function saveToStorage(){
localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId,addQuantity){
	let matchinIitem;
	cart.forEach((cartItem)=>{
		if(productId=== cartItem.productId){
			matchinIitem =cartItem
		}
	})
	if(matchinIitem){
		matchinIitem.quantity+=addQuantity;
	}else{
		cart.push({
			productId,
			quantity:addQuantity,
		})
	}
	saveToStorage()
}

export function removeFromCart(productId){
	const newCart=[];
	cart.forEach((cartItem)=>{
		if(cartItem.productId !== productId){
			newCart.push(cartItem)
		}
	})
	cart=newCart;
	saveToStorage()
}

export function updateCartQuantity(newQuantity,productId){
	cart.forEach((cartItem)=>{
		if(cartItem.productId === productId){
			cartItem.quantity=newQuantity
		}
		saveToStorage()
	})
}

export function updateDeliveryOption (productId,deliveryOptionId){
	let matchinIitem;

	cart.forEach((cartItem)=>{
		if(productId=== cartItem.productId){
			matchinIitem =cartItem
		}
	})
	matchinIitem.deliveryOptionId = deliveryOptionId;
	saveToStorage();
}
export function updateCheckOut (){
	let cartQuantity =0;
		cart.forEach((cartItem)=>{
		cartQuantity+=cartItem.quantity
		})
		document.querySelector('.js-return-home').innerHTML =`${cartQuantity} items`
}



export function loadCart(fun){
	const xhr = new XMLHttpRequest();
	xhr.addEventListener('load',()=>
	{
	  console.log('laod cart')
	  fun();
	})
	xhr.open('GET','http://supersimplebackend.dev/cart')
	xhr.send();
	
  }