import moment, { ISO_8601 } from 'moment';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Tooltip, CircularProgress, Button, Card, CardContent } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowRight, KeyboardArrowUp, KeyboardArrowLeft } from '@material-ui/icons';
import { JobsReportPageProps } from '.';
import { Download, IconFilter } from '../../../assets/icons';
import { DropdownComponent } from '../../../components/dropdown';
import { SearchInput } from '../../../components/search-input/SearchInput';
import { JobListHeaderProps } from '../jobs/components/job-list/JobList.model';
import { SelectCustomerFilterAction, SelectJobsTypeFilterAction, SelectUnitModelFilterAction, SortJobsByBacklogOpen, SortJobsByCustomer, SortJobsByJobType, SortJobsByUnitCode, SortJobsByUnitModel, SortJobsByWorkOrder } from '../jobs/JobsPage.actions';
import { ApiRequestActionsStatus } from '../../../core/rest-client-helpers';
import ConfirmationModal from '../../../components/confirmation-modal/ConfirmationModal';
import './JobsReport.scss';

export class JobsReportHeader extends React.PureComponent<JobListHeaderProps>{
    render() {
        return (
            <TableCell align="left" className="table-cell1">
                <Tooltip
                    title="Sort"
                    placement="bottom-end"
                    enterDelay={this.props.delay} >
                    <TableSortLabel
                        active={this.props.isActive}
                        IconComponent={this.props.isAscending ? KeyboardArrowUp : KeyboardArrowDown}
                        onClick={this.props.onClick} >
                        {this.props.name}
                    </TableSortLabel>
                </Tooltip>
            </TableCell>
        )
    }
}

class JobsReport extends React.Component<JobsReportPageProps>{

    state = {
        showError: false,
        isFilterShown: false
    }

    async componentDidMount() {
        await this.props.token
        await this.props.fetchReports(this.props.reportParameter, this.props.token);
    }

    componentWillUnmount = () => {
        this.props.onSearch('');
        this.props.selectFilter(SelectCustomerFilterAction, 'All Customer');
        this.props.selectFilter(SelectJobsTypeFilterAction, 'All Job');
        this.props.selectFilter(SelectUnitModelFilterAction, 'All Model');
        this.props.updateReportsParameter({ ...this.props.reportParameter, searchValue: '', currentPage: 1, jobtypeFilter: '', unitModelFilter: '', customerFilter: '' })
    }

    componentDidUpdate = (prevProps: JobsReportPageProps) => {
        if (prevProps.searchValue !== this.props.searchValue) { this.props.updateReportsParameter({ ...prevProps.reportParameter, searchValue: this.props.searchValue, currentPage: 1, }) }
        if (prevProps.selectedFilters !== this.props.selectedFilters) {
            this.props.updateReportsParameter({
                ...prevProps.reportParameter,
                jobtypeFilter: this.props.selectedFilters.jobType,
                unitModelFilter: this.props.selectedFilters.unitModel,
                customerFilter: this.props.selectedFilters.customer,
                currentPage: 1,
            })
        }
        if (prevProps.sortBy !== this.props.sortBy) {
            let sortBy = this.props.sortBy
            let isDescending: boolean = false
            if (sortBy.jobType.isActive) isDescending = !sortBy.jobType.isAscending
            if (sortBy.customer.isActive) isDescending = !sortBy.customer.isAscending
            if (sortBy.backlogOpen.isActive) isDescending = !sortBy.backlogOpen.isAscending
            if (sortBy.status.isActive) isDescending = !sortBy.status.isAscending
            if (sortBy.unitCode.isActive) isDescending = !sortBy.unitCode.isAscending
            if (sortBy.unitModel.isActive) isDescending = !sortBy.unitModel.isAscending
            if (sortBy.workOrder.isActive) isDescending = !sortBy.workOrder.isAscending
            this.props.updateReportsParameter({ ...this.props.reportParameter, sortByJobType: sortBy.jobType.isActive, sortByCustomer: sortBy.customer.isActive, sortByPlantExecution: sortBy.backlogOpen.isActive, sortByUnitCode: sortBy.unitCode.isActive, sortByUnitModel: sortBy.unitModel.isActive, sortByWorkOrder: sortBy.workOrder.isActive, orderDesc: isDescending, currentPage: 1 })
        }
        if (prevProps.reportParameter !== this.props.reportParameter) return this.props.fetchReports(this.props.reportParameter, this.props.token);
    }

