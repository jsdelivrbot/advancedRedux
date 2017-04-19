import { combineReducers } from 'redux';
import { reducer} from 'redux-form';
import AuthReducer from './auth_reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: reducer
});

export default rootReducer;
