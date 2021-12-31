import {LIST,ADD_EMP,UPDATE_EMP,DELETE_EMP} from './listingActionTypes';

import { apiCall } from '../../lib/Api';



export const list = (data) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/getList', false, 'POST', data)
        .then((result) => {           
            dispatch(_list(result));            
        })

    };
}

export const _list = (result) => {
    return{
        type:LIST,
        result
    }
}

export const addEmployee = (data) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/addEmployee', false, 'POST', data)
        .then((result) => {           
            dispatch(_addEmp(result));            
        })

    };
}

export const _addEmp = (result) => {
    return{
        type:ADD_EMP,
        result
    }
}

export const updateEmployee = (data) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/updateEmployee', false, 'POST', data)
        .then((result) => {           
            dispatch(_updateEmp(result));            
        })

    };
}

export const _updateEmp = (result) => {
    return{
        type:UPDATE_EMP,
        result
    }
}

export const deleteEmployee = (data) => {
    return (dispatch, getState) => {       
  
        return apiCall('users/deleteEmployee', false, 'POST', data)
        .then((result) => {           
            dispatch(_deleteEmp(result));            
        })

    };
}

export const _deleteEmp = (result) => {
    return{
        type:DELETE_EMP,
        result
    }
}





