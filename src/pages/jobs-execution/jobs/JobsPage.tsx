import React from 'react';
import { Button, Modal, DialogContent, CircularProgress } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { JobsPageProps } from '.';
import { IconFilter } from '../../../assets/icons';
import { DropdownComponent } from '../../../components/dropdown';
import { SearchInput } from '../../../components/search-input/SearchInput';
import { JobList, JobsSummary, SelectMechanics, SelectTeamLeader } from './components';
import { ResetSelectedMechanicsAction, SelectCustomerFilterAction, SelectJobsTypeFilterAction, SelectMechanicAction, SelectUnitModelFilterAction, UnselectMechanicAction, ResetSelectedLeaderAction, SelectLeaderAction } from './JobsPage.actions';
import { JobsDataModel, JobsPageState, MechanicListModel, NewAssignmentModel } from './JobsPage.model';
import { ApiRequestActionsStatus } from '../../../core/rest-client-helpers';
import ConfirmationModal from '../../../components/confirmation-modal/ConfirmationModal';
import ProceedConfirmation from '../../../components/proceed-confirmation/ProceedConfirmation';
import './JobsPage.scss';

class JobsPage extends React.Component<JobsPageProps, JobsPageState> {
    state: JobsPageState = {
        isUnassignConfirmationShown: false,
        isShowSelectMechanicsModal: false,
        isShowSelectLeaderModal: false,
        isShowAssignSucceed: false,
        isFilterShown: false,
        isSortShow: false,
        jobProgress: 0,
    }

    componentDidMount = async() => {
        await this.props.token
        await this.props.fetchJobs(this.props.parameter, this.props.token);
    }

    componentWillUnmount = () => {
        this.props.onSearch('');
        this.props.selectFilter(SelectCustomerFilterAction, 'All Customer');
        this.props.selectFilter(SelectJobsTypeFilterAction, 'All Job');
        this.props.selectFilter(SelectUnitModelFilterAction, 'All Model');
        this.props.updateParameter({ ...this.props.parameter, searchValue: '', jobtypeFilter: '', unitModelFilter: '', customerFilter: '' })
    }

    componentDidUpdate = (prevProps: JobsPageProps) => {
        if (prevProps.selectedFilters !== this.props.selectedFilters) {
            this.props.updateParameter({
                ...prevProps.parameter,
                jobtypeFilter: this.props.selectedFilters.jobType,
                unitModelFilter: this.props.selectedFilters.unitModel,
                customerFilter: this.props.selectedFilters.customer,
                currentPage: 1,
            })
        }
        if (prevProps.searchValue !== this.props.searchValue) { this.props.updateParameter({ ...prevProps.parameter, searchValue: this.props.searchValue, currentPage: 1, }) }
        if (prevProps.parameter !== this.props.parameter) { this.props.fetchJobs(this.props.parameter, this.props.token); }
        if (prevProps.requestAssignJobs !== this.props.requestAssignJobs || prevProps.requestUnassignJobs !== this.props.requestUnassignJobs) {
            this.props.clearSelectedJobs({})
            this.props.fetchJobs(this.props.parameter, this.props.token)
        }
        if (prevProps.sortBy !== this.props.sortBy) {
            let sortBy = this.props.sortBy
            let isDescending: boolean = false
            if (sortBy.jobType.isActive) isDescending = !sortBy.jobType.isAscending
            if (sortBy.customer.isActive) isDescending = !sortBy.customer.isAscending
            if (sortBy.plantExecution.isActive) isDescending = !sortBy.plantExecution.isAscending
            if (sortBy.status.isActive) isDescending = !sortBy.status.isAscending
            if (sortBy.unitCode.isActive) isDescending = !sortBy.unitCode.isAscending
            if (sortBy.unitModel.isActive) isDescending = !sortBy.unitModel.isAscending
            if (sortBy.workOrder.isActive) isDescending = !sortBy.workOrder.isAscending
            if (sortBy.staging.isActive) isDescending = !sortBy.staging.isAscending
            if (sortBy.backlogOpen.isActive) isDescending = !sortBy.backlogOpen.isAscending
            this.props.updateParameter({ ...this.props.parameter, sortByJobType: sortBy.jobType.isActive, sortByCustomer: sortBy.customer.isActive, sortByPlantExecution: sortBy.plantExecution.isActive, sortByStatus: sortBy.status.isActive, sortByUnitCode: sortBy.unitCode.isActive, sortByUnitModel: sortBy.unitModel.isActive, sortByWorkOrder: sortBy.workOrder.isActive, sortByOpenBacklog: sortBy.backlogOpen.isActive, sortByStaging: sortBy.staging.isActive, orderDesc: isDescending, currentPage: 1 })
        }
    }

