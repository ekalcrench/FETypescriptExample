import LoginPage from './LoginPage';
import { AppState } from '../../app';
import { connect } from 'react-redux';
import { requestLoginAction } from './LoginPage.actions';
import { push } from 'connected-react-router';
import { LoginPageReducers } from './LoginPage.reducers';
import { storeDataAction } from '../../core/storage-helper';
import { USER_DATA, StorageKey } from '../../common/constants';
import { UserDataModel } from '../../app/App.model';


const mapStateToProps = (state: AppState) =>{
    return {
      displayMode: state.displayMode,
      loginRequest: state.loginPageState.loginRequestState,
      userData: state.userData
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    login: (username: string, password: string) => dispatch(requestLoginAction(username, password)),
    push: (url: string) => dispatch(push(url)),
    saveUserData: (userData: UserDataModel) => dispatch(storeDataAction(USER_DATA, StorageKey.USER_DATA, userData))
});

const loginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

type LoginPageDispatchProps = ReturnType<typeof mapDispatchToProps>;
type LoginPageStateProps = ReturnType<typeof mapStateToProps>;
export type LoginPageProps = LoginPageDispatchProps & LoginPageStateProps;
export {loginPage as LoginPage, LoginPageReducers};