import { combineReducers } from 'redux';
import { ApiClientAction, ApiRequestActionsStatus } from '../../../core/rest-client-helpers';
import { AssignJobsAction, ClearSelectedJobs, FetchJobsAction, GetMechanicsAction, UpdateJobsParameterAction, JobsParametersAction, ResetSelectedMechanicsAction, SearchAction, SearchJobsAction, SelectCustomerFilterAction, SelectedJobsAction, SelectedMechanicAction, SelectJobAction, SelectJobsAssignmentFilterAction, SelectJobsFilterAction, SelectJobsTypeFilterAction, SelectLeaderAction, SelectMechanicAction, SelectUnitModelFilterAction, SortByAction, SortJobsByBacklogOpen, SortJobsByCustomer, SortJobsByJobType, SortJobsByPlantExecution, SortJobsByStaging, SortJobsByStatus, SortJobsByUnitCode, SortJobsByUnitModel, SortJobsByWorkOrder, UnassignJobsAction, UnselectJobAction, UnselectMechanicAction, JobsAssigmnentState, AssignmentState, MechanicListState, StoreSelectedJobDataAction, ResetSelectedLeaderAction } from './JobsPage.actions';
import { JobsAssigmentModel, JobsAssignmentParameter, JobsDataModel, JobsSelectedFilters, JobsSortByModel, JobsSortByState, MechanicListModel } from './JobsPage.model';

const initialJobsAssignment: JobsAssigmentModel = {
  jobTypeFilter: ['All Job'],
  unitModelFilter: ['All Model'],
  customerFilter: ['All Customer'],
  tableValues: [],
  numberOfPage: 1,
  currentPage: 1,
  nextPage: false,
  prevPage: false,
  pageSize: 10,
  periodicInspectionHandover: 0,
  periodicInspectionTotal: 0,
  periodicInspectionUnassign: 0,
  periodicServiceHandover: 0,
  periodicServiceTotal: 0,
  unscheduleBreakdownHandover: 0,
  unscheduleBreakdownTotal: 0,
  unscheduleBreakdownUnassign: 0
};

const initialParameter: JobsAssignmentParameter = {
  searchValue: "",
  jobtypeFilter: "",
  unitModelFilter: "",
  customerFilter: "",
  assigmentFilter: true,
  inProgressFilter: false,
  approvalFilter: false,
  sortByUnitModel: false,
  sortByUnitCode: false,
  sortByJobType: true,
  sortByWorkOrder: false,
  sortByWorkCenter: false,
  sortByCustomer: false,
  sortByPlantExecution: false,
  sortByStatus: false,
  sortByOpenBacklog: false,
  sortByStaging: false,
  orderDesc: false,
  currentPage: 1,
  pageSize: 10
}

const initialSelectedFilter: JobsSelectedFilters = {
  jobType: 'All Job',
  unitModel: 'All Model',
  customer: 'All Customer',
}

const defaultState: JobsSortByModel = { isActive: false, isAscending: true };
const jobsSortbyInitialState: JobsSortByState = {
  unitModel: defaultState,
  unitCode: defaultState,
  jobType: defaultState,
  workOrder: defaultState,
  customer: defaultState,
  plantExecution: defaultState,
  status: defaultState,
  backlogOpen: defaultState,
  staging: defaultState
}

const initialAssignmentState: AssignmentState = { response: false, status: ApiRequestActionsStatus.IDLE }
const initialJobsState: JobsAssigmnentState = { data: initialJobsAssignment, status: ApiRequestActionsStatus.IDLE }
const initialMechanicsState: MechanicListState = { data: [], status: ApiRequestActionsStatus.IDLE }

