export const SetPageDisplayModeActionType = 'SET_PAGE_DISPLAY_MODE';

export interface SetPageDisplayModeAction{
    type: string;
    mode: string;
}

export function setPageDisplayModeAction(mode: string): SetPageDisplayModeAction {
    return {
        type: SetPageDisplayModeActionType,
        mode
    }
}