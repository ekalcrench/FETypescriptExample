import PiDetailPage from './PiDetailPage';
import { push } from 'connected-react-router';
import { AppState } from '../../app/App.reducers';
import { connect } from 'react-redux';
import { fetchIdentityAction, fetchPIQuestionAction, updatePIFormStateAction, fetchAssignmentSummaryAction, fetchStagingInfoAction, fetchPIAnswerAction, fetchBacklogListAction, backlogListParameterAction, UpdateBacklogParameterAction, fetchBacklogDetailAction, fetchBacklogSummaryAction, closeBMSAction, approvePIAction, approveBESAction, fetchBESMasterAction, fetchBESSpecificObjectPartAction, updateBacklogDetailAction, updatePICheckSheetValueAction, updateEquipmentAction, fetchEquipmentAction, submitBacklogAction, submitPIAction, searchSparePartAction, submitEquipmentAction, rejectBacklogAction, validateSparepartsAction, handoverAction, unhandoverAction } from './PiDetailPage.actions';
import { BacklogListParameter } from './PiDetailPage.model';
import { ZoneCheckSheetModel, CheckSheetValueModel, PISubmissionModel } from './components/pi-form/PIForm.model';
import { ObjectPartModel, BacklogEntrySheet } from './components/backlog-entry-sheet-detail/BacklogEntrySheetDetail.model';
import { EquipmentModel } from './components/job-time-card/JobTimeCard.model';
import { setTimezoneAction } from '../../core/timezone-helpers/Timezone.actions';
import { getDataAction } from '../../core/storage-helper';
import { JOB_DATA, StorageKey } from '../../common/constants';

const mapStateToProps = (state: AppState) => {
  return {
    router: state.router,
    assignmentSummary: state.piPageState.assignmentSummary.data,
    assignmentHistoryStatus: state.piPageState.assignmentSummary.status,
    backlogDetail: state.piPageState.backlogDetail.data,
    backlogDetailStatus: state.piPageState.backlogDetail.status,
    backlogDetailUpdate: state.piPageState.backlogDetailUpdate,
    backlogList: state.piPageState.backlogList.data,
    backlogListStatus: state.piPageState.backlogList.status,
    backlogParameter: state.piPageState.backlogParameter,
    backlogRejected: state.piPageState.backlogRejected,
    backlogSummary: state.piPageState.backlogSummary.data,
    backlogSummaryStatus: state.piPageState.backlogSummary.status,
    backlogSubmission: state.piPageState.backlogSubmission,
    besApprovalResponse: state.piPageState.besApprovalStatus.response,
    besApprovalStatus: state.piPageState.besApprovalStatus.status,
    besMaster: state.piPageState.besMaster.data,
    besMasterStatus: state.piPageState.besMaster.status,
    bmsClosedResponse: state.piPageState.bmsClosedStatus.response,
    bmsClosedStatus: state.piPageState.bmsClosedStatus.status,
    displayMode: state.displayMode,
    equipment: state.piPageState.equipmentData,
    equipmentValue: state.piPageState.equipmentNewData, 
    equipmentSubmission: state.piPageState.equipmentSubmission,
    handoverStatus: state.piPageState.handoverStatus,
    identity: state.piPageState.jobIdentity.data,
    selectedJobData: state.jobsPageState.selectedJobData,
    jobIdentityStatus: state.piPageState.jobIdentity.status,
    piAnswers: state.piPageState.piAnswers.data,
    piAnswersStatus: state.piPageState.piAnswers.status,
    piApprovalResponse: state.piPageState.piApprovalStatus.response,
    piApprovalStatus: state.piPageState.piApprovalStatus.status,
    piFormData: state.piPageState.piFormData,
    piQuestions: state.piPageState.piQuestions.data,
    piQuestionsStatus: state.piPageState.piQuestions.status,
    piSubmissions: state.piPageState.piSubmissions,
    storedJobData: state.selectedJobData,
    spareParts: state.piPageState.spareParts,
    sparePartsValidation: state.piPageState.sparePartsValidation,
    specificObjectParts: state.piPageState.specificObjectParts.data,
    specificObjectPartsStatus: state.piPageState.specificObjectParts.status,
    stagingInfo: state.piPageState.stagingInfo.data,
    stagingInfoStatus: state.piPageState.stagingInfo.status,
    timezoneInfo: state.timezone,
    token: state.userData.tokenResponse.accessToken,
    unhandoverStatus: state.piPageState.unhandoverStatus,
  }
};

