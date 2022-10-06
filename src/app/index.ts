import App from './App';
import { AppReducer, AppState } from './App.reducers';
import { AppProps } from './App.model';
import { getDataAction } from '../core/storage-helper';
import { USER_DATA, StorageKey } from '../common/constants';
import { connect } from 'react-redux';
import { setPageDisplayModeAction } from '../core/page-helpers/Page.actions';
import { setTimezoneAction } from '../core/timezone-helpers/Timezone.actions';

export type AppState = AppState;
export type AppProps = AppProps;

const mapDispatchToProps = (dispatch: any) => ({
    getUserData: () => dispatch(getDataAction(USER_DATA, StorageKey.USER_DATA)),
    setDisplayMode: (mode: string) => dispatch(setPageDisplayModeAction(mode)),
    setTimezone: (timezone: string) => dispatch(setTimezoneAction(timezone)),
})

export type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
export type AppDefaultProps = AppProps & AppDispatchProps;

const app = connect(null, mapDispatchToProps)(App);
export {app as App, AppReducer};