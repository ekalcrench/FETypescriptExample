export const CLICK_MENU = 'CLICK_MENU';
export const LOGOUT_ACTION = 'USER_LOGOUT';

export interface ClickMenuActionPayload{
    menu: string;
    subMenu: string;
}

export interface ClickMenuAction{
    type: string;
    payload: ClickMenuActionPayload;
}

export function clickMenuAction(payload: ClickMenuActionPayload): ClickMenuAction{
    return {type: CLICK_MENU, payload};
}

export function logoutAction() {
    return {type: LOGOUT_ACTION}
}