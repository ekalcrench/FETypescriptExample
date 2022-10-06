import { BacklogListParameter } from "../../PiDetailPage.model";
import { ValidationState, ApprovalState } from "../../PiDetailPage.actions";
import { ApiRequestActionsStatus } from "../../../../core/rest-client-helpers";

export interface BacklogEntrySheetDetailProps {
    onClose: () => void;
    closeBMS: (backlogId: string, token?: string) => void;
    approveBES: (backlogId: string, token?: string) => void;
    updateBacklogDetail: (data: BacklogEntrySheet) => void,
    fetchSpecificObject: (payload: ObjectPartModel, token?: string) => void,
    searchSparePart: (keyword: string, token?: string) => void,
    submitBacklog: (data: BacklogEntrySheet, token?: string) => void,
    validateSparepart: (spareparts: string[], token?: string) => void,
    onReject: () => void,
    displayMode?: string;
    backlogDetailUpdate: BacklogEntrySheet,
    backlogParameter: BacklogListParameter,
    backlogSubmission: ApprovalState,
    backlogRejected: ApprovalState,
    besApprovalStatus: ApiRequestActionsStatus
    bmsClosedStatus: ApiRequestActionsStatus,
    besMaster: BacklogMaster,
    spareParts: PartRequirementModel[],
    specificObjectParts: SpecificObjectPartModel[]
    token?: string,
    sparePartsValidation: ValidationState
}

export interface BacklogEntrySheetState {
    selectedDate: Date,
    showEvidence: boolean,
    showIdentity: boolean,
    showRequirement: boolean,
    displaySuggestion: boolean,
    file: any,
    imgUrl: any,
    error: string,
    imageAction: 'add' | 'change' | undefined,
    deletedImage: string | undefined,
    changedPartIndex: number,
    addPartError: string,
    isSubmissionError: boolean,
    isSubmitConfirmationShown: boolean,
    isApproveConfirmationShown: boolean,
    isCloseConfirmationShown: boolean,
    previewImg: boolean,
    selectedImg: any,
}

export interface BacklogEntrySheet {
    backlogId?: string,
    workOrderId?: string,
    woNumber?: string,
    workZone?: WorkZoneModel
    specificObjectPart?: SpecificObjectPartModel,
    objectPart?: ObjectPartModel,
    damage?: DamageModel,
    cause?: CauseModel,
    suggestedAction?: SuggestedActionModel,
    priority?: PriorityModel,
    responsibility?: ResponsibilityModel,
    status?: string,
    remark?: string,
    jobType?: string,
    serialNumber?: string,
    unitCode?: string,
    unitModel?: string,
    equipmentNumber?: string,
    estimation?: number,
    images?: string[],
    leaderApproveDate?: Date,
    superVisorAprroveDate?: Date,
    leaderApproveBy?: string,
    superVisorApproveBy?: string,
    partRequirements?: PartRequirementModel[],
    aging?: number;
    backlogCreatedBy?: string,
    backlogCreatedDate?: string,
    smr?: number,
    km?: number,
    notifNumber?: string,
    action?: SuggestedActionModel,
    problemDesc?: string
}

export interface BacklogMaster {
    objectparts: ObjectPartModel[],
    damages: DamageModel[],
    causes: CauseModel[],
    suggestedActions: SuggestedActionModel[],
    actions: SuggestedActionModel[],
    responsibilities: ResponsibilityModel[],
    mPriorities: PriorityModel[],
    backlogStatuses: BacklogStatusModel[],
}

export interface BacklogStatusModel {
    status: string
}

export interface WorkZoneModel {
    equipmentModelId?: string,
    unitModel?: string,
    zone?: string,
    zoneDesc: string,
}

export interface SuggestedActionModel {
    actionCode?: string,
    actionDesc: string,
    actionType?: string,
    sequence?: number,
}

export interface CauseModel {
    causeCode?: string,
    causeDesc: string,
    sequence?: number,
}

export interface DamageModel {
    damageCode: string,
    damageDesc?: string,
    sequence?: number,
}

export interface ObjectPartModel {
    mObjPartId?: string,
    objPartCategory?: string,
    objPartCode: string,
    sequence?: number,
}

export interface SpecificObjectPartModel {
    mObjPartId?: string,
    objPartCategory?: string,
    objPartCode?: string,
    sequence?: number,
    objSpecificPartCode?: string,
    objSpecificPartDesc: string,
}

export interface ResponsibilityModel {
    responsibilityCode?: string,
    responsibilityDesc: string,
    sequence?: number,
}

export interface PriorityModel {
    priorityCode?: string,
    priorityDesc: string,
    sequence?: number
}

export interface PartRequirementModel {
    partNumber: string,
    partDescription: string,
    quantity: number,
    isValidated?: boolean
}

export interface SparepartValidationModel {
    sparepartNumber: string,
    isValidated: boolean
}