import { AxiosRequestConfig } from 'axios';
import { ApiUrlBase, RequestMethod } from '../../common/constants';
import { callApi, ApiRequestActionsStatus } from '../../core/rest-client-helpers';
import { BacklogListParameter, BacklogSummaryModel, StagingInfoModel } from './PiDetailPage.model';
import { ZoneCheckSheetModel, PIDetailModel, PIQuestionModel, CheckSheetValueModel, PISubmissionModel } from './components/pi-form/PIForm.model';
import { ObjectPartModel, BacklogEntrySheet, BacklogMaster, SpecificObjectPartModel, SparepartValidationModel } from './components/backlog-entry-sheet-detail/BacklogEntrySheetDetail.model';
import { AssignmentSummaryModel } from './components/job-assignment/JobAssignment.model';
import { BacklogListModel } from './components/job-list/JobList.model';
import { JobsDataModel } from '../jobs-execution/jobs/JobsPage.model';
import { EquipmentModel } from './components/job-time-card/JobTimeCard.model';

export const ApprovePIAction = "APPOVE_PI"
export const ApproveBESAction = 'APPROVE_BACKLOG'
export const CloseBMSAction = "CLOSE_BMS"
export const FetchAssignmentSummaryAction = "ASSIGNMENT_SUMMARY"
export const FetchBacklogListAction = "FETCH_BACKLOG_LIST"
export const FetchBacklogDetailAction = "FETCH_BACKLOG_DETAIL"
export const FetchBacklogSummaryAction = "FETCH_BACKLOG_SUMMARY"
export const FetchBESMasterAction = "FETCH_BES_CHECK_SHEET"
export const FetchEquipmentValueAction = "FETCH_EQUIPMENT_VALUE"
export const FetchIdentityAction = "FETCH_IDENTITY"
export const FetchPIAnswerAction = "FETCH_PIFORM_ANSWER"
export const FetchPIQuestionAction = "FETCH_PI_QUESTION"
export const FetchSpecificObjectPartAction  = "FETCH_SPECIFIC_OBJECT_PARTS"
export const FetchStagingInfoAction = "STAGING_INFO"
export const HandoverAction = "HANDOVER"
export const RejectBacklogAction = "REJECT_BACKLOG"
export const SearchSparePartAction = "SEARCH_SPARE_PART"
export const SubmitBacklogAction = "SUBMIT_BACKLOG"
export const SubmitEquipmentAction = "SUBMIT_EQUIPMENT"
export const SubmitPIAction = "SUBMIT_PI"
export const UnhandoverAction = "UNHANDOVER"
export const UpdateBacklogDetailAction = "UPDATE_BACKLOG_DETAIL"
export const UpdateBacklogParameterAction = "UPDATE_BACKLOG_STATE"
export const UpdateEquipmentValueAction = "UPDATE_EQUIPMENT_VALUE"
export const UpdatePICheckSheetAction = "UPDATE_PI_CHECK_SHEET"
export const UpdatePIFormStateAction = "UPDATE_PIFORM_STATE"
export const ValidateSparePartAction = "VALIDATE_SPAREPART"

export interface ApprovalState { response: boolean, status: ApiRequestActionsStatus, error?: any }
export interface AssignmentHistoryState { data: AssignmentSummaryModel, status: ApiRequestActionsStatus, error?: any }
export interface BacklogDetailState { data: BacklogEntrySheet, status: ApiRequestActionsStatus, error?: any }
export interface BacklogListState { data: BacklogListModel, status: ApiRequestActionsStatus, error?: any }
export interface BacklogSummaryState { data: BacklogSummaryModel, status: ApiRequestActionsStatus, error?: any }
export interface BacklogMasterState { data: BacklogMaster, status: ApiRequestActionsStatus, error?: any }
export interface EquipmentState { data: EquipmentModel, status: ApiRequestActionsStatus, error?: any }
export interface IdentityState { data: JobsDataModel, status: ApiRequestActionsStatus, error?: any }
export interface PIAnswerState { data: PIDetailModel, status: ApiRequestActionsStatus, error?: any }
export interface PIQuestionState { data: PIQuestionModel, status: ApiRequestActionsStatus, error?: any }
export interface SpecificObjectPartState { data: SpecificObjectPartModel[], status: ApiRequestActionsStatus, error? : any }
export interface StagingInfoState { data: StagingInfoModel[], status: ApiRequestActionsStatus, error?: any }
export interface ValidationState { data: SparepartValidationModel[], status: ApiRequestActionsStatus, error?: any }

export interface BacklogDetailAction { type: string, payload: BacklogEntrySheet }
export interface BacklogsParameterAction { type: string, payload: BacklogListParameter }
export interface PIFormAnswerAction { type: string, payload: ZoneCheckSheetModel[] }
export interface PICheckSheetValueAction { type: string, payload: CheckSheetValueModel }
export interface EquipmentValueAction { type: string, payload: EquipmentModel }

export function approveBESAction(backlogId: string, accessToken?: string) {
    let requestConfig: AxiosRequestConfig =  {
        method: RequestMethod.POST,
        data: { value: backlogId },
        url: ApiUrlBase.BES_API_URL + 'BES/approve',
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    }
    return async (dispatch: any) => dispatch(callApi(ApproveBESAction, requestConfig))
}

export function approvePIAction(woId: string, accessToken?: string) {
    let requestConfig: AxiosRequestConfig =  {
        method: RequestMethod.POST,
        data: { value: woId },
        url: ApiUrlBase.PI_API_URL + 'Form/approve',
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    }
    return async (dispatch: any) => dispatch(callApi(ApprovePIAction, requestConfig))
}

