import {combineReducers} from 'redux';

import loginReducer from './reducers/loginReducer';
import listingReducer from './reducers/listingReducer';


const AppReducer = combineReducers({
  
   
    login_r:loginReducer,
    listing_r:listingReducer
   
   
}) 

export default AppReducer