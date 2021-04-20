import { GET_DATA, SET_LOADING } from '../types';

const initialState = {
  apiData: null,
  loading: false,
};

export default function apiReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DATA:
      return {
        ...state,
        apiData: payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };

    default:
      return state;
  }
}
