import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../types/cart'

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload
			const itemExists = state.cartItems.find((x) => x.product === item.prodct)
			if (itemExists) {
				return {
					...state,
					cartItems: state.cartItems.map((x) =>
						x.product === itemExists.product ? item : x
					),
				}
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				}
			}
		default:
			return state
	}
}
