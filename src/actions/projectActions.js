import axios from "axios";
import { GET_ERRORS, GET_PROJECT, GET_PROJECTS, DELETE_PROJECT } from "./types";
import { API_URL } from "../constants";

export const createProject = (project, navigate) => async (dispatch) => {
  try {
    await axios.post(`${API_URL}/api/project`, project);
    navigate("/dashboard");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getProjects = () => async (dispatch) => {
  const res = await axios.get(`${API_URL}/api/project/all`);
  dispatch({
    type: GET_PROJECTS,
    payload: res.data,
  });
};

export const getProject = (id, navigate) => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/api/project/${id}`);
    console.log("actions");
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    navigate("/dashboard");
  }
};

export const deleteProject = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    await axios.delete(`${API_URL}/api/project/${id}`);
    dispatch({
      type: DELETE_PROJECT,
      payload: id,
    });
  }
};
