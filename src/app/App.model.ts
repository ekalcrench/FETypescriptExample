import { History } from 'history';

export interface AppProps {
  history: History;
}

export interface UserDataModel{
  customerCode?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  roleLevel?: number;
  tokenResponse: TokenResponseModel;
  userId?: string;
  userName?: string;
}

interface TokenResponseModel{
  accessToken?: string;
  errorDescription?: string;
  expiresIn?: number;
  identityToken?: string;
  refreshToken?: string;
  tokenType?: string;
}