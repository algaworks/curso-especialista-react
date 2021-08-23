import axios, { AxiosRequestConfig } from 'axios';
import Service from 'danielbonifacio-sdk/dist/Service';
import jwtDecode from 'jwt-decode';
import AuthService from './Authorization.service';

let isRefreshing = false;
let refreshSubscribers: AxiosRequestConfig[] = [];

Service.setRequestInterceptors(async (request) => {
  const storage = {
    accessToken: AuthService.getAccessToken(),
    codeVerifier: AuthService.getCodeVerifier(),
    refreshToken: AuthService.getRefreshToken(),
  };

  const { accessToken, codeVerifier, refreshToken } = storage;

  if (accessToken && codeVerifier && refreshToken) {
    const decodedToken: Authorization.AccessTokenDecodedBody =
      jwtDecode(accessToken);

    const now = Math.floor(+new Date() / 1000);

    if (now > decodedToken.exp) {
      if (!isRefreshing) {
        // bloqueia próximas requisições
        isRefreshing = true;

        // busca novos tokens
        const { refresh_token, access_token } = await AuthService.getNewToken({
          codeVerifier,
          refreshToken,
        });

        // armazena os tokens para serem usados futuramente
        AuthService.setAccessToken(access_token);
        AuthService.setRefreshToken(refresh_token);

        // desbloqueia as requisições
        isRefreshing = false;

        // libera as chamadas que estão pendentes
        await Promise.all(
          refreshSubscribers.map((req) => async () => {
            req.headers['Authorization'] = `Bearer ${access_token}`;
            await axios(req);
          })
        );

        // limpar a lista de subscribers
        refreshSubscribers = [];

        // injeta o novo token de acesso na chamada
        request.headers['Authorization'] = `Bearer ${access_token}`;

        // libera a chamada atual
        return request;
      }

      refreshSubscribers.push(request);
    }

    // injeta o token de acesso na requisição
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return request;
});
