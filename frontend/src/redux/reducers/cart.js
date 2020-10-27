import * as type from '../types/cart'

export const cartReducer = (
	state = { cartItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case type.CART_ADD_ITEM: {
			const item = action.payload
			const itemExists = state.cartItems.find((x) => {
				if (x.product === item.product) {
					item.qty = item.qty + x.qty
					return true
				} else {
					return false
				}
			})
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
		}
		case type.CART_REMOVE_ITEM: {
			return {
				...state,
				cartItems: state.cartItems.filter((x) => x.product !== action.payload),
			}
		}
		case type.CART_UPDATE_ITEM: {
			let updatedItem = {}
			const item = action.payload
			const itemExists = state.cartItems.find((x) => {
				if (x.product === item.product) {
					x.qty = item.qty
					updatedItem = x
					return true
				} else {
					return false
				}
			})
			return {
				...state,
				cartItems: state.cartItems.map((x) =>
					x.product === itemExists.product ? updatedItem : x
				),
			}
		}
		case type.CART_SAVE_SHIPPING_ADDRESS: {
			return {
				...state,
				shippingAddress: action.payload,
			}
		}
		default:
			return state
	}
}
