import SideMenuComponent from './SideMenuComponent';
import { connect } from 'react-redux';
import { AppState } from './../../app/index';
import { push } from 'connected-react-router';
import { clickMenuAction, logoutAction } from './SideMenuComponent.actions';
import { toggleMenuAction } from '../nav-bar/NavbarComponent.actions';
import { removeDataAction } from '../../core/storage-helper';
import { USER_DATA } from '../../common/constants';

const mapStateToProps = (state: AppState) => ({
    path: state.router.location.pathname,
    jobsMenuExpanded: state.sideMenuComponentState.jobsMenuExpanded,
    activeMenu: state.sideMenuComponentState.activeMenu,
    activeSubMenu: state.sideMenuComponentState.activeSubMenu,
    displayMode: state.displayMode,
    menuDrawerState: state.menuDrawerState
})

const mapDispatchToProps = (dispatch: any) => ({
    clickMenu: (menu: string, subMenu: string) => dispatch(clickMenuAction({menu: menu, subMenu: subMenu})),
    push: (path: string) => dispatch(push(path)),
    closeDrawer: () => dispatch(toggleMenuAction(false)),
    logout: () => dispatch(removeDataAction(USER_DATA)),
    onLogout: () => dispatch(logoutAction())
});

type SideMenuComponentDispatchProps = ReturnType<typeof mapDispatchToProps>;
type SideMenuComponentStateProps = ReturnType<typeof mapStateToProps>;
export type SideMenuComponentProps = SideMenuComponentDispatchProps & SideMenuComponentStateProps;
export default connect(mapStateToProps, mapDispatchToProps)(SideMenuComponent);