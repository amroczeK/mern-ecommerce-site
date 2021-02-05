import * as type from '../types/orders';
import { logout } from '../actions/user';
import axios from 'axios';

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: type.ORDER_CREATE_REQUEST,
    });

    const { data } = await axios.post(`/api/orders`, order);

    dispatch({
      type: type.ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.toString().match(/Request failed with status code 401/g))
      dispatch(logout());
    dispatch({
      type: type.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: type.ORDER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/orders/${id}`);

    dispatch({
      type: type.ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.toString().match(/Request failed with status code 401/g))
      dispatch(logout());
    dispatch({
      type: type.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (dispatch) => {
  try {
    dispatch({
      type: type.ORDER_PAY_REQUEST,
    });

    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult
    );

    dispatch({
      type: type.ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.toString().match(/Request failed with status code 401/g))
      dispatch(logout());
    dispatch({
      type: type.ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: type.ORDER_LIST_MY_REQUEST,
    });

    const { data } = await axios.get(`/api/orders/myorders`);

    dispatch({
      type: type.ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.toString().match(/Request failed with status code 401/g))
      dispatch(logout());
    dispatch({
      type: type.ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: type.ORDER_LIST_ALL_REQUEST,
    });

    const { data } = await axios.get(`/api/orders/`);

    dispatch({
      type: type.ORDER_LIST_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.toString().match(/Request failed with status code 401/g)) dispatch(logout());
    dispatch({
      type: type.ORDER_LIST_ALL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
