import { JobsDataModel } from "../../../jobs-execution/jobs/JobsPage.model";
import { ApiRequestActionsStatus } from "../../../../core/rest-client-helpers";
import { ApprovalState } from "../../PiDetailPage.actions";

export interface PIFormProps {
    onBacklogClick: (backlogId: string) => void
    onClose: () => void
    approvePI: (woId: string, token?: string) => void;
    updatePIForm: (checksheet: ZoneCheckSheetModel[]) => void;
    submitPI: (data: PISubmissionModel, token?: string) => void;
    handover: (woId: string, token?: string) => void;
    unhandover: (woId: string, token?: string) => void;
    piQuestions: PIQuestionModel;
    piApprovalResponse: boolean;
    piApprovalStatus: ApiRequestActionsStatus;
    piSubmissions: ApprovalState;
    piAnswers: PIDetailModel;
    piFormData: ZoneCheckSheetModel[]
    identity: JobsDataModel,
    handoverStatus: ApprovalState,
    unhandoverStatus: ApprovalState,
    token?: string
}

export interface PIQuestionModel {
    zones: WorkZoneModel[],
    mPriority: PriorityModel[],
    mNotes: NoteModel[],
    mCondition: ConditionModel[],
}

export interface PISubmissionModel {
    additionalFluids: AdditionalFluid[],
    checkSheetValueDTOs: CheckSheetValueModel[]
}

export interface WorkZoneModel {
    zone: string,
    areaGroups: AreaGroupsModel[]
}

export interface AreaGroupsModel {
    area: string,
    zone: string,
    checkSheetMasters: CheckSheetModel[],
}

export interface CheckSheetModel {
    zoneDesc: string,
    areaDesc: string,
    chsMasterId: string,
    unitModel: string,
    formNumber: string,
    itemDesc: string,
    measurement: string,
    version: number,
    sequence: number,
}

export interface PriorityModel {
    priorityCode: string,
    priorityDesc: string,
    sequence: number,
}

export interface NoteModel {
    noteCode: string,
    noteDesc: string,
    sequence: number,
}

export interface ConditionModel {
    measurement: string;
    conditionDesc: string;
    typeDesc: string;
    conditionCode: string;
    sequence: number;
}

export interface PIDetailModel {
    goodCondition: number,
    badCondition: number,
    uncheckCondition: number,
    zoneCheckSheets: ZoneCheckSheetModel[]
}

export interface ZoneCheckSheetModel {
    additionalFluids: AdditionalFluid[],
    areaCheckSheets: AreaCheckSheetModel[],
    zoneDesc: string,
}

export interface AreaCheckSheetModel {
    checkSheetValue: CheckSheetValueModel[],
    goodCondition: number,
    badCondition: number,
    area: string,
    zoneDesc?: string,
    uncheckCondition: number,
}

export interface AdditionalFluid {
    additionalFluidName: string,
    fluidDataId: string,
    fluidQuantity: number,
    uom: string,
    workOrderId?: string,
    zoneDesc?: string,
    isActive?: boolean
}

export interface CheckSheetValueModel {
    checkSheetValueId: string,
    workorderId: string,
    woNumber: string,
    unitModel: string,
    serialNumber: string,
    unitCode: string,
    equipmentNumber: string,
    formNumber: string,
    zoneDesc: string,
    areaDesc: string,
    itemDesc: string,
    version: string,
    sequence: number,
    measurement: string,
    mPriority: PriorityModel,
    mNotes: NoteModel,
    mCondition: ConditionModel,
    comment: string,
    leaderApproveDate?: Date
    superVisorAprroveDate?: string,
    leaderApproveBy?: string,
    superVisorApproveBy?: string,
    backlogId?: string
}
