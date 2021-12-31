import {LOGIN,LOGOUT,SIGNUP} from './loginActionTypes';

import { apiCall } from '../../lib/Api';



export const login = (data:object) => {
    return (dispatch, getState) => {       
  
        return apiCall('auth/login', false, 'POST', data)
        .then((result) => {           
            dispatch(_login(result));            
        })

    };
}

export const _login = (result:object) => {
    return{
        type:LOGIN,
        result
    }
}



export const logoutUser = () => {
    return (dispatch, getState) => {       
  
        return apiCall('users/logout', true, 'POST', {})
        .then((result) => {           
            dispatch(_logout(result));            
        })

    };
}

export const _logout = (result) => {
    return{
        type:LOGOUT,
        result
    }
}

export const signup = (data) => {
    return (dispatch, getState) => {       
  
        return apiCall('auth/register', false, 'POST', data)
        .then((result) => {           
            dispatch(_signup(result));            
        })

    };
}


export const _signup = (result) => {
    return{
        type:SIGNUP,
        result
    }
}