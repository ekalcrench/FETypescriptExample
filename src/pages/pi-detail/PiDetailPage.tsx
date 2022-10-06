import React from 'react';
import ConfirmationModal from '../../components/confirmation-modal/ConfirmationModal';
import { CircularProgress, DialogContent, Modal } from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { PiDetailPageProps } from '.';
import { Menu } from '../../common/constants';
import { ApiRequestActionsStatus } from '../../core/rest-client-helpers';
import { BacklogDetail, BacklogEntrySheetDetail, InformationSummary, JobAssignment, JobIdentity, JobInprogressDetail, JobList, JobStaging, JobTimeIdentity, PIForm, UnitIdentity } from './components';
import { PiDetailPageState } from './PiDetailPage.model';
import { JobsDataModel } from '../jobs-execution/jobs/JobsPage.model';
import ProceedConfirmation from '../../components/proceed-confirmation/ProceedConfirmation';
import './PiDetailPage.scss';

export default class PiDetailPage extends React.Component<PiDetailPageProps, PiDetailPageState> {
  
  state: PiDetailPageState = {
    isShowWorkOrderModal: false,
    isShowJobInprogressDetail: false,
    isShowBesListDetailModal: false,
    isShowPiFormModal: false,
    isPIConfirmationShown: false,
    isBESConfirmationShown: false,
    isBMSConfirmationShown: false,
    isSubmitSucceed: false,
    isProceedConfirmationShown: false,
    isHandoverConfirmationShown: false,
  };

  jobsPops: JobsDataModel = {}

  async componentDidMount() {
    await this.props.getJobData();    
    this.jobsPops = this.props.storedJobData
    await this.props.token
    this.props.fetchIdentityData(this.jobsPops.workOrderId || '', this.props.token); 
    this.props.fetchStagingInfo(this.jobsPops.workOrderId || '', this.props.token)
    this.props.fetchAssigmentSummary(this.jobsPops.workOrderId || '', this.props.token);
    this.props.fetchEquipment(this.jobsPops.workOrderId || '', this.props.token); 
    this.props.fetchBacklogSummary(this.jobsPops.equipmentNumber || '', this.jobsPops.workOrderId || '', this.props.token) ;
    if (this.jobsPops.status !== 'Need Approval') { 
      await this.props.updateBacklogParameter({...this.props.backlogParameter, showBES: false, showBMS: true, equipmentNumber: this.jobsPops.equipmentNumber, workorderid: this.jobsPops.workOrderId  || '', currentPage: 1, filter: ''})      
      this.props.fetchBacklogs(this.props.backlogParameter, this.props.token)
    }
    if (this.jobsPops.status === 'Need Approval') { 
      await this.props.updateBacklogParameter({...this.props.backlogParameter, showBES: false, showBMS: false, equipmentNumber: this.jobsPops.equipmentNumber, workorderid: this.jobsPops.workOrderId  || '', currentPage: 1, filter: ''})  
      this.props.fetchBESMaster(this.props.token);
      this.props.fetchQuestions(this.jobsPops.unitModel || '', this.props.token);
      this.props.fetchPIAnswer(this.jobsPops.workOrderId || '', this.props.token);
    }
  }

  componentWillUnmount = () => {
    this.props.updateBacklogParameter({...this.props.backlogParameter, showBES: false, showBMS: false })
  }

  componentDidUpdate = async(prevProps: PiDetailPageProps) => {
    if (prevProps.equipment !== this.props.equipment) { return this.props.updateEquipment(this.props.equipment.data)}
    if (prevProps.backlogSubmission !== this.props.backlogSubmission && this.props.backlogSubmission.response) return this.props.fetchBacklogs(this.props.backlogParameter, this.props.token); 
    if (prevProps.backlogParameter !== this.props.backlogParameter) { return this.props.fetchBacklogs(this.props.backlogParameter, this.props.token) }
    if (prevProps.backlogDetail !== this.props.backlogDetail) { return this.props.updateBacklogDetail(this.props.backlogDetail) }
    if (prevProps.piApprovalStatus !== this.props.piApprovalStatus && this.props.piApprovalStatus !== ApiRequestActionsStatus.LOADING) { return this.setState({...this.state, isShowPiFormModal: false , isPIConfirmationShown: true})}
    if (prevProps.equipmentSubmission !== this.props.equipmentSubmission && this.props.equipmentSubmission.status !== ApiRequestActionsStatus.LOADING) { this.setState({...this.state, isSubmitSucceed: true}); return this.props.fetchEquipment(this.props.identity.workOrderId || '', this.props.token)}
    if (prevProps.handoverStatus !== this.props.handoverStatus && this.props.handoverStatus.status !== ApiRequestActionsStatus.LOADING) { return this.setState({...this.state, isHandoverConfirmationShown: true}) } 
    if (prevProps.bmsClosedStatus !== this.props.bmsClosedStatus && this.props.bmsClosedStatus !== ApiRequestActionsStatus.LOADING) { 
      this.props.fetchBacklogSummary(this.props.identity.equipmentNumber || '', this.props.identity.workOrderId || '', this.props.token) ;
      this.props.fetchBacklogs(this.props.backlogParameter, this.props.token); 
      return this.setState({...this.state, isShowBesListDetailModal: false, isBMSConfirmationShown: true})
    }
    if (prevProps.besApprovalStatus !== this.props.besApprovalStatus && this.props.besApprovalStatus !== ApiRequestActionsStatus.LOADING) { 
      this.props.fetchBacklogSummary(this.props.identity.equipmentNumber || '', this.props.identity.workOrderId || '', this.props.token) ;
      this.props.fetchBacklogs(this.props.backlogParameter, this.props.token)
      return this.setState({...this.state, isShowBesListDetailModal: false , isBESConfirmationShown: true})}
  }

