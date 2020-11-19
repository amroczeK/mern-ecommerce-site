import * as type from '../types/orders'
import { logout } from '../actions/user'
import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: type.ORDER_CREATE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				//Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.post(`/api/orders`, order, config)

		dispatch({
			type: type.ORDER_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		if (error.toString().match(/Request failed with status code 401/g))
			dispatch(logout())
		dispatch({
			type: type.ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: type.ORDER_DETAILS_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				//Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.get(`/api/orders/${id}`, config)

		dispatch({
			type: type.ORDER_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		if (error.toString().match(/Request failed with status code 401/g))
			dispatch(logout())
		dispatch({
			type: type.ORDER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const payOrder = (orderId, paymentResult) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: type.ORDER_PAY_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				//Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.put(
			`/api/orders/${orderId}/pay`,
			paymentResult,
			config
		)

		dispatch({
			type: type.ORDER_PAY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		if (error.toString().match(/Request failed with status code 401/g))
			dispatch(logout())
		dispatch({
			type: type.ORDER_PAY_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