    handlePiDownload = async(woId: string) => {
        await this.props.downloadReporting(woId, moment().format('Z'), this.props.token)
        const file: Blob = new Blob(
            [this.props.reportDownloaded.data],
            {type: 'application/pdf'}
        )
        const filerUrl: string = URL.createObjectURL(file);
        window.open(filerUrl)
    }

    handleBacklogDownload = async(woId: string) => {
        await this.props.downloadBackog(woId, moment().format('Z'), this.props.token)
        if (this.props.backlogDownloaded.status === ApiRequestActionsStatus.FAILED) {
            this.setState({showError: true})
        }
        if (this.props.backlogDownloaded.status === ApiRequestActionsStatus.SUCCEEDED) {
            const file: Blob = new Blob(
                [this.props.backlogDownloaded.data],
                {type: 'application/pdf'}
            )
            const filerUrl: string = URL.createObjectURL(file);
            window.open(filerUrl)
        }
    }

    renderCircularProgress() {
        if (this.props.backlogDownloaded.status === ApiRequestActionsStatus.LOADING ||
            this.props.reportListStatus === ApiRequestActionsStatus.LOADING ||
            this.props.reportDownloaded.status === ApiRequestActionsStatus.LOADING) {
            return <CircularProgress size={100} className='circular-progress' />
        }
    }

    renderConfirmations() {
        return (<ConfirmationModal isSuccess={false} openModal={this.state.showError} onClose={() => this.setState({showError: false})} errorMsg="Your job have no Backlogs"/>)
    }

    renderSearchInput() { return (<SearchInput {...this.props} webInfo="Search by unit model or unit code" onSearch={this.props.onSearch} />)}
    renderFilter() {
        return (
            <div className="dropdowns-container">
                <div className="dropdown-container">
                    <DropdownComponent data={this.props.reportList.jobTypeFilter} selected={this.props.selectedFilters.jobType} onSelectActionType={SelectJobsTypeFilterAction} onSelectAction={this.props.selectFilter} />
                </div>
                <div className="dropdown-container">
                    <DropdownComponent data={this.props.reportList.unitModelFilter} selected={this.props.selectedFilters.unitModel}  onSelectActionType={SelectUnitModelFilterAction} onSelectAction={this.props.selectFilter} />
                </div>
                <div className="dropdown-container">
                    <DropdownComponent data={this.props.reportList.customerFilter} selected={this.props.selectedFilters.customer} onSelectActionType={SelectCustomerFilterAction} onSelectAction={this.props.selectFilter} />
                </div>
                {this.props.displayMode === 'web' &&<div className="search-container">{this.renderSearchInput()}</div>}
            </div>
        )
    }