  handleApprovalOnClose = () => {
    this.setState({isPIConfirmationShown: false}); 
    if (this.props.piApprovalResponse) this.props.pushTo(Menu.JOBS_SUMMARY)
  }
  
  handleHandoverOnClose = () => {
    this.setState({...this.state, isHandoverConfirmationShown: false})
    if (this.props.handoverStatus.response) this.props.pushTo(Menu.JOBS_SUMMARY)
  }

  handleOnClickWorkOrder = (backlogId: string) => {
    this.props.fetchBacklogDetail(backlogId, this.props.token)
    this.setState({ ...this.state, isShowWorkOrderModal: true });
  }

  handleOnClickBesList = (backlogId: string) => {
    this.props.fetchBacklogDetail(backlogId, this.props.token)
    this.setState({ ...this.state, isShowBesListDetailModal: true });
  }

  handleOnClose = () => { this.setState({ isProceedConfirmationShown: false,  isBESConfirmationShown: false, isBMSConfirmationShown: false , isShowWorkOrderModal: false, isShowJobInprogressDetail: false, isShowBesListDetailModal: false, isShowPiFormModal: false, isPIConfirmationShown: false, isSubmitSucceed: false }); }
  handleOnClickSeeDetail = () => { this.setState({ ...this.state, isShowJobInprogressDetail: true }); }
  handleOnClickPiForm = () => { this.props.piAnswersStatus === ApiRequestActionsStatus.SUCCEEDED && this.setState({ ...this.state, isShowPiFormModal: true }); }

  handleRouteBacklog = async(backlogId: string) => {
    this.setState({ isShowPiFormModal: false })
    await this.props.fetchBacklogDetail(backlogId, this.props.token)
    this.setState({ isShowBesListDetailModal: true })
  }

  handleRejectBacklog = () => { this.setState({isProceedConfirmationShown: true }) }
  handleRejectBacklogConfirmed = async() => { 
    this.setState({isProceedConfirmationShown: false, isShowBesListDetailModal: false })
    await this.props.rejectBacklog(this.props.backlogDetailUpdate.backlogId || '', this.props.token) 
    if (this.props.backlogRejected.status === ApiRequestActionsStatus.SUCCEEDED && this.props.backlogRejected.response) {
      this.props.fetchBacklogSummary(this.props.identity.equipmentNumber || '', this.props.identity.workOrderId || '', this.props.token)
      this.props.fetchBacklogs(this.props.backlogParameter, this.props.token)
      this.props.fetchPIAnswer(this.props.identity.workOrderId || '', this.props.token)
    }
  }

  renderCircularProgress() {
    if (this.props.assignmentHistoryStatus === ApiRequestActionsStatus.LOADING ||
      this.props.backlogDetailStatus === ApiRequestActionsStatus.LOADING ||
      this.props.backlogListStatus === ApiRequestActionsStatus.LOADING ||
      this.props.backlogRejected.status === ApiRequestActionsStatus.LOADING ||
      this.props.backlogSummaryStatus === ApiRequestActionsStatus.LOADING ||
      this.props.besMasterStatus === ApiRequestActionsStatus.LOADING ||
      this.props.equipment.status === ApiRequestActionsStatus.LOADING ||
      this.props.equipmentSubmission.status === ApiRequestActionsStatus.LOADING ||
      this.props.handoverStatus.status === ApiRequestActionsStatus.LOADING ||
      this.props.jobIdentityStatus === ApiRequestActionsStatus.LOADING ||
      this.props.piAnswersStatus === ApiRequestActionsStatus.LOADING ||
      this.props.piApprovalStatus === ApiRequestActionsStatus.LOADING ||
      this.props.piQuestionsStatus === ApiRequestActionsStatus.LOADING ||
      this.props.piSubmissions.status === ApiRequestActionsStatus.LOADING || 
      this.props.specificObjectPartsStatus === ApiRequestActionsStatus.LOADING ||
      this.props.stagingInfoStatus === ApiRequestActionsStatus.LOADING ||
      this.props.unhandoverStatus.status === ApiRequestActionsStatus.LOADING) {
      return <CircularProgress size={100} className='circular-progress'/>
    }
  }

