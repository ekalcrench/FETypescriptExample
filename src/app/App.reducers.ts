import { history } from './../configure-store';
import { combineReducers, AnyAction } from 'redux';
import { connectRouter } from 'connected-react-router';
import { LoginPageReducers } from '../pages/login';
import { clickMenuReducer } from '../components/side-menu/SideMenuComponent.reducers';
import { JobsReducers } from '../pages/jobs-execution/jobs';
import { UserDataModel } from './App.model';
import { StorageAction, STORAGE_ACTIONS } from '../core/storage-helper';
import { USER_DATA, JOB_DATA } from '../common/constants';
import { setPageDisplayModeReducer } from '../core/page-helpers';
import { toggleMenuReducer } from '../components/nav-bar/NavbarComponent.reducers';
import { PIDetailReducers } from '../pages/pi-detail/PiDetailPage.reducers';
import { ReportReducers } from '../pages/jobs-execution/jobs-report/JobsReport.reducer';
import { LOGOUT_ACTION } from '../components/side-menu/SideMenuComponent.actions';
import { setTimezoneReducer } from '../core/timezone-helpers/Timezone.reducers';
import { JobsDataModel } from '../pages/jobs-execution/jobs/JobsPage.model';

//app level reducers
const initialState: UserDataModel = {tokenResponse: {}};

function userDataReducer(state: UserDataModel = initialState, action: StorageAction): UserDataModel {
    if(action.type === STORAGE_ACTIONS.REMOVE_DATA + USER_DATA) {
        return {tokenResponse: {}};
    }else if(action.data && ((action.type === STORAGE_ACTIONS.GET_DATA + USER_DATA) || 
        action.type === STORAGE_ACTIONS.STORE_DATA + USER_DATA)) {
        return action.data;
    }
    return state;
}

function selectedJobDataReducer(state: JobsDataModel = {}, action: StorageAction): JobsDataModel {
    if(action.data && ((action.type === STORAGE_ACTIONS.GET_DATA + JOB_DATA) || 
        action.type === STORAGE_ACTIONS.STORE_DATA + JOB_DATA)) {
        return action.data;
    }
    return state;
}

function lastActionReducer(state: string = '', action: AnyAction): string {
    if(action.type) {
        return action.type;
    }
    return state;
}

//combined reducers
const AppReducer = combineReducers({
  router: connectRouter(history),
  lastAction: lastActionReducer,
  userData: userDataReducer,
  sideMenuComponentState: clickMenuReducer,
  loginPageState: LoginPageReducers,
  jobsPageState: JobsReducers,
  displayMode: setPageDisplayModeReducer,
  timezone: setTimezoneReducer,
  menuDrawerState: toggleMenuReducer,
  piPageState: PIDetailReducers,
  reportState: ReportReducers,
  selectedJobData: selectedJobDataReducer,
});

const RootReducer = (state: any, action: any) => {
    if (action.type === LOGOUT_ACTION) { state = undefined }
    return AppReducer(state, action)
}

export type AppState = ReturnType<typeof RootReducer>;

export {AppReducer};