import { ApiRequestActionsStatus } from './../../core/rest-client-helpers';

export interface LoginState{
    username: string;
    password: string;
    showPassword: boolean;
}

export interface LoginRequestState{
    status: ApiRequestActionsStatus;
    payload?: any;
}