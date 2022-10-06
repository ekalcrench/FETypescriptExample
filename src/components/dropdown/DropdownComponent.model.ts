export interface DropdownState{
    displayMenu: boolean;
}

export interface DropdownModel{
    name: string;
    value: string;
}

export interface DropdownProps{
    data?: any[];
    selected?: string;
    onSelectAction: (type: string, item: any) => void;
    onSelectActionType: string;
    displayMode?: string
}