export function closeBMSAction(backlogId: string, accessToken?: string) {
    let requestConfig: AxiosRequestConfig =  {
        method: RequestMethod.POST,
        data: { value: backlogId },
        url: ApiUrlBase.BES_API_URL + 'BMS/approve',
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    }
    return async (dispatch: any) => dispatch(callApi(CloseBMSAction, requestConfig))
}

export function fetchAssignmentSummaryAction(woId: string, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        url: ApiUrlBase.ASSIGNMENT_API_URL + `Summary`,
        data: { value: woId },
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(FetchAssignmentSummaryAction, requestConfig))
}

export function fetchBacklogDetailAction(backlogId: string, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        data: { value: backlogId },
        url: ApiUrlBase.BES_API_URL + 'BES/Detail',
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(FetchBacklogDetailAction, requestConfig))
}

export function fetchBacklogListAction(payload: BacklogListParameter, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        data: payload,
        url: ApiUrlBase.BES_API_URL + 'BES/list',
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(FetchBacklogListAction, requestConfig))
}

export function fetchBacklogSummaryAction(equipmentNumber: string, woId: string, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        data: { equipmentNumber: equipmentNumber, workorderid: woId },
        url: ApiUrlBase.BES_API_URL + 'BES/summary',
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(FetchBacklogSummaryAction, requestConfig)) 
}

export function fetchBESMasterAction(accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.GET,
        url: ApiUrlBase.BES_API_URL + 'BES/GetChoices',
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(FetchBESMasterAction, requestConfig))
}

export function fetchBESSpecificObjectPartAction(payload: ObjectPartModel, accessToken?: string) {
    let requestConfig: AxiosRequestConfig =  {
        method: RequestMethod.POST,
        data: payload,
        url: ApiUrlBase.BES_API_URL + 'BES/GetSpecificObjectChoices',
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    }
    return async (dispatch: any) => dispatch(callApi(FetchSpecificObjectPartAction, requestConfig))
}

export function fetchEquipmentAction(woId: string, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        url: ApiUrlBase.WORK_ORDER_API_URL + `equipmentValue/get`,
        data: { workorderguid: woId },
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(FetchEquipmentValueAction, requestConfig))
}

export function fetchIdentityAction(woId: string, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        url: ApiUrlBase.WORK_ORDER_API_URL + `JobDetail`,
        data: { value: woId },
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(FetchIdentityAction, requestConfig))
}

export function fetchPIQuestionAction(model: string, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.GET,
        url: ApiUrlBase.PI_API_URL + `Form/model/${model}`,
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(FetchPIQuestionAction, requestConfig))
}

export function fetchPIAnswerAction(woId: string, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        url: ApiUrlBase.PI_API_URL + 'Form/GetCheckSheetValue',
        data: { value: woId },
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(FetchPIAnswerAction, requestConfig))
}

export function fetchStagingInfoAction(woId: string, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        url: ApiUrlBase.TRACKING_API_URL + `Staginginfo`,
        data: { value: woId },
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(FetchStagingInfoAction, requestConfig))
}

export function handoverAction(woId: string, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        url: ApiUrlBase.WORK_ORDER_API_URL + 'HandOverTrigger',
        data: { woid: woId, devices: 2 },
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(HandoverAction, requestConfig))
}


export function rejectBacklogAction(backlogId: string, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        url: ApiUrlBase.BES_API_URL + `BES/Reject`,
        data: { value: backlogId },
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(RejectBacklogAction, requestConfig))
}

export function searchSparePartAction(keyword: string, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.GET,
        url: ApiUrlBase.BES_API_URL + `BES/SparePart/${keyword}`,
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(SearchSparePartAction, requestConfig))
}

export function submitBacklogAction(payload: BacklogEntrySheet, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        url: ApiUrlBase.BES_API_URL + `BES/Submit`,
        data: [payload],
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(SubmitBacklogAction, requestConfig))
}

export function submitEquipmentAction(payload: EquipmentModel, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        url: ApiUrlBase.WORK_ORDER_API_URL + `equipmentValue/submit`,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(SubmitEquipmentAction, requestConfig))
}

export function submitPIAction(payload: PISubmissionModel, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        url: ApiUrlBase.PI_API_URL + `Form/SubmitCheckSheetValue`,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(SubmitPIAction, requestConfig))
}

export function unhandoverAction(woId: string, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        url: ApiUrlBase.WORK_ORDER_API_URL + 'UnHandover',
        data: { value: woId },
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(UnhandoverAction, requestConfig))
}

export function validateSparepartsAction(spareparts: string[], accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        url: ApiUrlBase.BES_API_URL + `BES/SparePartValidation`,
        data: { sparepartNumbers: spareparts },
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(ValidateSparePartAction, requestConfig))
}

export function backlogListParameterAction(type: string, payload: BacklogListParameter) {
    return { type, payload }
}

export function updateBacklogParameterAction(payload: BacklogListParameter): BacklogsParameterAction {
    return { type: UpdateBacklogParameterAction, payload }
}

export function updateBacklogDetailAction(payload: BacklogEntrySheet): BacklogDetailAction {
    return { type: UpdateBacklogDetailAction, payload }
}

export function updateEquipmentAction(payload: EquipmentModel): EquipmentValueAction {
    return { type: UpdateEquipmentValueAction, payload }
}

export function updatePICheckSheetValueAction(checkSheetValue: CheckSheetValueModel): PICheckSheetValueAction {
    return { type: UpdatePICheckSheetAction, payload: checkSheetValue }
}

export function updatePIFormStateAction(piFormState: ZoneCheckSheetModel[]): PIFormAnswerAction {
    return { type: UpdatePIFormStateAction, payload: piFormState }
}