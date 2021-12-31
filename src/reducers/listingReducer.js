import {LIST,ADD_EMP,UPDATE_EMP,DELETE_EMP} from '../actions/listing/listingActionTypes';



export default function (state={}, action){
    switch(action.type){
     
        case LIST:
            return {_list:action.result}

        case ADD_EMP:
            return {_addEmp:action.result}

        case UPDATE_EMP:
            return {_updateEmp:action.result}

        case DELETE_EMP:
            return {_deleteEmp:action.result}
       
        default:
            return state;
    }
}