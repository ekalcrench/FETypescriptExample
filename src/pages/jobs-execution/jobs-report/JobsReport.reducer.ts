import { combineReducers } from 'redux';
import { ApiClientAction, ApiRequestActionsStatus } from '../../../core/rest-client-helpers';
import { JobsReportModel } from './JobsReport.model';
import { JobReportParameter, UpdateReportParameterAction, FetchReportListAction, JobsReportState, DownloadReportState, DownloadReportingAction, DownloadBacklogAction } from './JobsReport.action';
import { JobsAssigmentModel } from '../jobs/JobsPage.model';

const initialReportParameter: JobsReportModel = {
    searchValue: '',
    jobtypeFilter: '',
    unitModelFilter: '',
    customerFilter: '',
    sortByJobType: true,
    sortByUnitModel: false,
    sortByUnitCode: false,
    sortByWorkOrder: false,
    sortByPlantExecution: false,
    orderDesc: true,
    currentPage: 1,
    pageSize: 15,
}

const initialReportState: JobsAssigmentModel = {
    nextPage: false,
    prevPage: false,
    currentPage: 0,
    pageSize: 15,
    numberOfPage: 1,
    tableValues: [],
}

const initialDownloadState: DownloadReportState = { data: new Blob(), status: ApiRequestActionsStatus.IDLE }
const initialJobsState: JobsReportState = { data: initialReportState, status: ApiRequestActionsStatus.IDLE }

export function reportParameterReducer(state: JobsReportModel = initialReportParameter, action: JobReportParameter): JobsReportModel {
    if(action.type === UpdateReportParameterAction) return action.payload
    return state
}

export function downloadReportReducer(state: DownloadReportState = initialDownloadState, action: ApiClientAction<typeof DownloadReportingAction, Blob>): DownloadReportState {
    if (action.type === DownloadReportingAction) {
        switch(action.status) {
          case ApiRequestActionsStatus.SUCCEEDED: return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
          case ApiRequestActionsStatus.LOADING: return { data: initialDownloadState.data, status: ApiRequestActionsStatus.LOADING }
          case ApiRequestActionsStatus.FAILED: return { data: initialDownloadState.data, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
      }
    return state
}

export function downloadBacklogReducer(state: DownloadReportState = initialDownloadState, action: ApiClientAction<typeof DownloadBacklogAction, Blob>): DownloadReportState {
  if (action.type === DownloadBacklogAction) {
      switch(action.status) {
        case ApiRequestActionsStatus.SUCCEEDED: return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
        case ApiRequestActionsStatus.LOADING: return { data: initialDownloadState.data, status: ApiRequestActionsStatus.LOADING }
        case ApiRequestActionsStatus.FAILED: return { data: initialDownloadState.data, status: ApiRequestActionsStatus.FAILED, error: action.error }
      }
    }
  return state
}


export function fetchReportListReducer(state: JobsReportState = initialJobsState, action: ApiClientAction<typeof FetchReportListAction, JobsAssigmentModel>): JobsReportState {
    if (action.type === FetchReportListAction) {
        switch(action.status) {
          case ApiRequestActionsStatus.SUCCEEDED: return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
          case ApiRequestActionsStatus.LOADING: return { data: initialJobsState.data, status: ApiRequestActionsStatus.LOADING }
          case ApiRequestActionsStatus.FAILED: return { data: initialJobsState.data, status: ApiRequestActionsStatus.FAILED, error: action.error }
        }
      }
    return state
}

const ReportReducers = combineReducers({
    backlogDownloaded: downloadBacklogReducer,
    reportDownloaded: downloadReportReducer,
    reportList: fetchReportListReducer,
    reportParameter: reportParameterReducer,
})

export { ReportReducers }