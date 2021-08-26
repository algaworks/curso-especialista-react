import { User } from 'danielbonifacio-sdk';

declare namespace Authentication {
  export type AccessTokenDecodedBody = {
    'alganews:user_full_name': string;
    'alganews:user_id': number;
    user_name: string;
    scope: string[];
    exp: number;
    authorities: User.Role[];
    jti: string;
    client_id: string;
  };
}
