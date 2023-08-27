import axios from "axios";
import { api_endpoint } from "../api.config";

const apiEndPoint = api_endpoint;



export function login(row){
    return new Promise((resolve, reject)=>{
        axios.post(`/login`, {...row}, {
            headers:{
                "Content-Type":'application/json'
            }
        })

        .then(response=>{
            resolve(response);
        })
        .catch(error=>{
            reject(error)
        })
    })
}

export function signup(row){
    return new Promise((resolve, reject)=>{
        axios.post(`/signup`, {...row}, {
            headers:{
                "Content-Type":'application/json'
            }
        })

        .then(response=>{
            resolve(response);
        })
        .catch(error=>{
            reject(error)
        })
    })
}
export function verify(row){
    return new Promise((resolve, reject)=>{
        axios.post(`/verify-user`, {...row}, {
            headers:{
                "Content-Type":'application/json'
            }
        })

        .then(response=>{
            resolve(response);
        })
        .catch(error=>{
            reject(error)
        })
    })
}

export function shiftAdd(row, token){
    console.log(token, row, "popp")
    return new Promise((resolve, reject)=>{
        axios.post(`/shifts/add`, {...row}, {
            headers:{
                "Content-Type":'application/json',
                "Authorization": token
            }
        })

        .then(response=>{
            resolve(response);
        })
        .catch(error=>{
            reject(error)
        })
    })
}


export function shiftsGet(token, path, id){
    console.log(token, "popp")
    return new Promise((resolve, reject)=>{
        axios.get(`/shifts/get/${path}?id=${id}`, {
            headers:{
                // "Content-Type":'application/json',
                "Authorization": token
            }
        })

        .then(response=>{
            resolve(response);
        })
        .catch(error=>{
            reject(error)
        })
    })
}

export function getExpensesByMonth(month, year, token){
    return new Promise((resolve, reject)=>{
        axios.get(`/expenses/get/monthly/${year}/${month}`, {headers:{
            'Authorization' : token
        }})

        .then(response=>{
            resolve(response);
        })
        .catch(error=>{
            reject(error)
        })
    })
}
export function getExpenses(year, month, token){
    return new Promise((resolve, reject)=>{
        axios.get(`/expenses/get/yearly/${year}/${month}`, {headers:{
            'Authorization' : token
        }})

        .then(response=>{
            resolve(response);
        })
        .catch(error=>{
            reject(error)
        })
    })
}




export function createExpense(user_id, expenses){
    return new Promise((resolve, reject)=>{
        axios.post(`/expenses/create`,{user_id, expenses}, {
            headers:{
                "Content-Type":'application/json',
                // "Authorization": token
            }
        })

        .then(response=>{
            resolve(response);
        })
        .catch(error=>{
            reject(error)
        })
    })
}

export function editExpense(id, amount){
    return new Promise((resolve, reject)=>{
        axios.post(`/expenses/edit`,{id, amount}, {
            headers:{
                "Content-Type":'application/json',
                // "Authorization": token
            }
        })

        .then(response=>{
            resolve(response);
        })
        .catch(error=>{
            reject(error)
        })
    })
}

export function deleteExpense(id, amount){
    return new Promise((resolve, reject)=>{
        axios.post(`/expenses/delete`,{id}, {
            headers:{
                "Content-Type":'application/json',
                // "Authorization": token
            }
        })

        .then(response=>{
            resolve(response);
        })
        .catch(error=>{
            reject(error)
        })
    })
}