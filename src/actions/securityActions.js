import axios from "axios";
import setJWTToken from "../securityUtils/setJWTToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";
import { API_URL } from "../constants";

export const createNewUser = (newUser, navigate) => async (dispatch) => {
  try {
    await axios.post(`${API_URL}/api/users/register`, newUser);
    navigate("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const login = (LoginRequest) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/api/users/login`, LoginRequest);
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    setJWTToken(token);

    const decoded = jwt_decode(token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};
