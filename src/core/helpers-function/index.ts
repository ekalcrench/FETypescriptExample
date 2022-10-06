import decodeJwt from 'jwt-decode';
import { StorageKey } from '../../common/constants';

export function isAccessTokenValid(): boolean {
    let userDataString: string | null = localStorage.getItem(StorageKey.USER_DATA);

    if (userDataString === null) {return false;}
    else {
        let userDataObject: any = JSON.parse(userDataString);
        let accessToken = userDataObject.tokenResponse.accessToken || '';          
        if (accessToken === '') {return false}
        else {
            let jwt: any = decodeJwt(accessToken);
            var current_time = new Date().getTime() / 1000;
            if (current_time > jwt.exp) {
               return false;
            }
            else {return true;}
        }
    }
}