const mapDispatchToProps = (dispatch: any) => ({
  closeBMS: (backlogId: string, token?: string) => dispatch(closeBMSAction(backlogId, token)),
  approvePI: (woId: string, token?: string) => dispatch(approvePIAction(woId, token)),
  approveBES: (backlogId: string, token?: string) => dispatch(approveBESAction(backlogId, token)),
  fetchAssigmentSummary: (wo: string, token?: string) => dispatch(fetchAssignmentSummaryAction(wo, token)),
  fetchBacklogSummary: (en: string, woId: string, token?: string) => dispatch(fetchBacklogSummaryAction(en, woId, token)),
  fetchBacklogs: (payload: BacklogListParameter, token?: string) => dispatch(fetchBacklogListAction(payload, token)),
  fetchBacklogDetail: (backlogId: string, token?: string) => dispatch(fetchBacklogDetailAction(backlogId, token)),
  fetchBESMaster: (token?: string) => dispatch(fetchBESMasterAction(token)),
  fetchEquipment: (woId: string, token?: string) => dispatch(fetchEquipmentAction(woId, token)),
  fetchIdentityData: (woId: string, token?: string) => dispatch(fetchIdentityAction(woId, token)),
  fetchPIAnswer: (woId: string, token?: string) => dispatch(fetchPIAnswerAction(woId, token)),
  fetchQuestions: (model: string, token?: string) => dispatch(fetchPIQuestionAction(model, token)),
  fetchSpecificObject: (payload: ObjectPartModel, token?: string) => dispatch(fetchBESSpecificObjectPartAction(payload, token)),
  fetchStagingInfo: (woId: string, token?: string) => dispatch(fetchStagingInfoAction(woId, token)),
  getJobData: () => dispatch(getDataAction(JOB_DATA, StorageKey.JOB_DATA)),
  handover: (woId: string, token?: string) => dispatch(handoverAction(woId, token)),
  pushTo: (url: string) => dispatch(push(url)),
  rejectBacklog: (backlogId: string, token?: string) => dispatch(rejectBacklogAction(backlogId, token)),
  searchSparePart: (keyword: string, token?: string) => dispatch(searchSparePartAction(keyword, token)),  
  setTimezone: (timezone: string) => dispatch(setTimezoneAction(timezone)),
  submitBacklog: (data: BacklogEntrySheet, token?: string) => dispatch(submitBacklogAction(data, token)),
  submitEquipment: (data: EquipmentModel, token?: string) => dispatch(submitEquipmentAction(data, token)),
  submitPI: (data: PISubmissionModel, token?: string) => dispatch(submitPIAction(data, token)),
  unhandover: (woId: string, token?: string) => dispatch(unhandoverAction(woId, token)),
  updateBacklogDetail: (data: BacklogEntrySheet) => dispatch(updateBacklogDetailAction(data)),
  updateBacklogParameter: (payload: BacklogListParameter) => dispatch(backlogListParameterAction(UpdateBacklogParameterAction, payload)),
  updateCheckSheet: (checksheet: CheckSheetValueModel) => dispatch(updatePICheckSheetValueAction(checksheet)),
  updateEquipment: (data: EquipmentModel) => dispatch(updateEquipmentAction(data)),
  updatePIForm: (checksheet: ZoneCheckSheetModel[]) => dispatch(updatePIFormStateAction(checksheet)),
  validateSparepart: (spareparts: string[], token?: string) => dispatch(validateSparepartsAction(spareparts, token))
})

const piDetailPage = connect(mapStateToProps, mapDispatchToProps)(PiDetailPage);
type PiDetailPageStateProps = ReturnType<typeof mapStateToProps>;
type PiDetailPageDispatchProps = ReturnType<typeof mapDispatchToProps>;
export type PiDetailPageProps = PiDetailPageStateProps & PiDetailPageDispatchProps;

export { piDetailPage as PiDetailPage };