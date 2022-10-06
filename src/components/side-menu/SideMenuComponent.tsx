import React from 'react';
import { ListItemText, ListItemIcon, ListItem, List, Drawer, Modal, DialogContent } from '@material-ui/core';
import './SideMenuComponent.scss';
import { DcaLogo } from '../../assets/imgs';
import { AssignmentIcon, SettingsIcon, LogoutIcon } from '../../assets/icons';
import { Collapse } from '@material-ui/core';
import { Menu, StorageKey } from '../../common/constants';
import { SideMenuComponentProps } from '.';
import { LogoutModal } from './logout';

class SideMenuComponent extends React.Component<SideMenuComponentProps> {
    state = {
        isLogoutModalShown: false
    }

    handleClick(menu: string, subMenu: string) {
        this.props.clickMenu(menu, subMenu);
        if(menu === Menu.JOBS){
            if(subMenu !== '') this.props.push(subMenu);
        }else{
            this.props.push(menu);
        }
    }

    handleLogout = () => { 
        localStorage.removeItem(StorageKey.USER_DATA)
        this.props.logout();
        this.props.onLogout();
        this.setState({isLogoutModalShown: false});
        this.props.push(Menu.LOGIN)
    }
    
    render(){
        let drawer = null;
        if(this.props.path !== Menu.LOGIN && this.props.path !== Menu.LOGIN + '/'){
            drawer = (
                <Drawer 
                    className="menu" 
                    variant={this.props.displayMode === 'web' ? 'permanent' : 'temporary'} 
                    classes={{paper: "drawer-paper", docked: "docked"}} 
                    anchor="left" 
                    open={this.props.menuDrawerState} 
                    onClose={() => this.props.closeDrawer()} >
                    <img src={DcaLogo} alt='logo' className="dca-logo"/>
                    <List>
                        <ListItem 
                            button key="dashboard"
                            className={this.props.path === Menu.DASHBOARD ? "menu-item-selected": "menu-item"}
                            onClick={() => this.handleClick(Menu.DASHBOARD, '')}>
                            <ListItemIcon classes={{root: 'icon-root'}}><img src={AssignmentIcon} alt='assignment icon' className="item-icon"/></ListItemIcon>
                            <ListItemText primary="Dashboard" classes={{primary: "item-text", root: "item-text"}}/>            
                        </ListItem>
                        <ListItem 
                            button key="jobs"
                            className={this.props.path.includes(Menu.JOBS) ? "menu-item-selected": "menu-item"}
                            onClick={() => this.handleClick(Menu.JOBS, '')}>
                            <ListItemIcon classes={{root: 'icon-root'}}><img src={AssignmentIcon} alt='assignment icon' className="item-icon"/></ListItemIcon>
                            <ListItemText primary="Jobs Execution" classes={{primary: "item-text", root: "item-text"}}/>            
                        </ListItem>
                        <Collapse in={this.props.jobsMenuExpanded} timeout="auto" unmountOnExit>
                        <List disablePadding>
                            <ListItem 
                                button key="jobs-assignment" 
                                className={this.props.path === Menu.JOBS_SUMMARY ? "sub-menu-selected": "sub-menu"}
                                onClick={() => this.handleClick(Menu.JOBS, Menu.JOBS_SUMMARY)}>
                                <ListItemIcon classes={{root: 'icon-root'}}><img src={AssignmentIcon} alt='assignment icon' className="item-icon"/></ListItemIcon>
                                <ListItemText primary="Jobs" classes={{primary: "item-text", root: "item-text"}}/>            
                            </ListItem>
                            <ListItem 
                                button key="jobs-report" 
                                className={this.props.path === Menu.JOBS_REPORT ? "sub-menu-selected": "sub-menu"}
                                onClick={() => this.handleClick(Menu.JOBS, Menu.JOBS_REPORT)}>
                                <ListItemIcon classes={{root: 'icon-root'}}><img src={AssignmentIcon} alt='assignment icon' className="item-icon"/></ListItemIcon>
                                <ListItemText primary="Reports" classes={{primary: "item-text", root: "item-text"}}/>            
                            </ListItem>
                        </List>
                        </Collapse>
                        <ListItem 
                            button key='backlog' 
                            className={this.props.path === Menu.BACKLOG ? "menu-item-selected": "menu-item"}
                            onClick={() => this.handleClick(Menu.BACKLOG, '')}>
                            <ListItemIcon classes={{root: 'icon-root'}}><img src={AssignmentIcon} alt='assignment icon' className="item-icon"/></ListItemIcon>
                            <ListItemText primary="Backlog Monitoring" classes={{primary: "item-text", root: "item-text"}}/>            
                        </ListItem>
                        <ListItem 
                            button key='fc'
                            className={this.props.path === Menu.FC ? "menu-item-selected": "menu-item"}
                            onClick={() => this.handleClick(Menu.FC, '')}>
                            <ListItemIcon classes={{root: 'icon-root'}}><img src={AssignmentIcon} alt='assignment icon' className="item-icon"/></ListItemIcon>
                            <ListItemText primary="FC Monitoring" classes={{primary: "item-text", root: "item-text"}}/>            
                        </ListItem>
                        <ListItem 
                            button key='master-data' 
                            className={this.props.path === Menu.MASTER_DATA ? "menu-item-selected": "menu-item"}
                            onClick={() => this.handleClick(Menu.MASTER_DATA, '')}>
                            <ListItemIcon classes={{root: 'icon-root'}}><img src={AssignmentIcon} alt='assignment icon' className="item-icon"/></ListItemIcon>
                            <ListItemText primary="Master Data Uploader" classes={{primary: "item-text", root: "item-text"}}/>            
                        </ListItem>
                        <ListItem 
                            button key='settings' 
                            className={this.props.path === Menu.SETTINGS ? "menu-item-selected": "menu-item"}
                            onClick={() => this.handleClick(Menu.SETTINGS, '')}>
                            <ListItemIcon classes={{root: 'icon-root'}}><img src={SettingsIcon} alt='assignment icon' className="item-icon"/></ListItemIcon>
                            <ListItemText primary="Settings" classes={{primary: "item-text", root: "item-text"}}/>            
                        </ListItem>
                        <ListItem />
                        <ListItem 
                            button key='logout' 
                            className={this.props.path === Menu.LOGOUT ? "menu-item-selected": "menu-item"}
                            onClick={() => this.setState({isLogoutModalShown: true})}>
                            <ListItemIcon classes={{root: 'icon-root'}}><img src={LogoutIcon} alt='assignment icon' className="item-icon"/></ListItemIcon>
                            <ListItemText primary="Logout" classes={{primary: "item-text", root: "item-text"}}/>            
                        </ListItem>
                    </List>
                    <Modal open={this.state.isLogoutModalShown} className="modal-container" onClose={() => this.setState({isLogoutModalShown: false})}>
                        <DialogContent className="modal-content" >
                            <LogoutModal onYesClicked={this.handleLogout} onNoClicked={() => this.setState({isLogoutModalShown: false})}/>
                        </DialogContent>
                    </Modal>
                </Drawer>
            )
        }
        return drawer;
    }
}

export default SideMenuComponent;