    renderJobsReport() {
        if (this.props.displayMode === 'mobile') {
            return (
                <div>
                    {
                        this.props.reportList.tableValues && this.props.reportList.tableValues.map((row, index) => {
                            return (
                            <Card key={index} className="report-job-list-mobile-card">
                                <CardContent className="job-list-mobile-content">
                                    <div className="job-list-row">
                                        <div className="job-list-detail-container">
                                            <div className="job-list-label">Work Order</div>
                                            <div className="job-list-detail">{row.woNumber || '-'}</div>
                                        </div>
                                        <div className="job-list-detail-container">
                                            <div className="job-list-label">Unit Model</div>
                                            <div className="job-list-detail">{row.unitModel || '-'}</div>
                                        </div>
                                    </div>
                                    <div className="yellow-line" />
                                    <div className="job-list-row">
                                        <div className="job-list-detail-container">
                                            <div className="job-list-label">Unit Code</div>
                                            <div className="job-list-detail">{row.unitCode || '-'}</div>
                                        </div>
                                        <div className="job-list-detail-container">
                                            <div className="job-list-label">Job Type</div>
                                            <div className="job-list-detail">{row.jobType || '-'}</div>
                                        </div>
                                    </div>
                                    <div className="job-list-row">
                                        <div className="job-list-detail-container">
                                            <div className="job-list-label">Date Execution</div>
                                            <div className="job-list-detail">{row.plantExecution ? this.datePlant(row.plantExecution) : '-'}</div>
                                        </div>
                                        <div className="job-list-detail-container">
                                            <div className="job-list-label">Customer</div>
                                            <div className="job-list-detail">{row.customer || '-'}</div>
                                        </div>
                                    </div>
                                    <div className="job-list-row">
                                        <div className="job-list-detail-container">
                                            <div className="download-button" onClick={() => this.handlePiDownload(row.workOrderId || '')}>
                                                <img src={`${Download}`} className="download-icon" alt="" />
                                                PI Report 
                                            </div>      
                                        </div>
                                        <div className="job-list-detail-container">
                                        <div className="download-button" onClick={() => this.handleBacklogDownload(row.workOrderId || '')}>
                                            <img src={`${Download}`} className="download-icon" alt="" />
                                            Backlog Report
                                        </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            )
                        })
                    }
                </div>
            )
        }
        return (
            <div className="jobsreport-list-container">
                <Table classes={{ root: 'table1' }}>
                    <TableHead className="table-head1" classes={{ root: 'table-head1' }}>
                        <TableRow className="table-head-row">
                            <TableCell className="padding-cell1"></TableCell>
                            <JobsReportHeader
                                name="UNIT MODEL"
                                isActive={this.props.sortBy.unitModel.isActive}
                                delay={300}
                                isAscending={this.props.sortBy.unitModel.isAscending}
                                onClick={() => this.props.onClickSortBy(SortJobsByUnitModel)} />
                            <JobsReportHeader
                                name="UNIT CODE"
                                isActive={this.props.sortBy.unitCode.isActive}
                                delay={300}
                                isAscending={this.props.sortBy.unitCode.isAscending}
                                onClick={() => this.props.onClickSortBy(SortJobsByUnitCode)} />
                            <JobsReportHeader
                                name="JOB TYPE"
                                isActive={this.props.sortBy.jobType.isActive}
                                delay={300}
                                isAscending={this.props.sortBy.jobType.isAscending}
                                onClick={() => this.props.onClickSortBy(SortJobsByJobType)} />
                            <JobsReportHeader
                                name="WORK ORDER"
                                isActive={this.props.sortBy.workOrder.isActive}
                                delay={300}
                                isAscending={this.props.sortBy.workOrder.isAscending}
                                onClick={() => this.props.onClickSortBy(SortJobsByWorkOrder)} />
                            <JobsReportHeader
                                name="CUSTOMER"
                                isActive={this.props.sortBy.customer.isActive}
                                delay={300}
                                isAscending={this.props.sortBy.customer.isAscending}
                                onClick={() => this.props.onClickSortBy(SortJobsByCustomer)} />
                            <JobsReportHeader
                                name="DATE EXECUTION"
                                isActive={this.props.sortBy.backlogOpen.isActive}
                                delay={300}
                                isAscending={this.props.sortBy.backlogOpen.isAscending}
                                onClick={() => this.props.onClickSortBy(SortJobsByBacklogOpen)} />
                            <JobsReportHeader
                                name="DOWNLOAD"
                                isActive={this.props.sortBy.backlogOpen.isActive}
                                delay={300}
                                isAscending={this.props.sortBy.backlogOpen.isAscending}
                                onClick={() => this.props.onClickSortBy(SortJobsByBacklogOpen)} />
                        </TableRow>
                    </TableHead>
                    <TableBody classes={{ root: 'table-body1' }}>
                        {this.props.reportList.tableValues && this.props.reportList.tableValues.map((row, index) => (
                            <TableRow key={index} classes={{ root: "table-row1" }}>
                                <TableCell className="padding-cell1"></TableCell>
                                <TableCell align="left" className="table-cell1">{row.unitModel || '-'}</TableCell>
                                <TableCell align="left" className="table-cell1">{row.unitCode || '-'}</TableCell>
                                <TableCell align="left" className="table-cell1">{row.jobType || '-'}</TableCell>
                                <TableCell align="left" className="table-cell1">{row.woNumber || '-'}</TableCell>
                                <TableCell align="left" className="table-cell1">{row.customer || '-'}</TableCell>
                                <TableCell align="left" className="table-cell1">{row.plantExecution ? this.datePlant(row.plantExecution) : '-'}</TableCell>
                                <TableCell className="download-cell">
                                    <div className="download-button" onClick={() => this.handlePiDownload(row.workOrderId || '')}>
                                        <img src={`${Download}`} className="download-icon" alt="" />
                                        PI Report 
                                    </div>                                                
                                    <div className="download-button" onClick={() => this.handleBacklogDownload(row.workOrderId || '')}>
                                        <img src={`${Download}`} className="download-icon" alt="" />
                                        Backlog Report
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }

    renderPagination() {
        const web: boolean = this.props.displayMode === 'web'
        const next: boolean = this.props.reportList.nextPage
        const prev: boolean = this.props.reportList.prevPage
        const currentProps: number = this.props.reportList.currentPage
        const numberOfPage: number = this.props.reportList.numberOfPage

        return (
            <div className="pagination">
                <div className="paging">
                    {prev && <div onClick={() => this.props.updateReportsParameter({ ...this.props.reportParameter, currentPage: currentProps - 1 })} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>}
                    {web && currentProps - 3 > 0 && <div onClick={() => this.props.updateReportsParameter({ ...this.props.reportParameter, currentPage: currentProps - 3 })} className="page-inactive">{currentProps - 3}</div>}
                    {web && currentProps - 2 > 0 && <div onClick={() => this.props.updateReportsParameter({ ...this.props.reportParameter, currentPage: currentProps - 2 })} className="page-inactive">{currentProps - 2}</div>}
                    {currentProps - 1 > 0 && <div onClick={() => this.props.updateReportsParameter({ ...this.props.reportParameter, currentPage: currentProps - 1 })} className="page-inactive">{currentProps - 1}</div>}
                    <div onClick={() => this.props.updateReportsParameter({ ...this.props.reportParameter, currentPage: currentProps })} className="page-active">{currentProps !== 0 ? currentProps : '1'}</div>
                    {currentProps !== 0 && currentProps + 1 <= numberOfPage && <div onClick={() => this.props.updateReportsParameter({ ...this.props.reportParameter, currentPage: currentProps + 1 })} className="page-inactive">{currentProps + 1}</div>}
                    {web && currentProps + 2 < numberOfPage && <div onClick={() => this.props.updateReportsParameter({ ...this.props.reportParameter, currentPage: currentProps + 2 })} className="page-inactive">{currentProps + 2}</div>}
                    {web && currentProps + 3 < numberOfPage && <div onClick={() => this.props.updateReportsParameter({ ...this.props.reportParameter, currentPage: currentProps + 3 })} className="page-inactive">{currentProps + 3}</div>}
                    {next && <div onClick={() => this.props.updateReportsParameter({ ...this.props.reportParameter, currentPage: currentProps + 1 })} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>}
                </div>
            </div>
        )
    }
    
    datePlant = (date: Date) => { return moment.utc(date, ISO_8601).local().format('DD MMMM YYYY'); }
    render() {
        if (this.props.displayMode !== 'web') {
            return (
                <main className="content">
                    {this.renderConfirmations()}
                    {this.renderCircularProgress()}
                    <h1 className="title">Reporting</h1>
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
                        {this.renderJobsReport()}
                    </div>
                    <div className="bottom-row">
                        {this.renderPagination()}
                    </div>
                </main>
            )
        }
        return (
            <main className="content">
                {this.renderConfirmations()}
                {this.renderCircularProgress()}
                <h1 className="title">Reporting</h1>
                <div className="table-container">
                    <div className="filters-container">
                        {this.renderFilter()}
                    </div>
                    {this.renderJobsReport()}
                </div>
                <div className="bottom-row">
                    {this.renderPagination()}
                </div>
            </main>
        )
    }
}

export default JobsReport;