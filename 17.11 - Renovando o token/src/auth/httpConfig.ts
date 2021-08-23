import Service from 'danielbonifacio-sdk/dist/Service';
import jwtDecode from 'jwt-decode';
import AuthService from './Authorization.service';

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
      // busca novos tokens
      const { refresh_token, access_token } = await AuthService.getNewToken({
        codeVerifier,
        refreshToken,
      });

      // armazena os tokens para serem usados futuramente
      AuthService.setAccessToken(access_token);
      AuthService.setRefreshToken(refresh_token);

      // injeta o novo token de acesso na chamada
      request.headers['Authorization'] = `Bearer ${access_token}`;

      // libera a chamada atual
      return request;
    }

    // injeta o token de acesso na requisição
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return request;
});
