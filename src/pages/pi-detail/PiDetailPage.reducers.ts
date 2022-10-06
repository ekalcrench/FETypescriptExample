import { combineReducers } from 'redux';
import { ApiClientAction, ApiRequestActionsStatus } from '../../core/rest-client-helpers';
import { JobsDataModel } from '../jobs-execution/jobs/JobsPage.model';
import { BacklogEntrySheet, BacklogMaster, SpecificObjectPartModel, PartRequirementModel, SparepartValidationModel } from './components/backlog-entry-sheet-detail/BacklogEntrySheetDetail.model';
import { AssignmentSummaryModel } from './components/job-assignment/JobAssignment.model';
import { BacklogListModel } from './components/job-list/JobList.model';
import { EquipmentModel } from './components/job-time-card/JobTimeCard.model';
import { PIDetailModel, PIQuestionModel, ZoneCheckSheetModel } from './components/pi-form/PIForm.model';
import { ApprovalState, ApproveBESAction, ApprovePIAction, AssignmentHistoryState, BacklogDetailAction, BacklogDetailState, BacklogListState, BacklogMasterState, BacklogsParameterAction, BacklogSummaryState, CloseBMSAction, EquipmentState, EquipmentValueAction, FetchAssignmentSummaryAction, FetchBacklogDetailAction, FetchBacklogListAction, FetchBacklogSummaryAction, FetchBESMasterAction, FetchEquipmentValueAction, FetchIdentityAction, FetchPIAnswerAction, FetchPIQuestionAction, FetchSpecificObjectPartAction, FetchStagingInfoAction, IdentityState, SpecificObjectPartState, PIAnswerState, PIFormAnswerAction, PIQuestionState, StagingInfoState, UpdateBacklogDetailAction, UpdateBacklogParameterAction, UpdateEquipmentValueAction, UpdatePIFormStateAction, SubmitBacklogAction, SubmitPIAction, SearchSparePartAction, SubmitEquipmentAction, ValidationState, RejectBacklogAction, ValidateSparePartAction, HandoverAction, UnhandoverAction } from './PiDetailPage.actions';
import { BacklogListParameter, BacklogSummaryModel, StagingInfoModel } from './PiDetailPage.model';

const initialAssignmentSummary: AssignmentSummaryModel = { date: 'N/A', createdBy: 'N/A', assignedBy: 'N/A', mechanicList: [], mechanicLeader: { name: 'N/A', userName: 'N/A' } }
const initialBacklog: BacklogListModel = { listBacklog: [], currentPage: 1, prevPage: false, nextPage: false, totalPage: 1 }
const initialBacklogParameter: BacklogListParameter = { workorderid: '', equipmentNumber: '', filter: '', showBMS: true, showBES: true, pageSize: 5, currentPage: 1, }
const initialBacklogSummary: BacklogSummaryModel = { backlogEntryPriority1: 0, backlogEntryPriority2: 0, backlogEntryPriority3: 0, backlogEntryPriority4: 0, backlogMonitoringUpdate: 0 }
const initialBESMaster: BacklogMaster = { mPriorities: [], causes: [], damages: [], responsibilities: [], objectparts: [], suggestedActions: [], actions: [], backlogStatuses: [{status: 'OPEN'}, {status: 'CLOSED'}] }
const initialIdentity: JobsDataModel = { unitModel: '', unitCode: '', unitSerialNumber: '', engineModel: '', engineSerialNumber: '', woNumber: '', workCenter: '', lastSMR: 0, }
const initialPIDetail: PIDetailModel = { goodCondition: 0, badCondition: 0, uncheckCondition: 0, zoneCheckSheets: [] }
const initialQuestion: PIQuestionModel = { zones: [], mCondition: [], mNotes: [], mPriority: [] }
const initialEquipment: EquipmentModel = { workorderguid: '', equipmentId: '' }

const initialApproval: ApprovalState = { response: false, status: ApiRequestActionsStatus.IDLE }
const initialAssignmentState: AssignmentHistoryState = { data: initialAssignmentSummary, status: ApiRequestActionsStatus.IDLE }
const initialBacklogDetailState: BacklogDetailState = { data: {}, status: ApiRequestActionsStatus.IDLE }
const initialBacklogListState: BacklogListState = { data: initialBacklog, status: ApiRequestActionsStatus.IDLE }
const initialBacklogSummaryState: BacklogSummaryState = { data: initialBacklogSummary, status: ApiRequestActionsStatus.IDLE }
const initialBacklogMasterState: BacklogMasterState = { data: initialBESMaster, status: ApiRequestActionsStatus.IDLE }
const initialEquipmentState: EquipmentState = { data: initialEquipment, status: ApiRequestActionsStatus.IDLE }
const initialIdentityState: IdentityState = { data: initialIdentity, status: ApiRequestActionsStatus.IDLE }
const initialObjectPartState: SpecificObjectPartState = { data: [], status: ApiRequestActionsStatus.IDLE }
const initialPIState: PIAnswerState = { data: initialPIDetail, status: ApiRequestActionsStatus.IDLE }
const initialPIQuestionState: PIQuestionState = { data: initialQuestion, status: ApiRequestActionsStatus.IDLE }
const initialStagingState: StagingInfoState = { data: [], status: ApiRequestActionsStatus.IDLE }
const initialValidationState: ValidationState = { data: [], status: ApiRequestActionsStatus.IDLE }