    onClickAssignBtn = () => { this.props.getMechanics(this.props.token); this.setState({ isShowSelectMechanicsModal: true }); }
    onClickAssignMechanics = () => { this.setState({ isShowSelectMechanicsModal: false, isShowSelectLeaderModal: true, isShowAssignSucceed: false }); }
    onClickAssignTeamLeader = () => {
        let assignment: NewAssignmentModel = { mechanicList: this.props.selectedMechanics, jobList: this.props.selectedJobs, mechanicLeader: this.props.selectedLeader }
        this.props.assignJobs(assignment, this.props.token);
        this.setState({ isShowSelectMechanicsModal: false, isShowSelectLeaderModal: false, isShowAssignSucceed: true });
    }
    
    onClickUnassignBtn = () => { this.setState({ isUnassignConfirmationShown: true }) }
    onMechanicChoosed = (mechanic: MechanicListModel) => {
        if (this.props.selectedMechanics.some(mechanics => mechanics.username === mechanic.username)) this.props.selectMechanic(UnselectMechanicAction, mechanic)
        else { this.props.selectMechanic(SelectMechanicAction, mechanic) }
    }

    handleClose = () => {
        this.setState({ isShowSelectMechanicsModal: false, isShowSelectLeaderModal: false, isShowAssignSucceed: false, isUnassignConfirmationShown: false });
        this.props.selectMechanic(ResetSelectedMechanicsAction)
        this.props.selectLeader(ResetSelectedLeaderAction)
    }

    onLeaderChoosed = (leader: MechanicListModel) => { this.props.selectLeader(SelectLeaderAction, leader) }

    onUnassignConfirm = () => {
        let jobs: string[] = []
        this.props.selectedJobs.map((job) => {
            if (job.workOrderId) return (jobs = [...jobs, job.workOrderId])
            else return jobs = []
        })
        this.props.unassignJobs(jobs, this.props.token)
        this.setState({ isUnassignConfirmationShown: false, isShowAssignSucceed: true })
    }

    updateAssignmentStates = (job: JobsDataModel) => {
        if (this.props.selectedJobs.some(jobs => jobs.woNumber === job.woNumber)) { return this.props.unselectJob(job) }
        else { this.props.selectJob(job) }
    }

    renderCircularProgress() {
        if (this.props.requestAssignJobs === ApiRequestActionsStatus.LOADING ||
            this.props.requestJobs === ApiRequestActionsStatus.LOADING ||
            this.props.requestMechanics === ApiRequestActionsStatus.LOADING ||
            this.props.requestUnassignJobs === ApiRequestActionsStatus.LOADING) {
            return <CircularProgress size={100} className='circular-progress' />
        }
    }

