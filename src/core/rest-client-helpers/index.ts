import { callApi, ApiClientAction, ApiRequestActionsStatus } from './RestClientHelper.actions';

export type ApiClientAction<T, P = any> = ApiClientAction<T, P>;
export {callApi, ApiRequestActionsStatus};