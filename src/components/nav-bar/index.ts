import NavBarComponent from './NavBarComponent';
import { AppState } from '../../app';
import { connect } from 'react-redux';
import { toggleMenuAction } from './NavbarComponent.actions';

const mapStateToProps = (state: AppState) => ({
    path: state.router.location.pathname,
    userData: state.userData,
    displayMode: state.displayMode,
    menuDrawerState: state.menuDrawerState
})

const mapDispatchToProps = (dispatch: any) => ({
    toggleMenu: (isOpen: boolean) => dispatch(toggleMenuAction(isOpen))
})

type NavBarComponentStateProps = ReturnType<typeof mapStateToProps>;
type NavBarComponentDispatchProps = ReturnType<typeof mapDispatchToProps>;
export type NavBarComponentProps = NavBarComponentStateProps & NavBarComponentDispatchProps;
export default connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);