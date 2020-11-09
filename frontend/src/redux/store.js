import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/products'
import { cartReducer } from './reducers/cart'
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
} from './reducers/user'
import { orderCreateReducer, orderDetailsReducer } from './reducers/orders'
//import jwt from 'jsonwebtoken'

const rootReducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {}

const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
	},
	userLogin: { userInfo: userInfoFromStorage },
}

// const checkJwtExpiry = (store) => (next) => (action) => {
// 	const token = userInfoFromStorage && userInfoFromStorage['token']
// 	if (window.location.href === 'http://localhost:3000/login') next(action)
// 	else if (token) {
// 		console.log('here', token)
// 		jwt.verify(
// 			token,
// 			process.env.REACT_APP_JWT_SECRET,
// 			async (err, decoded) => {
// 				if (err) {
// 					console.log(err)
// 					localStorage.removeItem('userInfo')
// 					alert('Your login session has expired, please re-login.')
// 					window.location.href = 'http://localhost:3000/login'
// 					next()
// 				} else {
// 					next(action)
// 				}
// 			}
// 		)
// 	} else {
// 		window.location.href = 'http://localhost:3000/login'
// 	}
// }

const middleware = [thunk]

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
