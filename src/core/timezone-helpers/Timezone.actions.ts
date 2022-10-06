export const SetTimezoneActionType = "SET_TIMEZONE"

export interface SetTimezoneAction {
    type: string,
    timezone: string 
}

export interface TimezoneState {
    timezone: string,
    indonesianTimezone: string | 'WIB' | 'WIT' | 'WITA'
}

export function setTimezoneAction(timezone: string): SetTimezoneAction {
    return {
        type: SetTimezoneActionType,
        timezone
    }
}