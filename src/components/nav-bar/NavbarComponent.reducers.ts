import { ToggleMenuAction, ToggleMenuActionType } from "./NavbarComponent.actions";

const initialMenuIsOpen: boolean = false;

export function toggleMenuReducer(state: boolean = initialMenuIsOpen, action: ToggleMenuAction): boolean {
    if(action.type === ToggleMenuActionType) {
        return action.isOpen
    }
    return state;
}