import * as jwtDecode from 'jwt-decode';

declare module 'jwt-decode' {
  export interface TokenProtocol extends jwtDecode.JwtPayload {
    name?: string;
    id?: number;
    email?: string;
  }
}
