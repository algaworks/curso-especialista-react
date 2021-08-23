import axios from 'axios';

const authServer = axios.create({
  baseURL: 'http://localhost:8081'
})

export default class AuthService {
  public static getAccessToken() {
    return window.localStorage.getItem('accessToken')
  }
  public static setAccessToken(token: string) {
    return window.localStorage.setItem('accessToken', token)
  }

  public static getRefreshToken() {
    return window.localStorage.getItem('refreshToken')
  }
  public static setRefreshToken(token: string) {
    return window.localStorage.setItem('refreshToken', token)
  }

  public static getCodeVerifier() {
    return window.localStorage.getItem('codeVerifier')
  }
  public static setCodeVerifier(getCodeVerifier: string) {
    return window.localStorage.setItem('codeVerifier', getCodeVerifier)
  }
}