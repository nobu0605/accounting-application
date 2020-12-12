import { CHANGE_LANGUAGE } from '../../actionTypes';
import { handleActions } from 'redux-actions';

export const initialState = {
  locale: 'ja',
};

type Action = {
  payload: {
    language: string;
  };
};

const language = handleActions(
  {
    [CHANGE_LANGUAGE]: (state, action: Action) => {
      return {
        ...state,
        locale: action.payload.language,
      };
    },
  },
  initialState
);

export default language;
