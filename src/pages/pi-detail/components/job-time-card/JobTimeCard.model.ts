import { JobsDataModel } from "../../../jobs-execution/jobs/JobsPage.model";
import { EquipmentState } from "../../PiDetailPage.actions";

export interface EquipmentModel {
    workorderguid: string
    equipmentId: string
    downTimeEnd?: Date | string
    downTimeStart?: Date
    smr?: number,
    hmTravel?: number,
    km?: number,
    location?: string
}

export interface EquipmentProps {
    equipment: EquipmentState,
    equipmentValue: EquipmentModel,
    displayMode: string,
    identity: JobsDataModel,
    token?: string,
    updateEquipment: (data: EquipmentModel) => void
    submitEquipment: (data: EquipmentModel, token?: string) => void,
    fetchEquipment: (woId: string, token?: string) => void
}

export interface EquipmentComponentState {
    timeEnd?: Date | string
    dateEnd?: Date | string,
    isError: boolean,
    errorMsg: string,
}