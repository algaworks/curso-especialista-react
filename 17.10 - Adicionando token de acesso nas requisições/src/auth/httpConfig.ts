import Service from 'danielbonifacio-sdk/dist/Service';
import AuthService from './Authorization.service';

Service.setRequestInterceptors(async (request) => {
  const storage = {
    accessToken: AuthService.getAccessToken(),
  };

  const { accessToken } = storage;

  if (accessToken) {
    // injeta o token de acesso na requisição
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return request;
});
