import { RequestMethod, ApiUrlBase } from "../../../common/constants";
import { JobsReportModel } from "./JobsReport.model";
import { AxiosRequestConfig } from "axios";
import { callApi, ApiRequestActionsStatus } from "../../../core/rest-client-helpers";
import { JobsAssigmentModel } from "../jobs/JobsPage.model";

export const DownloadReportingAction = "REPORTING_DOWNLOAD"
export const DownloadBacklogAction = "BACKLOG_DOWNLOAD"
export const FetchReportListAction = "FETCH_REPORT_LIST"
export const UpdateReportParameterAction = "UPDATE_REPORT_PARAMETER"

export interface DownloadReportState { data: any, status: ApiRequestActionsStatus, error?: any }
export interface JobReportParameter { type: string, payload: JobsReportModel }
export interface JobsReportState { data: JobsAssigmentModel, status: ApiRequestActionsStatus, error?: any }

export function updateReportParameterAction(type: string, payload: JobsReportModel) {
    return { type, payload }
}

export function downloadReportingAction(woId: string, timeZone: string, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        responseType: 'blob',
        method: RequestMethod.POST,
        url: ApiUrlBase.PI_API_URL + 'DownloadReport',
        data: { woid: woId, timeZone: timeZone },
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`}
    };
    return async (dispatch: any) => dispatch(callApi(DownloadReportingAction, requestConfig))
}

export function downloadBacklogAction(woId: string, timeZone: string, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        responseType: 'blob',
        method: RequestMethod.POST,
        url: ApiUrlBase.BES_API_URL + 'DownloadReport',
        data: { woid: woId, timeZone: timeZone },
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`}
    };
    return async (dispatch: any) => dispatch(callApi(DownloadBacklogAction, requestConfig))
}


export function fetchReportListAction(type: string, payload: JobsReportModel, accessToken?: string) {
    let requestConfig: AxiosRequestConfig = {
        method: RequestMethod.POST,
        url: ApiUrlBase.WORK_ORDER_API_URL + 'ListOfJobReport',
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.REACT_APP_X_IBM_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`}
    };
    return async (dispatch: any) => dispatch(callApi(type, requestConfig))
}