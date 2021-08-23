import axios from 'axios';
import qs from 'qs';
import pkceChallenge from 'pkce-challenge';

const authServer = axios.create({
  baseURL: 'http://localhost:8081'
})

export default class AuthService {
  public static getLoginScreenUrl (codeChallenge: string) {
    const config = qs.stringify({
      response_type: 'code',
      client_id: 'alganews-admin',
      redirect_uri: `${window.location.origin}/authorize`,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256'
    })

    return `http://localhost:8081/oauth/authorize?${config}`
  }

  public static async imperativelySendToLoginScreen () {
    const { code_challenge, code_verifier } = await pkceChallenge();
    this.setCodeVerifier(code_verifier);

    const loginUrl = this.getLoginScreenUrl(code_challenge)

    // imperativo
    // gera efeito colateral
    window.location.href = loginUrl
  }

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