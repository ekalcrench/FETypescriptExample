import { TimezoneState } from "../../../../core/timezone-helpers/Timezone.actions";

export interface AssignmentSummaryModel {
    date: string,
    createdBy: string
    assignedBy: string
    mechanicList: MechanicModel[]
    mechanicLeader: MechanicModel
    handoverDate?: Date,
    handoverCreatedBy?: string,
    handoverAssignedBy?: string,
    handoverMechanicLeader?: MechanicModel,
    handoverMechanicList?: MechanicModel[]
}

export interface MechanicModel {
    userName: string,
    name: string
}

export interface AssignmentSummaryProps {
    summary: AssignmentSummaryModel
    timezoneInfo: TimezoneState,
    setTimezone: (timezone: string) => void
}