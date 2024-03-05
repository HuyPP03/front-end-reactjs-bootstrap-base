import {
  GET_PROFILE_ERROR,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  USER_NOT_EXIST,
} from "../action/types";

const INITIAL_STATE = {
  isLoading: true,
  isError: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isError: false,
      };
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_PROFILE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case USER_NOT_EXIST:
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: undefined,
      };
    default:
      return state;
  }
};

export default reducer;
