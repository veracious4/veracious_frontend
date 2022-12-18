import  {combineReducers} from 'redux';
import authReducer from './authReducer';
import factValidateReducer from './factValidateReducer';

export default combineReducers({
    auth:authReducer,
    factValidateData:factValidateReducer
});