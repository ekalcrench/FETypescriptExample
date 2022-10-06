import { SetTimezoneAction, SetTimezoneActionType, TimezoneState } from './Timezone.actions'

const initialTimezoneState: TimezoneState = {timezone: '00:00', indonesianTimezone: ''}

export function setTimezoneReducer(state: TimezoneState = initialTimezoneState, action: SetTimezoneAction): TimezoneState {
 if (action.type === SetTimezoneActionType) {
    if (action.timezone === '+07:00') return {timezone: '+07:00', indonesianTimezone: 'WIB'}
    else if (action.timezone === '+08:00') return {timezone: '+08:00', indonesianTimezone: 'WITA'}
    else if (action.timezone === '+09:00') return {timezone: '+09:00', indonesianTimezone: 'WIT'}
    else return {...state, indonesianTimezone: ''}; 
 }  
 return state; 
}