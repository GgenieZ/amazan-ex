export const cart = [];



export function addToCart(productId){
	let matchinIitem;

	cart.forEach((cartItem)=>{
		if(productId=== cartItem.productId){
			matchinIitem =cartItem
		}
	})
	if(matchinIitem){
		matchinIitem.quantity+=1;
	}else{
		cart.push({
			productId,
			quantity:1,
		})
	}
}
