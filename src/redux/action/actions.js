import axios from "axios";
import {
  INCREMENT,
  DECREMENT,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_PROFILE_ERROR,
  USER_NOT_EXIST,
} from "./types";

export const increaseCounter = () => {
  return {
    type: INCREMENT,
  };
};

export const decreaseCounter = () => {
  return {
    type: DECREMENT,
  };
};
export const checkUserLogin = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_PROFILE_REQUEST,
    });
    try {
      const res = await axios.get(`http://localhost:8080/profile/${id}`);
      dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: res.data.user,
      });
    } catch (error) {
      dispatch({
        type: GET_PROFILE_ERROR,
      });
    }
  };
};
export const userNotExist = () => {
  return {
    type: USER_NOT_EXIST,
  };
};
