import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { selectFilterAction } from '../jobs/JobsPage.actions';
import { AppState } from './../../../app/App.reducers';
import { searchAction, SearchJobsAction, sortByAction } from './../jobs/JobsPage.actions';
import { fetchReportListAction, FetchReportListAction, updateReportParameterAction, UpdateReportParameterAction, downloadReportingAction, downloadBacklogAction } from './JobsReport.action';
import { JobsReportModel } from './JobsReport.model';
import JobsReport from './JobsReport';
import { BacklogListParameter } from '../../pi-detail/PiDetailPage.model';
import { fetchBacklogListAction } from '../../pi-detail/PiDetailPage.actions';

const mapStateToProps = (state: AppState) => {
  return {
    backlogDownloaded: state.reportState.backlogDownloaded,
    displayMode: state.displayMode,
    reportDownloaded: state.reportState.reportDownloaded,
    reportList: state.reportState.reportList.data,
    reportListStatus: state.reportState.reportList.status,
    reportParameter: state.reportState.reportParameter,
    selectedFilters: state.jobsPageState.selectedFilters,
    sortBy: state.jobsPageState.sortBy,
    searchValue: state.jobsPageState.searchValue,
    token: state.userData.tokenResponse.accessToken,
    backogList: state.userData.tokenResponse.accessToken,
  }
};

const mapDispatchToProps = (dispatch: any) => ({
  downloadReporting: (woId: string, timezone: string, token?: string) => dispatch(downloadReportingAction(woId, timezone, token)),
  downloadBackog: (woId: string, timezone: string, token?: string) => dispatch(downloadBacklogAction(woId, timezone, token)),
  fetchBacklogs: (payload: BacklogListParameter, token?: string) => dispatch(fetchBacklogListAction(payload, token)),
  fetchReports: (payload: JobsReportModel, token?: string) => dispatch(fetchReportListAction(FetchReportListAction, payload, token)),
  onClickSortBy: (type: string) => dispatch(sortByAction(type)),
  onSearch: (keyword: string) => dispatch(searchAction(SearchJobsAction, keyword)),
  pushTo: (url: string) => dispatch(push(url)),
  updateReportsParameter: (payload: JobsReportModel) => dispatch(updateReportParameterAction(UpdateReportParameterAction, payload)),
  selectFilter: (type: string, payload: string) => dispatch(selectFilterAction(type, payload)),
});
const jobsReport = connect(mapStateToProps, mapDispatchToProps)(JobsReport);

type JobsReportPageStateProps = ReturnType<typeof mapStateToProps>;
type JobsReportPageDispatchProps = ReturnType<typeof mapDispatchToProps>;
export type JobsReportPageProps = JobsReportPageStateProps & JobsReportPageDispatchProps;
export { jobsReport as JobsReport };
