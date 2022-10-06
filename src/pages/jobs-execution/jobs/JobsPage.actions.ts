import { AxiosRequestConfig } from 'axios';
import { RequestMethod } from '../../../common/constants';
import { callApi, ApiRequestActionsStatus } from '../../../core/rest-client-helpers';
import { ApiUrlBase } from './../../../common/constants/index';
import { JobsAssignmentParameter, JobsDataModel, MechanicListModel, NewAssignmentModel, JobsAssigmentModel } from './JobsPage.model';

export const AssignJobsAction = 'ASSIGN_JOBS'
export const ClearSelectedJobs = "CLEAR_SELECTED_JOBS"
export const FetchJobsAction = 'FETCH_JOBS';
export const GetMechanicsAction = "GET_MECHANICS"
export const ResetAssignment = "RESET_ASSIGNMENT"
export const ResetSelectedMechanicsAction = "RESET_SELECTED_MECHANICS"
export const ResetSelectedLeaderAction = "RESET_SELECTED_LEADER"
export const SearchJobsAction = "SEARCH_JOBS";
export const SelectCustomerFilterAction = 'SELECT_CUSTOMER_FILTER';
export const SelectJobAction = "SELECT_JOBS"
export const SelectJobsAssignmentFilterAction = 'SELECT_JOBS_ASSIGNMENT_FILTER';
export const SelectJobsTypeFilterAction = 'SELECT_JOBS_TYPE_FILTER';
export const SelectLeaderAction = "SELECT_LEADER"
export const SelectMechanicAction = "SELECT_MECHANIC"
export const SelectUnitModelFilterAction = 'SELECT_UNIT_MODEL_FILTER';
export const SortJobsByBacklogOpen = 'SORT_JOBS_BY_BACKLOG_OPEN';
export const SortJobsByCustomer = 'SORT_JOBS_BY_CUSTOMER';
export const SortJobsByJobType = 'SORT_JOBS_BY_JOB_TYPE';
export const SortJobsByUnitModel = 'SORT_JOBS_BY_UNIT_MODEL';
export const SortJobsByUnitCode = 'SORT_JOBS_BY_UNIT_CODE';
export const SortJobsByPlantExecution = 'SORT_JOBS_BY_PLANT_EXECUTION';
export const SortJobsByStaging = 'SORT_JOBS_BY_STAGING';
export const SortJobsByStatus = 'SORT_JOBS_BY_STATUS';
export const SortJobsByWorkOrder = 'SORT_JOBS_BY_WORK_ORDER';
export const StoreSelectedJobDataAction = "SELECTED_JOB_DATA"
export const UnassignJobsAction = 'UNASSIGN_JOBS'
export const UnselectJobAction = "UNSELECT_JOBS"
export const UnselectMechanicAction = "UNSELECT_MECHANIC"
export const UpdateJobsParameterAction = 'JOBS_PARAMETER'

export interface AssignmentState { response: boolean, status: ApiRequestActionsStatus, error?: any }
export interface JobsAssigmnentState { data: JobsAssigmentModel, status: ApiRequestActionsStatus, error?: any }
export interface MechanicListState { data: MechanicListModel[], status: ApiRequestActionsStatus, error?: any }

export interface JobAssignmentSummaryAction { type: string }
export interface JobsParametersAction { type: string, payload: JobsAssignmentParameter }
export interface SearchAction { type: string; payload: string; }
export interface SelectJobsFilterAction { type: string; payload: string; }
export interface SelectedJobsAction { type: string, payload: JobsDataModel }
export interface SelectedMechanicAction { type: string, payload?: MechanicListModel }
export interface SortByAction { type: string; }

export function assignJobsAction(type: string, payload: NewAssignmentModel, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        url: ApiUrlBase.ASSIGNMENT_API_URL + 'AssignJob',
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(type, requestConfig))
}

export function fetchJobsAssignment(type: string, payload: JobsAssignmentParameter, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        url: ApiUrlBase.WORK_ORDER_API_URL + 'ListOfJobAssignment',
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(type, requestConfig))
}

export function getMechanicsAction(accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.GET,
        url: ApiUrlBase.ASSIGNMENT_API_URL + 'DummyMechanic',
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(GetMechanicsAction, requestConfig))
}

export function unassignJobsAction(payload: string[], accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        url: ApiUrlBase.ASSIGNMENT_API_URL + 'UnassignJob',
        data: { workOrderId: payload },
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return async (dispatch: any) => dispatch(callApi(UnassignJobsAction, requestConfig))
}

export function jobsParameterAction(type: string, payload: JobsAssignmentParameter) {
    return { type, payload }
}

export function searchAction(type: string, payload: string): SearchAction {
    return { type, payload }
}

export function selectFilterAction(type: string, payload: string): SelectJobsFilterAction {
    return { type, payload }
}

export function selectJobsAction(type: string, payload: JobsDataModel): SelectedJobsAction {
    return { type, payload }
}

export function selectLeaderAction(type: string, payload?: MechanicListModel): SelectedMechanicAction {
    return { type, payload }
}

export function selectMechanicAction(type: string, payload?: MechanicListModel): SelectedMechanicAction {
    return { type, payload }
}

export function sortByAction(type: string): SortByAction {
    return { type };
}

export function storeJobDataAction(payload: JobsDataModel): SelectedJobsAction {
    return { type: StoreSelectedJobDataAction, payload }
}