export const ToggleMenuActionType = 'TOGGLE_MENU';
export interface ToggleMenuAction{
    type: string;
    isOpen: boolean;
}
export function toggleMenuAction(isOpen: boolean): ToggleMenuAction {
    return{
        type: ToggleMenuActionType,
        isOpen
    }
}