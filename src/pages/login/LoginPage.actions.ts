import { ApiUrlBase } from './../../common/constants';
import { RequestMethod } from '../../common/constants';
import { AxiosRequestConfig } from 'axios';
import { callApi } from '../../core/rest-client-helpers';

export const RequestLoginAction = 'REQUEST_LOGIN';

export function requestLoginAction(username: string, password: string) {
    let body = JSON.stringify({
        username: username,
        password: password
    });
    
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        url: ApiUrlBase.AUTH_API_URL,
        data: body,
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
        }
    };

    return async (dispatch: any) => dispatch(callApi(RequestLoginAction, requestConfig))
}