    renderMenu() {
        return (
            <div className="header-row">
                <Button
                    className={this.props.parameter.assigmentFilter ? 'btn-job-assignment-active' : 'btn-job-assignment'}
                    onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: 1, assigmentFilter: true, approvalFilter: false, inProgressFilter: false })}>
                    {this.props.displayMode === 'mobile' ? `Jobs\nAssignment` : 'Jobs Assignment'}
                </Button>
                <Button
                    className={this.props.parameter.inProgressFilter ? 'btn-job-assignment-active' : 'btn-job-assignment'}
                    onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: 1, assigmentFilter: false, approvalFilter: false, inProgressFilter: true })}>
                    {this.props.displayMode === 'mobile' ? `Jobs\nin Progress` : 'Jobs in Progress'}
                </Button>
                <Button
                    className={this.props.parameter.approvalFilter ? 'btn-job-assignment-active' : 'btn-job-assignment'}
                    onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: 1, assigmentFilter: false, approvalFilter: true, inProgressFilter: false })}>
                    {this.props.displayMode === 'mobile' ? `Jobs\nApproval` : 'Jobs Approval'}
                </Button>
            </div>
        )
    }

    renderTitle() { return (<p className="title">Jobs Summary</p>) }
    renderSummary() {
        return (
            <div className="work-highlight-container">
                <JobsSummary displayMode={this.props.displayMode} data={{
                    title: 'Periodic Inspection',
                    total: this.props.jobsData.periodicInspectionTotal || 0,
                    todo: this.props.jobsData.periodicInspectionUnassign || 0,
                    handover: this.props.jobsData.periodicInspectionHandover || 0,
                }} />
                <JobsSummary displayMode={this.props.displayMode} data={{
                    title: 'Periodic Service',
                    total: this.props.jobsData.periodicServiceTotal || 0,
                    todo: this.props.jobsData.periodicServiceUnassign || 0,
                    handover: this.props.jobsData.periodicServiceHandover || 0,
                }} />
                <JobsSummary displayMode={this.props.displayMode} data={{
                    title: 'Unschedule Breakdown',
                    total: this.props.jobsData.unscheduleBreakdownTotal || 0,
                    todo: this.props.jobsData.unscheduleBreakdownUnassign || 0,
                    handover: this.props.jobsData.unscheduleBreakdownHandover || 0,
                }} />
            </div>
        )
    }

    renderSearchInput() { return (<SearchInput webInfo='Search by unit code, unit model, or work order' displayMode={this.props.displayMode} onSearch={this.props.onSearch} />) }
    renderFilter() {
        return (
            <div className="dropdowns-container">
                <div className="dropdown-container">
                    <DropdownComponent displayMode={this.props.displayMode} data={this.props.jobsData.jobTypeFilter} selected={this.props.selectedFilters.jobType} onSelectActionType={SelectJobsTypeFilterAction} onSelectAction={this.props.selectFilter} />
                </div>
                <div className="dropdown-container">
                    <DropdownComponent data={this.props.jobsData.unitModelFilter} displayMode={this.props.displayMode} selected={this.props.selectedFilters.unitModel} onSelectActionType={SelectUnitModelFilterAction} onSelectAction={this.props.selectFilter} />
                </div>
                <div className="dropdown-container">
                    <DropdownComponent data={this.props.jobsData.customerFilter} displayMode={this.props.displayMode} selected={this.props.selectedFilters.customer} onSelectActionType={SelectCustomerFilterAction} onSelectAction={this.props.selectFilter} />
                </div>
                {this.props.displayMode === 'web' && <div className="search-container">{this.renderSearchInput()}</div>}
            </div>
        )
    }

    renderJobList() {
        return (
            <div className="jobs-list-container">
                <JobList
                    {...this.props}
                    onChoosed={this.updateAssignmentStates}
                    displayMode={this.props.displayMode}
                    jobList={this.props.jobsData.tableValues || []}
                    selectedJobList={this.props.selectedJobs}
                    pushTo={this.props.pushTo}
                    onClickTabHead={this.props.onClickSortBy}
                    sortJobsByState={this.props.sortBy}
                    displayCheckbox={this.props.parameter.assigmentFilter || this.props.parameter.inProgressFilter} />
            </div>
        )
    }

    renderPagination() {
        const web: boolean = this.props.displayMode === 'web'
        const next: boolean = this.props.jobsData.nextPage
        const prev: boolean = this.props.jobsData.prevPage
        const currentProps: number = this.props.jobsData.currentPage
        const numberOfPage: number = this.props.jobsData.numberOfPage

        return (
            <div className="pagination">
                <div className="paging">
                    {prev && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>}
                    {web && currentProps - 3 > 0 && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps - 3 })} className="page-inactive">{currentProps - 3}</div>}
                    {web && currentProps - 2 > 0 && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps - 2 })} className="page-inactive">{currentProps - 2}</div>}
                    {currentProps - 1 > 0 && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps - 1 })} className="page-inactive">{currentProps - 1}</div>}
                    <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps })} className="page-active">{currentProps}</div>
                    {currentProps + 1 <= numberOfPage && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps + 1 })} className="page-inactive">{currentProps + 1}</div>}
                    {web && currentProps + 2 < numberOfPage && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps + 2 })} className="page-inactive">{currentProps + 2}</div>}
                    {web && currentProps + 3 < numberOfPage && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps + 3 })} className="page-inactive">{currentProps + 3}</div>}
                    {next && <div onClick={() => this.props.updateParameter({ ...this.props.parameter, currentPage: currentProps + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>}
                </div>
            </div>
        )
    }

    renderAssignBtn() {
        if (this.props.parameter.assigmentFilter) { return (
            <Button disabled={this.props.selectedJobs.length < 1 || this.props.selectedJobs.some(job => job.status === 'Assigned')} className="btn-assign" onClick={this.onClickAssignBtn}>Assign</Button>
        )}
    }

    renderUnassignBtn() {
        if (this.props.parameter.assigmentFilter || this.props.parameter.inProgressFilter) { return (
            <Button onClick={this.onClickUnassignBtn} disabled={this.props.selectedJobs.length < 1 || this.props.selectedJobs.some(job => job.status === 'Unassign' || this.props.selectedJobs.some(job => job.status === 'Handover'))} className="btn-unassign">Unassign</Button>
        )}
    }

    renderUncheckAllBtn() {
        if (this.props.parameter.assigmentFilter || this.props.parameter.inProgressFilter) { return (
            <Button onClick={() => this.props.clearSelectedJobs({})} disabled={this.props.selectedJobs.length < 1} className="btn-unassign">Uncheck All</Button>
        )}
    }

    renderModals() {
        let isAssignmentSucceed = this.props.requestAssignJobs === ApiRequestActionsStatus.SUCCEEDED
        let isCallApiSucceed = isAssignmentSucceed || this.props.requestUnassignJobs === ApiRequestActionsStatus.SUCCEEDED
        return (
            <div>
                {
                    this.props.requestMechanics === ApiRequestActionsStatus.SUCCEEDED &&
                    <Modal open={this.state.isShowSelectMechanicsModal} onClose={this.handleClose} className="modal-container">
                        <DialogContent className="modal-content" >
                            <SelectMechanics {...this.props} onClick={this.onMechanicChoosed} onCancel={this.handleClose} onAssign={this.onClickAssignMechanics} />
                        </DialogContent>
                    </Modal>
                }
                <Modal open={this.state.isShowSelectLeaderModal} onClose={this.handleClose}className="modal-container">
                    <DialogContent className="modal-content">
                        <SelectTeamLeader {...this.props} onClick={this.onLeaderChoosed} onCancel={this.handleClose} onAssign={this.onClickAssignTeamLeader} />
                    </DialogContent>
                </Modal>
                {isCallApiSucceed && <ConfirmationModal openModal={this.state.isShowAssignSucceed} isSuccess={this.props.assignJobsResponse || this.props.unassignJobsResponse} successMsg={`Job has been ${isAssignmentSucceed ? 'assigned' : 'unassigned'}`} onClose={this.handleClose} />}
                {this.props.requestMechanics === ApiRequestActionsStatus.FAILED && <ConfirmationModal openModal={this.state.isShowSelectMechanicsModal} onClose={this.handleClose} isSuccess={false} />}
                <ProceedConfirmation openModal={this.state.isUnassignConfirmationShown} onClose={this.handleClose} onProceed={this.onUnassignConfirm} />
            </div>
        )
    }

    render() {
        if (this.props.displayMode === 'tab') {
            return (
                <main className="content">
                    {this.renderCircularProgress()}
                    {this.renderMenu()}
                    {this.renderTitle()}
                    {this.renderSummary()}
                    <div className="line" />
                    <div className="filters-container">
                        <div className="search-container">
                            {this.renderSearchInput()}
                            <Button className={this.state.isFilterShown ? 'filter-btn-active' : 'filter-btn'} onClick={() => this.setState({ isFilterShown: !this.state.isFilterShown })}>
                                <img alt='' src={`${IconFilter}`} className="filter-icon" />
                            </Button>
                        </div>
                        {this.state.isFilterShown && this.renderFilter()}
                    </div>
                    <div className="table-container">
                        {this.renderJobList()}
                    </div>
                    <div className="bottom-row">
                        {this.renderAssignBtn()}
                        {this.renderUnassignBtn()}
                        {this.renderUncheckAllBtn()}
                        {this.renderPagination()}
                    </div>
                    {this.renderModals()}
                </main>
            )
        }
        else if (this.props.displayMode === 'mobile') {
            return (
                <main className="content">
                    {this.renderCircularProgress()}
                    {this.renderMenu()}
                    {this.renderTitle()}
                    {this.renderSummary()}
                    <div className="line" />
                    <div className="filters-container">
                        <div className="search-container">
                            <div className="search-bar">
                                {this.renderSearchInput()}
                            </div>
                            <div className={this.state.isFilterShown ? "filter-icon-container-choosed" : "filter-icon-container"} >
                                <Button onClick={() => this.setState({ isFilterShown: !this.state.isFilterShown, isSortShow: false })}>
                                    <img alt='' src={IconFilter} className="filter-icon" />
                                </Button>
                            </div>
                        </div>
                        {this.state.isFilterShown && this.renderFilter()}
                    </div>
                    {this.renderJobList()}
                    {this.renderPagination()}
                    <div className="btn-column">
                        {this.renderAssignBtn()}
                        {this.renderUnassignBtn()}
                        {this.renderUncheckAllBtn()}
                    </div>
                    {this.renderModals()}
                </main>
            )
        }
        return (
            <main className="content">
                {this.renderCircularProgress()}
                {this.renderMenu()}
                {this.renderTitle()}
                {this.renderSummary()}
                <div className="table-container">
                    <div className="filters-container">
                        {this.renderFilter()}
                    </div>
                    {this.renderJobList()}
                    <div className="bottom-row">
                        {this.renderAssignBtn()}
                        {this.renderUnassignBtn()}
                        {this.renderUncheckAllBtn()}
                        {this.renderPagination()}
                    </div>
                </div>
                {this.renderModals()}
            </main>
        )
    }
}

export default JobsPage;