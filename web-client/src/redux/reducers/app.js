import { LOGIN_OK } from "../types";

const initialState = {
    appLoading:true,
    expenses_list:[],
    expenses_list_back:[],
    nav:'Expenses',
    filter_loading:false
}
export const app = (state = initialState, action) =>{
    switch (action.type) {
        case "NAV_CHANGE":
            return{
                ...state,
                nav:action.payload
            }
        case "FILTER_LOADING":
            return{
                ...state,
                filter_loading:action.payload
            }
        case "LOADING_START":
            return{
                ...state,
               appLoading:true
            }
        case "LOADING_END":
        return{
            ...state,
           appLoading:false
        }
        case "SET_EXPENSES_LIST":
            return{
                ...state,
                expenses_list:action.payload
            }
        case "SET_EXPENSES_LIST_BACK":
            return{
                ...state,
                expenses_list_back:action.payload
            }
        case "UNSET_EXPENSES_LIST":
            return{
                ...state,
                expenses_list:[]
            }
    
        default:
            return{
                ...state,
                appLoading:true
            }
    }
}