import axios from "axios";
const ROOT_URL = "http://localhost:3090";
import {browserHistory} from 'react-router';
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE} from './types';

function createOrLoginUser(dispatch, url, email, password) {
  // Submit email and password to server
  axios.post(url, {email, password})
    .then(response => {
      // If request is good
      // - Update state to indicate user is authenticated
      dispatch({type: AUTH_USER});
      // - Save the JWT token
      localStorage.setItem("token", response.data.token);
      // - redirect to route "/feature"
      browserHistory.push("/feature");
    })
    .catch(error => {
      // If request is bad...
      // Show error to user
      const response = error.response;
      if(response.data.error) {
        dispatch(authError(response.data.error));
      } else {
        dispatch(authError('Bad Login info'));
      }
    });
}

function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signinUser({email, password}) {
  return function(dispatch) {
    createOrLoginUser(dispatch, `${ROOT_URL}/signin`, email, password);
  }
}

export function signupUser({email, password}) {
  return function(dispatch) {
    createOrLoginUser(dispatch, `${ROOT_URL}/signup`, email, password);
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  }
}

export function resetErrors() {
  return function(dispatch) {
    dispatch(authError(""));
  }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authentication: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.success
        });
      })
      .catch(error => {
        const response = error.response;
        // Error occurred
        dispatch(authError(error));
        if(response && response.status === 401)
          browserHistory.push("/");
      });
  }
}
