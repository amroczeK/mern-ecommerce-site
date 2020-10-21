import * as type from '../types/cart'

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case type.CART_ADD_ITEM:
			const item = action.payload
			const itemExists = state.cartItems.find((x) => x.product === item.product)
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
		case type.CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter((x) => x.product !== action.payload),
			}
		case type.CART_UPDATE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter((x) => x.product !== action.payload),
			}
		default:
			return state
	}
}
