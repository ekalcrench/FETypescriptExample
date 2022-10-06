import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Action } from 'redux';
import axios from 'axios';
import { CustomErrorResponse } from './RestClientHelper.model';

//action status
export enum ApiRequestActionsStatus{
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED'
}

//Actions
interface StartedApiRequestAction<T> extends Action {
  type: T;
  status: ApiRequestActionsStatus.LOADING;
}
  
interface SucceededApiRequestAction<T, P = any> extends Action {
  type: T;
  status: ApiRequestActionsStatus.SUCCEEDED;
  payload: P;
}
  
interface FailedApiRequestAction<T, P> extends Action {
  type: T;
  status: ApiRequestActionsStatus.FAILED;
  payload?: P
  error: CustomErrorResponse
}

export type ApiClientAction<T, P = any> = StartedApiRequestAction<T> | SucceededApiRequestAction<T, P> | FailedApiRequestAction<T, P>;

//Action creators
function startedApiRequestAction<T>(type: T): StartedApiRequestAction<T> {
  return {
    type,
    status: ApiRequestActionsStatus.LOADING
  };
}

function succeededApiRequestAction<T, P>(type: T, payload: P): SucceededApiRequestAction<T, P> {
  return {
    type,
    status: ApiRequestActionsStatus.SUCCEEDED,
    payload,
  };
}

function failedApiRequestAction<T, P>(type: T, error: CustomErrorResponse, payload: P | undefined = undefined): FailedApiRequestAction<T, P> {
  return {
    type,
    status: ApiRequestActionsStatus.FAILED,
    payload,
    error
  };
}

export function callApi<T, P>(type: T, requestConfig: AxiosRequestConfig) {
  return async (dispatch: any) => {
    dispatch(startedApiRequestAction(type));
    try{
      let payload: AxiosResponse<P> = await axios(requestConfig);
      dispatch(succeededApiRequestAction(type, payload.data));
    }catch(error){
      dispatch(failedApiRequestAction(type, error));
    }
  };
}

export const ApiRequestActionType = {
  FETCH: 'FETCH_',
  POST: 'POST_',
  SYNC: 'SYNC_DATA'
}

export interface ApiClientRequestAction{
  type: string
  requestConfig: AxiosRequestConfig
  source: number
  filter?: string
}