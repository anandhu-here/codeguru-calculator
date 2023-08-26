import { LOGIN_REQUEST } from "../types"
import { bookmarkActionObj, bookmark_id_ActionObj, loginUserActionObj } from "./userActions"

export const userActionLoginDispatch = (username, password ) => (dispatch) =>{
    dispatch({type:LOGIN_REQUEST, payload:null});
    dispatch(loginUserActionObj(username, password))
}


export const bookmarkActionDispatch = ( bookmarks, id ) => dispatch =>{
    dispatch(bookmark_id_ActionObj(id))
    dispatch(bookmarkActionObj(bookmarks));
}


