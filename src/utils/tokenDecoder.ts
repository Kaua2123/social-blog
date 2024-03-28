import { TokenProtocol, jwtDecode } from 'jwt-decode';

export const tokenDecoder = (
  token: string | null,
): TokenProtocol | undefined => {
  if (!token) return;

  const decodedToken = jwtDecode(token);
  return decodedToken;
};
