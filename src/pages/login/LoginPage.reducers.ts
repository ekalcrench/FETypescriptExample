import { RequestLoginAction } from './LoginPage.actions';
import { ApiClientAction, ApiRequestActionsStatus } from '../../core/rest-client-helpers';
import { combineReducers } from 'redux';
import { LoginRequestState } from './LoginPage.model';
import { UserDataModel } from '../../app/App.model';

const initialState: LoginRequestState = { payload: '', status: ApiRequestActionsStatus.IDLE};

function requestLoginReducer(state: LoginRequestState = initialState, action: ApiClientAction<typeof RequestLoginAction, UserDataModel>): LoginRequestState {
  if(action.type === RequestLoginAction) {
    switch(action.status){
      case ApiRequestActionsStatus.LOADING:
        return {status: action.status, payload: state.payload};
      case ApiRequestActionsStatus.SUCCEEDED:
        return {payload: action.payload, status: action.status};
      case ApiRequestActionsStatus.FAILED:
        return {payload: action.error, status: action.status};
    }
  }
  return state;
}

const LoginPageReducers = combineReducers({
  loginRequestState: requestLoginReducer
});

export { LoginPageReducers };