export function approveBESReducer(state: ApprovalState = initialApproval, action: ApiClientAction<typeof ApproveBESAction, boolean>): ApprovalState {
    if (action.type === ApproveBESAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { response: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { response: initialApproval.response, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { response: initialApproval.response, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function approvePIReducer(state: ApprovalState = initialApproval, action: ApiClientAction<typeof ApprovePIAction, boolean>): ApprovalState {
    if (action.type === ApprovePIAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { response: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { response: initialApproval.response, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { response: initialApproval.response, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function backlogListParameterReducer(state: BacklogListParameter = initialBacklogParameter, action: BacklogsParameterAction): BacklogListParameter {
    if (action.type === UpdateBacklogParameterAction) {
        return action.payload
    }
    return state
}

export function closeBMSReducer(state: ApprovalState = initialApproval, action: ApiClientAction<typeof CloseBMSAction, boolean>): ApprovalState {
    if (action.type === CloseBMSAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { response: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { response: initialApproval.response, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { response: initialApproval.response, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function fetchAssignmentSummaryReducer(state: AssignmentHistoryState = initialAssignmentState, action: ApiClientAction<typeof FetchAssignmentSummaryAction, AssignmentSummaryModel>): AssignmentHistoryState {
    if (action.type === FetchAssignmentSummaryAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { data: initialAssignmentState.data, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { data: initialAssignmentState.data, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function fetchBacklogDetailReducer(state: BacklogDetailState = initialBacklogDetailState, action: ApiClientAction<typeof FetchBacklogDetailAction, BacklogEntrySheet>): BacklogDetailState {
    if (action.type === FetchBacklogDetailAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { data: initialBacklogDetailState.data, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { data: initialBacklogDetailState.data, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function fetchBacklogListReducer(state: BacklogListState = initialBacklogListState, action: ApiClientAction<typeof FetchBacklogListAction, BacklogListModel>): BacklogListState {
    if (action.type === FetchBacklogListAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { data: initialBacklogListState.data, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { data: initialBacklogListState.data, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function fetchBacklogSummaryReducer(state: BacklogSummaryState = initialBacklogSummaryState, action: ApiClientAction<typeof FetchBacklogSummaryAction, BacklogSummaryModel>): BacklogSummaryState {
    if (action.type === FetchBacklogSummaryAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { data: initialBacklogSummaryState.data, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { data: initialBacklogSummaryState.data, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function fetchBESMasterReducer(state: BacklogMasterState = initialBacklogMasterState, action: ApiClientAction<typeof FetchBESMasterAction, BacklogMaster>): BacklogMasterState {
    if (action.type === FetchBESMasterAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { data: {...state.data, ...action.payload }, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { data: initialBacklogMasterState.data, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { data: initialBacklogMasterState.data, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function fetchEquipmentReducer(state: EquipmentState = initialEquipmentState, action: ApiClientAction<typeof FetchEquipmentValueAction, EquipmentModel>): EquipmentState {
    if (action.type === FetchEquipmentValueAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { data: initialEquipmentState.data, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { data: initialEquipmentState.data, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function fetchIdentityReducer(state: IdentityState = initialIdentityState, action: ApiClientAction<typeof FetchIdentityAction, JobsDataModel>): IdentityState {
    if (action.type === FetchIdentityAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { data: initialIdentityState.data, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { data: initialIdentityState.data, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function fetchPIAnswerReducer(state: PIAnswerState = initialPIState, action: ApiClientAction<typeof FetchPIAnswerAction, PIDetailModel>): PIAnswerState {
    if (action.type === FetchPIAnswerAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { data: initialPIState.data, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { data: initialPIState.data, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function fetchPIQuestion(state: PIQuestionState = initialPIQuestionState, action: ApiClientAction<typeof FetchPIQuestionAction, PIQuestionModel>): PIQuestionState {
    if (action.type === FetchPIQuestionAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { data: initialPIQuestionState.data, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { data: initialPIQuestionState.data, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function fetchSpecificObjectPartReducer(state: SpecificObjectPartState = initialObjectPartState, action: ApiClientAction<typeof FetchSpecificObjectPartAction, SpecificObjectPartModel[]>): SpecificObjectPartState {
    if (action.type === FetchSpecificObjectPartAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { data: initialObjectPartState.data, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { data: initialObjectPartState.data, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function fetchStagingInfoReducers(state: StagingInfoState = initialStagingState, action: ApiClientAction<typeof FetchStagingInfoAction, StagingInfoModel[]>): StagingInfoState {
    if (action.type === FetchStagingInfoAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { data: initialStagingState.data, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { data: initialStagingState.data, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function handoverReducer(state: ApprovalState = initialApproval, action: ApiClientAction<typeof HandoverAction, boolean>): ApprovalState {
    if (action.type === HandoverAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { response: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { response: initialApproval.response, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { response: initialApproval.response, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function rejectBacklogReducer(state: ApprovalState = initialApproval, action: ApiClientAction<typeof RejectBacklogAction, boolean>): ApprovalState {
        if (action.type === RejectBacklogAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { response: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { response: initialApproval.response, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { response: initialApproval.response, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function searchSparePartReducer(state: PartRequirementModel[] = [], action: ApiClientAction<typeof SearchSparePartAction, PartRequirementModel[]>): PartRequirementModel[] {
    if (action.type === SearchSparePartAction && action.status === ApiRequestActionsStatus.SUCCEEDED) return action.payload
    return state
}

export function submitBacklogReducer(state: ApprovalState = initialApproval, action: ApiClientAction<typeof SubmitBacklogAction, boolean>): ApprovalState {
    if (action.type === SubmitBacklogAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { response: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { response: initialApproval.response, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { response: initialApproval.response, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function submitEquipmentReducer(state: ApprovalState = initialApproval, action: ApiClientAction<typeof SubmitEquipmentAction, boolean>): ApprovalState {
    if (action.type === SubmitEquipmentAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { response: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { response: initialApproval.response, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { response: initialApproval.response, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function submitPIReducer(state: ApprovalState = initialApproval, action: ApiClientAction<typeof SubmitPIAction, boolean>): ApprovalState {
    if (action.type === SubmitPIAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { response: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { response: initialApproval.response, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { response: initialApproval.response, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function unhandoverReducer(state: ApprovalState = initialApproval, action: ApiClientAction<typeof UnhandoverAction, boolean>): ApprovalState {
    if (action.type === UnhandoverAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { response: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { response: initialApproval.response, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { response: initialApproval.response, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function validateSparepartReducer(state: ValidationState = initialValidationState, action: ApiClientAction<typeof ValidateSparePartAction, SparepartValidationModel[]>): ValidationState {
    if (action.type === ValidateSparePartAction) {
        switch (action.status) {
            case ApiRequestActionsStatus.SUCCEEDED: return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
            case ApiRequestActionsStatus.LOADING: return { data: initialValidationState.data, status: ApiRequestActionsStatus.LOADING }
            case ApiRequestActionsStatus.FAILED: return { data: initialValidationState.data, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
    }
    return state
}

export function updateBacklogDetailReducer(state: BacklogEntrySheet = {}, action: BacklogDetailAction): BacklogEntrySheet {
    if (action.type === UpdateBacklogDetailAction) { return action.payload }
    return state
}

export function updateEquipmentReducer(state: EquipmentModel = initialEquipment, action: EquipmentValueAction): EquipmentModel {
    if (action.type === UpdateEquipmentValueAction) { return action.payload }
    return state
}
export function updatePIFormReducer(state: ZoneCheckSheetModel[] = [], action: PIFormAnswerAction): ZoneCheckSheetModel[] {
    if (action.type === UpdatePIFormStateAction) { return action.payload }
    return state
}

const PIDetailReducers = combineReducers({
    assignmentSummary: fetchAssignmentSummaryReducer,
    besApprovalStatus: approveBESReducer,
    besMaster: fetchBESMasterReducer,
    bmsClosedStatus: closeBMSReducer,
    backlogDetail: fetchBacklogDetailReducer,
    backlogDetailUpdate: updateBacklogDetailReducer,
    backlogList: fetchBacklogListReducer,
    backlogParameter: backlogListParameterReducer,
    backlogRejected: rejectBacklogReducer,
    backlogSubmission: submitBacklogReducer,
    backlogSummary: fetchBacklogSummaryReducer,
    equipmentData: fetchEquipmentReducer,
    equipmentNewData: updateEquipmentReducer,
    equipmentSubmission: submitEquipmentReducer,
    handoverStatus: handoverReducer,
    jobIdentity: fetchIdentityReducer,
    piAnswers: fetchPIAnswerReducer,
    piApprovalStatus: approvePIReducer,
    piFormData: updatePIFormReducer,
    piQuestions: fetchPIQuestion,
    piSubmissions: submitPIReducer,
    spareParts: searchSparePartReducer,
    sparePartsValidation: validateSparepartReducer,
    specificObjectParts: fetchSpecificObjectPartReducer,
    stagingInfo: fetchStagingInfoReducers,
    unhandoverStatus: unhandoverReducer,
})

export { PIDetailReducers };

