import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT,
  SET_MESSAGE
} from './types'

import AuthService from '../service/auth.service'

const authService = new AuthService();

export const signup = (username, email, password, confirm_password) => (dispatch) => {
  return authService.signup(username, email, password, confirm_password).then(
    (response) => {
      dispatch({
        type: SIGNUP_SUCCESS
      });
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message
      });

      return Promise.resolve();
    },
    (error) => {
      const message = (error.response && error.response.data && error.response.data.message)
        || error.message
        || error.toString();

      dispatch({
        type: SIGNUP_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message
      });

      return Promise.reject();
    });
}


export const login = (email, password) => (dispatch) => {
  return authService.login(email, password).then(
    (data) => {
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: { user: data }
      })

      return Promise.resolve();
    },
    (error) => {
      const message = (error.response && error.response.data && error.response.data.message)
        || error.message
        || error.toString();

      dispatch({
        type: SIGNIN_FAIL
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message
      });

      return Promise.reject();
    }
  )
}
export const logout = () => (dispatch) => {
  authService.logout();

  dispatch({
    type: SIGNOUT,
  });
};