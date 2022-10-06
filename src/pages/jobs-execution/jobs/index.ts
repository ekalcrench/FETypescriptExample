import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { AppState } from '../../../app';
import { AssignJobsAction, assignJobsAction, ClearSelectedJobs, FetchJobsAction, fetchJobsAssignment, getMechanicsAction, jobsParameterAction, UpdateJobsParameterAction, searchAction, SearchJobsAction, selectFilterAction, SelectJobAction, selectJobsAction, selectLeaderAction, selectMechanicAction, sortByAction, unassignJobsAction, UnselectJobAction, storeJobDataAction } from './JobsPage.actions';
import { JobsAssignmentParameter, JobsDataModel, MechanicListModel, NewAssignmentModel } from './JobsPage.model';
import { JobsReducers } from './JobsPage.reducers';
import { storeDataAction } from '../../../core/storage-helper';
import { JOB_DATA, StorageKey } from '../../../common/constants';
import JobsPage from './JobsPage';

const mapStateToProps = (state: AppState) => {
  return {
    assignJobsResponse: state.jobsPageState.assignJobsStatus.response,
    displayMode: state.displayMode,
    jobsData: state.jobsPageState.JobsAssignmentSummary.data,
    mechanicList: state.jobsPageState.mechanicList.data,
    parameter: state.jobsPageState.jobsParameter,
    searchValue: state.jobsPageState.searchValue,
    requestAssignJobs: state.jobsPageState.assignJobsStatus.status,
    requestJobs: state.jobsPageState.JobsAssignmentSummary.status,
    requestMechanics: state.jobsPageState.mechanicList.status,
    requestUnassignJobs: state.jobsPageState.unassignJobsStatus.status,
    selectedFilters: state.jobsPageState.selectedFilters,
    selectedJobs: state.jobsPageState.selectedJobs,
    selectedLeader: state.jobsPageState.selectedLeader,
    selectedMechanics: state.jobsPageState.selectedMechanics,
    sortBy: state.jobsPageState.sortBy,
    token: state.userData.tokenResponse.accessToken,
    unassignJobsResponse: state.jobsPageState.unassignJobsStatus.response,
  }
};

const mapDispatchToProps = (dispatch: any) => ({
  assignJobs: (payload: NewAssignmentModel, token?: string) => dispatch(assignJobsAction(AssignJobsAction, payload, token)),
  clearSelectedJobs: (payload: JobsDataModel) => dispatch(selectJobsAction(ClearSelectedJobs, payload)),
  fetchJobs: (payload: JobsAssignmentParameter, token?: string) => dispatch(fetchJobsAssignment(FetchJobsAction, payload, token)),
  getMechanics: (token?: string) => dispatch(getMechanicsAction(token)),
  onClickSortBy: (type: string) => dispatch(sortByAction(type)),
  onSearch: (keyword: string) => dispatch(searchAction(SearchJobsAction, keyword)),
  pushTo: (url: string) => dispatch(push(url)),  
  saveJobData: (data: JobsDataModel) => dispatch(storeDataAction(JOB_DATA, StorageKey.JOB_DATA, data)),
  selectFilter: (type: string, payload: string) => dispatch(selectFilterAction(type, payload)),
  selectLeader: (type: string, payload?: MechanicListModel) => dispatch(selectLeaderAction(type, payload)),
  selectMechanic: (type: string, payload?: MechanicListModel) => dispatch(selectMechanicAction(type, payload)),
  selectJob: (payload: JobsDataModel) => dispatch(selectJobsAction(SelectJobAction, payload)),
  storeJobData: (payload: JobsDataModel) => dispatch(storeJobDataAction(payload)),
  unassignJobs: (payload: string[], token?: string) => dispatch(unassignJobsAction(payload, token)),
  unselectJob: (payload: JobsDataModel) => dispatch(selectJobsAction(UnselectJobAction, payload)),
  updateParameter: (payload: JobsAssignmentParameter) => dispatch(jobsParameterAction(UpdateJobsParameterAction, payload)),
});

const jobsPage = connect(mapStateToProps, mapDispatchToProps)(JobsPage);

type JobsPageStateProps = ReturnType<typeof mapStateToProps>;
type JobsPageDispatchProps = ReturnType<typeof mapDispatchToProps>;
export type JobsPageProps = JobsPageStateProps & JobsPageDispatchProps;
export { jobsPage as JobsPage, JobsReducers };
