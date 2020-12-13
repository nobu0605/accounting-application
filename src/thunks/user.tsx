import { createAction } from 'redux-actions';
import axios from '../utils/axios';
import { USER_DATA_FETCH_BIGIN, USER_DATA_FETCHED, USER_DATA_FETCH_FAILED } from '../actionTypes';

export function fetchUser() {
  return async (dispatch: any) => {
    try {
      dispatch(createAction(USER_DATA_FETCH_BIGIN)());
      const response = await axios.get('/api/user');
      dispatch(createAction(USER_DATA_FETCHED)(response.data));
      return response.data;
    } catch (error) {
      dispatch(createAction(USER_DATA_FETCH_FAILED)(error));
      throw error;
    }
  };
}
