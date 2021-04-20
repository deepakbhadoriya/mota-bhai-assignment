import axios from 'axios';
import { GET_DATA, SET_LOADING } from '../types';

const getApiData = (query, limit) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = query
      ? await axios.get(`https://api.jikan.moe/v3/search/anime?q=${query}&limit=${limit}`)
      : { data: null };
    dispatch({ type: SET_LOADING });
    dispatch({ type: GET_DATA, payload: res.data });
  } catch (error) {
    if (error.response.status === 404) {
      dispatch({ type: GET_DATA, payload: { error: 'Not found' } });
    }
    dispatch({ type: SET_LOADING });
  }
};

const apiActions = { getApiData };

export default apiActions;
