export enum STORAGE_ACTIONS {
    STORE_DATA = 'STORE_',
    REMOVE_DATA = 'REMOVE_',
    GET_DATA = 'GET_'
}

export interface StorageAction{
    type: string;
    data?: any;
}

export function storeDataAction(type: string, storageKey: string, data: any): StorageAction {
    localStorage.setItem(storageKey, JSON.stringify(data));
    return {type: STORAGE_ACTIONS.STORE_DATA + type, data};
}

export function removeDataAction(type: string): StorageAction {
    return {type: STORAGE_ACTIONS.REMOVE_DATA + type};
}

export function getDataAction<T>(type: string, storageKey: string): StorageAction {
    let dataString: string | null = localStorage.getItem(storageKey);
    let dataObject: T = dataString ? JSON.parse(dataString) : null;
    return {type: STORAGE_ACTIONS.GET_DATA + type, data: dataObject}
}