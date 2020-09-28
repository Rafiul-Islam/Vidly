import http from './httpService'
import {apiURL} from '../config.json'
import jwtDecode from "jwt-decode";

const apiEndPoint = apiURL + "/auth"
const token = 'token'

http.setJWT(getJWT())

export async function login(user) {
    const {data: jwt} = await http.post(apiEndPoint, {
        email: user.username,
        password: user.password
    })
    localStorage.setItem(token, jwt)
}

export function loginWithJWT(jwt) {
    localStorage.setItem(token, jwt)
}

export function logout() {
    localStorage.removeItem(token)
}

export function getJWT() {
    return localStorage.getItem(token)
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(token)
        return jwtDecode(jwt)
    } catch (e) {
        return null
    }
}

export default {login, logout, getCurrentUser, loginWithJWT, getJWT}
