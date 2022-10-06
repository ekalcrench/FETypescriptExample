import { SetPageDisplayModeAction, SetPageDisplayModeActionType } from "./Page.actions";

const initialPageDisplayMode = window.innerWidth < 600 ? 'mobile' : window.innerWidth < 1026 ? 'tab': 'web';
export function setPageDisplayModeReducer(state: string = initialPageDisplayMode, action: SetPageDisplayModeAction) {
    if(action.type === SetPageDisplayModeActionType) {
        return action.mode;
    }
    return state;
}