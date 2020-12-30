import {
  USER_DATA_FETCH_BIGIN,
  USER_DATA_FETCHED,
  USER_DATA_FETCH_FAILED,
} from '../../actionTypes';
import { handleActions } from 'redux-actions';
import { UserState } from '../../types/user';
import { CompanyInitialState } from '../../types/company';

type InitialState = {
  error: boolean;
  errorMessage: null | string;
  isUserDataFetching: boolean;
  isUserDataFetched: boolean;
  company: CompanyInitialState;
};

export const initialState: InitialState = {
  error: false,
  errorMessage: null,
  isUserDataFetching: true,
  isUserDataFetched: false,
  company: {},
};

type Action = {
  payload: {
    user: UserState;
  };
};

const user = handleActions(
  {
    [USER_DATA_FETCH_BIGIN]: (state) => ({
      ...state,
      error: false,
      errorMessage: null,
      isUserDataFetching: true,
      isUserDataFetched: false,
    }),
    [USER_DATA_FETCHED]: (state, action: Action) => ({
      ...state,
      error: false,
      errorMessage: null,
      isUserDataFetching: false,
      isUserDataFetched: true,
      ...action.payload,
    }),
    [USER_DATA_FETCH_FAILED]: (state) => ({
      ...state,
      error: true,
      errorMessage: 'Fetching user data is failed.',
      isUserDataFetching: false,
      isUserDataFetched: false,
    }),
  },
  initialState
);

export default user;
