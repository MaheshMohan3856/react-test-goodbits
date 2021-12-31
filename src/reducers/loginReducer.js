import {LOGIN,LOGOUT,SIGNUP} from '../actions/login/loginActionTypes';



export default function (state={}, action){
    switch(action.type){
     
        case LOGIN:
            return {_login:action.result}
 
        case LOGOUT:
            return {_logout:action.result}
        case SIGNUP:
            return {_signup:action.result}
       
        default:
            return state;
    }
}