import { Menu } from './../../common/constants/index';
import { ClickMenuAction, CLICK_MENU } from './SideMenuComponent.actions';
import { SideMenuState } from './SideMenuComponent.model';

const initialState: SideMenuState = {
    activeMenu: Menu.DASHBOARD,
    activeSubMenu: '',
    jobsMenuExpanded: false
}

export function clickMenuReducer(state: SideMenuState = initialState, action: ClickMenuAction): SideMenuState {
    if (action.type === CLICK_MENU) {
        if(action.payload.menu === Menu.JOBS && action.payload.subMenu === '') {
            return {
                activeMenu: action.payload.menu,
                activeSubMenu: action.payload.subMenu,
                jobsMenuExpanded: !state.jobsMenuExpanded
            };
        }else{
            return {
                activeMenu: action.payload.menu,
                activeSubMenu: action.payload.subMenu,
                jobsMenuExpanded: state.jobsMenuExpanded
            };
        }
    }
    return state;
};