import axios from 'axios';
import * as type from '../types/user';
import { ORDER_LIST_MY_RESET } from '../types/orders';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: type.USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/auth/login',
      { email, password },
      config
    );

    dispatch({
      type: type.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: type.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get('/api/auth/logout');
    localStorage.removeItem('userInfo');
    dispatch({ type: type.USER_LOGOUT });
    dispatch({ type: type.USER_DETAILS_RESET });
    dispatch({ type: ORDER_LIST_MY_RESET });
  } catch (error) {
    dispatch({
      type: type.USER_LOGOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: type.USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );

    dispatch({
      type: type.USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: type.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: type.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: type.USER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/users/${id}`);

    dispatch({
      type: type.USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: type.USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: type.USER_UPDATE_PROFILE_REQUEST,
    });

    const { data } = await axios.put(`/api/users/profile`, user);

    dispatch({
      type: type.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: type.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: type.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