  renderPathLink() {
    return (
      <div className="sub-app-bar">
        <Link className="link" to={Menu.DASHBOARD}>Home</Link>
        <KeyboardArrowRight className="arrow-right" />
        <Link className="link" to={Menu.JOBS_SUMMARY}>Jobs Assignment</Link>
        <KeyboardArrowRight className="arrow-right" />
        <p className="not-link">Detail PI</p>
      </div>
    )
  }

  renderJobIdentity() {
    return (
      <div className="job-identity">
        <UnitIdentity unitIdentity={this.props.identity} />
        <JobIdentity jobIdentity={this.props.identity} />
        <JobTimeIdentity {...this.props} />
      </div>
    )
  }

  renderModal() {
    return (
      <div>
        <Modal open={this.state.isShowJobInprogressDetail} className="modal-container" onClose={this.handleOnClose}>
          <DialogContent className="modal-content">
            <JobInprogressDetail {...this.props} onClose={this.handleOnClose} />
          </DialogContent>
        </Modal>
        {
          this.props.backlogDetailStatus === ApiRequestActionsStatus.SUCCEEDED &&
          <div>
            <Modal open={this.state.isShowWorkOrderModal} className="modal-container" onClose={this.handleOnClose}>
              <DialogContent className="modal-content">
                <BacklogDetail {...this.props} onClick={this.handleOnClose} />
              </DialogContent>
            </Modal>
            <Modal open={this.state.isShowBesListDetailModal} className="modal-container" onClose={this.handleOnClose}>
              <DialogContent className="modal-content">
                <BacklogEntrySheetDetail {...this.props} onReject={this.handleRejectBacklog} onClose={this.handleOnClose} />
              </DialogContent>
            </Modal>
          </div>
        }
        <Modal open={this.state.isShowPiFormModal} className="modal-container" onClose={this.handleOnClose}>
          <DialogContent className="modal-content">
            <PIForm {...this.props} onBacklogClick={this.handleRouteBacklog} onClose={this.handleOnClose} />
          </DialogContent>
        </Modal>
        <ConfirmationModal onClose={this.handleApprovalOnClose} openModal={this.state.isPIConfirmationShown} isSuccess={this.props.piApprovalResponse} errorMsg="Please re-check your form or backlog before proceed" successMsg='Periodical Inspection has been approved'/>
        <ConfirmationModal onClose={this.handleOnClose} openModal={this.state.isBESConfirmationShown} isSuccess={this.props.besApprovalResponse} successMsg='Backlog Entry Sheet has been approved'/>
        <ConfirmationModal onClose={this.handleOnClose} openModal={this.state.isBMSConfirmationShown} isSuccess={this.props.bmsClosedResponse} successMsg='Backlog Monitoring Sheet has been approved'/>
        <ConfirmationModal onClose={this.handleHandoverOnClose} openModal={this.state.isHandoverConfirmationShown} isSuccess={this.props.handoverStatus.response} successMsg="Handover job is success"/>
        <ConfirmationModal onClose={() => this.setState({isSubmitSucceed: false})} openModal={!this.state.isPIConfirmationShown && this.state.isSubmitSucceed} isSuccess={this.props.piSubmissions.response || this.props.equipmentSubmission.response} successMsg="Data has been changed"/>
        <ProceedConfirmation openModal={this.state.isProceedConfirmationShown} onClose={() => this.setState({isProceedConfirmationShown: false})} onProceed={this.handleRejectBacklogConfirmed} />
      </div>
    )
  }

  renderContent() {
    let isInProgressFinish = this.props.stagingInfo.length >= 9 || this.jobsPops.status === 'Need Approval' 
    return (
      <div>
        <JobStaging {...this.props} displayMode={this.props.displayMode} onClick={this.handleOnClickSeeDetail} />
        {!isInProgressFinish && <JobList {...this.props} backlogList={this.props.backlogList} onClick={this.handleOnClickWorkOrder} />}
        {this.jobsPops.status !== 'Unassign' && <JobAssignment {...this.props} summary={this.props.assignmentSummary} />}
        {isInProgressFinish && <InformationSummary {...this.props} onClickBesList={this.handleOnClickBesList} onClickPiForm={this.handleOnClickPiForm} />}
      </div>
    )
  }

  render() {
    if (this.props.displayMode === 'tab') {
      return (
        <main className="content2">
          {this.renderCircularProgress()}
          {this.renderPathLink()}
          <div className="job-identity-container">
            {this.renderJobIdentity()}
          </div>
          <div className="detail-page-content">
            <div className="line" />
            <div className="detail">
              {this.renderContent()}
            </div>
          </div>
          {this.renderModal()}
        </main>
      )
    }
    return (
      <main className="content2">
        {this.renderCircularProgress()}
        {this.renderPathLink()}
        <div className="detail-page-content">
          {this.renderJobIdentity()}
          {this.renderContent()}
        </div>
        {this.renderModal()}
      </main>
    )
  }
}