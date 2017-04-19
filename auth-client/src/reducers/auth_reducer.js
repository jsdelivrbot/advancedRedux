import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from '../actions/types';

export default function(state={}, action) {
  switch (action.type) {
    case AUTH_USER:
      return {...state, error: '', authenticated: true};
      break;
    case UNAUTH_USER:
      return {...state, eror: '', authenticated: false};
      break;
    case AUTH_ERROR:
      return {...state, error: action.payload};
      break;
    case FETCH_MESSAGE:
      // Auth reducer is not really the right place for FETCH_MESSAGE action
      // However, we are handling it here just so that we do not have to
      // create a new reducer just to handle one message
      return {...state, message: action.payload};
      break;
    default:
      return state;
  }
}