export function assignJobsReducer(state: AssignmentState = initialAssignmentState, action: ApiClientAction<typeof AssignJobsAction, boolean>): AssignmentState {
  if (action.type === AssignJobsAction) {
    switch(action.status) {
      case ApiRequestActionsStatus.SUCCEEDED: return { response: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
      case ApiRequestActionsStatus.LOADING: return { response: initialAssignmentState.response, status: ApiRequestActionsStatus.LOADING }
      case ApiRequestActionsStatus.FAILED: return { response: initialAssignmentState.response, status: ApiRequestActionsStatus.FAILED, error: action.error }
    }
  }
  return state
}

export function fetchJobsReducer(state: JobsAssigmnentState = initialJobsState, action: ApiClientAction<typeof FetchJobsAction, JobsAssigmentModel>): JobsAssigmnentState {
  if (action.type === FetchJobsAction) {
    switch(action.status) {
      case ApiRequestActionsStatus.SUCCEEDED: return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
      case ApiRequestActionsStatus.LOADING: return { data: initialJobsState.data, status: ApiRequestActionsStatus.LOADING }
      case ApiRequestActionsStatus.FAILED: return { data: initialJobsState.data, status: ApiRequestActionsStatus.FAILED, error: action.error }
    }
  }
  return state
}

export function getMechanicsReducer(state: MechanicListState = initialMechanicsState, action: ApiClientAction<typeof GetMechanicsAction, MechanicListModel[]>): MechanicListState {
  if (action.type === GetMechanicsAction) {
    switch(action.status) {
      case ApiRequestActionsStatus.SUCCEEDED: return { data: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
      case ApiRequestActionsStatus.LOADING: return { data: initialMechanicsState.data, status: ApiRequestActionsStatus.LOADING }
      case ApiRequestActionsStatus.FAILED: return { data: initialMechanicsState.data, status: ApiRequestActionsStatus.FAILED, error: action.error }
    }
  }
  return state
}

export function jobsParameterReducer(state: JobsAssignmentParameter = initialParameter, action: JobsParametersAction): JobsAssignmentParameter {
  if (action.type === UpdateJobsParameterAction) return action.payload
  return state
}

export function searchJobsReducer(state: string = '', action: SearchAction): string {
  if (action.type === SearchJobsAction) return action.payload
  return state
}

export function selectedFiltersReducer(state: JobsSelectedFilters = initialSelectedFilter, action: SelectJobsFilterAction): JobsSelectedFilters {
  switch (action.type) {
    case SelectJobsTypeFilterAction:
      return { ...state, jobType: action.payload };
    case SelectUnitModelFilterAction:
      return { ...state, unitModel: action.payload };
    case SelectCustomerFilterAction:
      return { ...state, customer: action.payload };
    case SelectJobsAssignmentFilterAction:
      return { ...state, jobsAssignment: action.payload };
  }
  return state;
}

export function selectJobsReducer(state: JobsDataModel[] = [], action: SelectedJobsAction): JobsDataModel[] {
  switch (action.type) {
    case SelectJobAction:
      return [...state, action.payload]
    case UnselectJobAction: {
      return [...state.filter((function (item: JobsDataModel) { return item.woNumber !== action.payload.woNumber }))]
    }
    case ClearSelectedJobs:
      return []
  }
  return state
}

export function selectLeaderReducer(state: MechanicListModel = {}, action: SelectedMechanicAction): MechanicListModel {
  switch (action.type) {
    case SelectLeaderAction:
      if (action.payload) return action.payload
      else return {...state}
    case ResetSelectedLeaderAction:
      return {}
  }
  return state
}

export function selectMechanicsReducer(state: MechanicListModel[] = [], action: SelectedMechanicAction): MechanicListModel[] {
  switch (action.type) {
    case SelectMechanicAction:
      if (action.payload) return [...state, action.payload]
      else { return [...state] }
    case UnselectMechanicAction:
      return [...state.filter((function (item: MechanicListModel) { return item !== action.payload }))]
    case ResetSelectedMechanicsAction:
      return []
  }
  return state
}

export function sortJobsByReducer(state: JobsSortByState = jobsSortbyInitialState, action: SortByAction): JobsSortByState {
  switch (action.type) {
    case SortJobsByUnitModel:
      return { ...jobsSortbyInitialState, unitModel: { isActive: true, isAscending: !state.unitModel.isAscending } }
    case SortJobsByUnitCode:
      return { ...jobsSortbyInitialState, unitCode: { isActive: true, isAscending: !state.unitCode.isAscending } }
    case SortJobsByJobType:
      return { ...jobsSortbyInitialState, jobType: { isActive: true, isAscending: !state.jobType.isAscending } }
    case SortJobsByWorkOrder:
      return { ...jobsSortbyInitialState, workOrder: { isActive: true, isAscending: !state.workOrder.isAscending } }
    case SortJobsByCustomer:
      return { ...jobsSortbyInitialState, customer: { isActive: true, isAscending: !state.customer.isAscending } }
    case SortJobsByPlantExecution:
      return { ...jobsSortbyInitialState, plantExecution: { isActive: true, isAscending: !state.plantExecution.isAscending } }
    case SortJobsByBacklogOpen:
      return { ...jobsSortbyInitialState, backlogOpen: { isActive: true, isAscending: !state.backlogOpen.isAscending } }
    case SortJobsByStatus:
      return { ...jobsSortbyInitialState, status: { isActive: true, isAscending: !state.status.isAscending } }
    case SortJobsByStaging:
      return { ...jobsSortbyInitialState, staging: { isActive: true, isAscending: !state.staging.isAscending } }
  }
  return state;
}

export function storeJobDataReducer(state: JobsDataModel = {}, action: SelectedJobsAction): JobsDataModel {
  if (action.type === StoreSelectedJobDataAction) return action.payload
  return {...state}
}

export function unassignJobsReducer(state: AssignmentState = initialAssignmentState, action: ApiClientAction<typeof UnassignJobsAction, boolean>): AssignmentState {
  if (action.type === UnassignJobsAction) {
    switch(action.status) {
      case ApiRequestActionsStatus.SUCCEEDED: return { response: action.payload, status: ApiRequestActionsStatus.SUCCEEDED }
      case ApiRequestActionsStatus.LOADING: return { response: state.response, status: ApiRequestActionsStatus.LOADING }
      case ApiRequestActionsStatus.FAILED: return { response: state.response, status: ApiRequestActionsStatus.FAILED, error: action.error }
    }
  }
  return state
}

const JobsReducers = combineReducers({
  selectedLeader: selectLeaderReducer,
  mechanicList: getMechanicsReducer,
  selectedJobs: selectJobsReducer,
  selectedMechanics: selectMechanicsReducer,
  assignJobsStatus: assignJobsReducer,
  unassignJobsStatus: unassignJobsReducer,
  jobsParameter: jobsParameterReducer,
  JobsAssignmentSummary: fetchJobsReducer,
  selectedFilters: selectedFiltersReducer,
  sortBy: sortJobsByReducer,
  searchValue: searchJobsReducer,
  selectedJobData: storeJobDataReducer,
});

export { JobsReducers };

