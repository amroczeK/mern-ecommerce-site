import * as type from '../types/orders';

export const orderCreateReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case type.ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case type.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case type.ORDER_CREATE_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case type.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case type.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case type.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case type.ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case type.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case type.ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case type.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case type.ORDER_DELIVERED_REQUEST:
      return {
        loading: true,
      };
    case type.ORDER_DELIVERED_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case type.ORDER_DELIVERED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case type.ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case type.ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case type.ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case type.ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case type.ORDER_LIST_MY_RESET:
      return {
        orders: []
      }
    default:
      return state;
  }
};

export const orderListAllReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case type.ORDER_LIST_ALL_REQUEST:
      return {
        loading: true,
      };
    case type.ORDER_LIST_ALL_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case type.ORDER_LIST_ALL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
