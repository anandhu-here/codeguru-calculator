import { LOGIN_FAILED, LOGIN_OK } from "../types";

const initialState = {
    userInfo:null,
    signup_data:null
}
export const user = (state = initialState, action) =>{
    switch (action.type) {
        case "SIGNUP_DATA":
            return{
                ...state,
               signup_data:action.payload 
            }
        case LOGIN_OK:
            return{
                ...state,
                userInfo:action.payload
            }
        case LOGIN_FAILED:
            return{
                ...state,
                userInfo:null
            }
    
        default:
            return{
                ...state
            }
    }
}