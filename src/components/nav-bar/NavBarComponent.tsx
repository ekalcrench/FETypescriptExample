import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { AccountPic, DcaLogo } from '../../assets/imgs';
import { NavBarComponentProps } from '.';
import { MenuToggle } from '../../assets/icons';
import { isAccessTokenValid } from '../../core/helpers-function';
import './NavBarComponent.scss';

class NavBarComponent extends React.Component<NavBarComponentProps>{
    render() {
        let navBar = null;
        if(isAccessTokenValid()){
            if(this.props.displayMode === 'web') {
                navBar = (
                    <AppBar position="fixed" className="app-bar">
                        <Toolbar variant="dense" className="toolbar">
                            <p>Hi, {`${this.props.userData.firstName} ${this.props.userData.lastName}`}</p> &nbsp; &nbsp;
                            <img src={AccountPic} className="account-pic" alt=""/>
                        </Toolbar>
                    </AppBar>
                );
            } else {
                navBar = (
                    <AppBar position="fixed" className="app-bar-tab">
                        <img src={MenuToggle} alt="menu" className="menu-toggle" onClick={() => this.props.toggleMenu(!this.props.menuDrawerState)} />
                        <Toolbar variant="dense" className="toolbar">
                            <img src={DcaLogo} className="logo-dca" alt=""/>
                        </Toolbar>
                    </AppBar>
                );
            }
        }
        return navBar;
    }
}

export default NavBarComponent;