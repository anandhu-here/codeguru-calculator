import { BOOKMARK_DONE, BOOKMARK_ID, FEED_FETCHED, FEED_FETCH_FAILED, LOGIN_FAILED, LOGIN_OK, LOGIN_REQUEST } from "../types";
import axios from 'axios'


export const loginUserActionObj = (username, password) => {
    // Add backend request for user authentication later
    let auth = true;
    if(auth){

        localStorage.setItem('userInfo', JSON.stringify({
            username: 'anandhu55',
            firstname: 'Anandhu',
            lastname: 'Satheesh'
        }))
        return({
            type:LOGIN_OK,
            payload:{
                username: 'anandhu55',
                firstname: 'Anandhu',
                lastname: 'Satheesh'
            }
        })
    }
    else{
        return({
            type: LOGIN_FAILED
        })
    }
    
}


export const bookmarkActionObj = (bookmark) =>{
    // Add request code

    return({
        type:BOOKMARK_DONE,
        payload:[
            ...bookmark
        ]
    })
}

export const bookmark_id_ActionObj = (id) =>{
    // Add request code

    return({
        type:BOOKMARK_ID,
        payload:id
    })
}


