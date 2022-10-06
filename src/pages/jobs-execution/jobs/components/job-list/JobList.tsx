import React from 'react';
import moment, { ISO_8601 } from 'moment';
import { Card, CardContent, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { Menu } from '../../../../../common/constants';
import { SortJobsByBacklogOpen, SortJobsByCustomer, SortJobsByJobType, SortJobsByPlantExecution, SortJobsByStaging, SortJobsByStatus, SortJobsByUnitCode, SortJobsByUnitModel, SortJobsByWorkOrder } from '../../JobsPage.actions';
import { JobsDataModel } from '../../JobsPage.model';
import { JobListHeaderProps, JobListProps } from "./JobList.model";
import './JobList.scss';

export class JobListHeader extends React.PureComponent<JobListHeaderProps>{
    render() {
        return (
            <TableCell align="left" className="table-cell">
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

export class JobList extends React.PureComponent<JobListProps> {
    openDetail = async(row: JobsDataModel) => {
        await this.props.saveJobData(row);
        this.props.storeJobData(row)
        return this.props.pushTo(`${Menu.DETAIL_PI}:${row.woNumber || ''}`);
    }

    isCheckboxAvailable = (data: JobsDataModel) => {
        let isAvailable: boolean = false
        if (this.props.selectedJobList.some(job => job.status === 'Assigned')) {
            isAvailable = this.props.selectedJobList.some(job => job.status !== data.status)
        }
        else { isAvailable = this.props.selectedJobList.some(job => job.status !== 'Assigned') && data.status === 'Assigned' }
        return isAvailable
    }
    
    datePlant = (date: Date) => { return moment.utc(date, ISO_8601).local().format('DD MMMM YYYY');  }

    render() {
        if (this.props.displayMode === 'mobile') {
            return (
                <div>
                    {
                        this.props.jobList &&
                        this.props.jobList.map((job, index) => {
                            return (
                                <Card key={index} className="job-list-mobile-card">
                                    <CardContent className="job-list-mobile-content">
                                        { this.props.displayCheckbox && <Checkbox className="check-box-mobile" disabled={this.isCheckboxAvailable(job)} checked={this.props.selectedJobList.some(jobs => jobs.woNumber === job.woNumber)} onClick={() => this.props.onChoosed(job)} classes={{ checked: "checkbox-checked" }} /> }
                                        <div onClick={() => this.openDetail(job)}>
                                            <div className="job-list-row">
                                                <div className="job-list-detail-container">
                                                    <div className="job-list-label">Unit Model</div>
                                                    <div className="job-list-detail">{job.unitModel || '-'}</div>
                                                </div>
                                                <div className="job-list-detail-container">
                                                    <div className="job-list-label">Unit Code</div>
                                                    <div className="job-list-detail">{job.unitCode || '-'}</div>
                                                </div>
                                                <div className="job-list-detail-container">
                                                    <div className="job-list-label">Work Order</div>
                                                    <div className="job-list-detail">{job.woNumber || '-'}</div>
                                                </div>
                                            </div>
                                            <div className="yellow-line" />
                                            <div className="job-list-row">
                                                <div className="job-list-detail-container">
                                                    <div className="job-list-label">Job Type</div>
                                                    <div className="job-list-detail">{job.jobType === 'INS' ? 'Periodic Inspection' : job.jobType}</div>
                                                </div>
                                                <div className="job-list-detail-container">
                                                    <div className="job-list-label">Plan Execution</div>
                                                    <div className="job-list-detail">{job.plantExecution ? this.datePlant(job.plantExecution) : '-'}</div>
                                                </div>
                                            </div>
                                            <div className="job-list-row">
                                                <div className="job-list-detail-container">
                                                    <div className="job-list-label">Customer</div>
                                                    <div className="job-list-detail">{job.customer || '-'}</div>
                                                </div>
                                            </div>
                                            <div className="job-list-row">
                                                <div className="job-list-detail-container">
                                                    <div className="job-list-label">Backlog Open</div>
                                                    <div className="job-list-detail">{job.openBacklog || '-'}</div>
                                                </div>
                                                <div className="job-list-detail-container">
                                                    <div className="job-list-label">Status</div>
                                                    <div className="job-list-detail">{job.status || '-'}</div>
                                                </div>
                                                <div className="job-list-detail-container">
                                                    <div className="job-list-label">Staging</div>
                                                    <div className="job-list-detail">{job.staging || '-'}</div>
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
            <Table classes={{ root: 'table' }}>
                <TableHead className="table-head" classes={{ root: 'table-head' }}>
                    <TableRow>
                        <TableCell padding="checkbox"></TableCell>
                        <JobListHeader
                            name="UNIT MODEL"
                            isActive={this.props.sortJobsByState.unitModel.isActive}
                            delay={300}
                            isAscending={this.props.sortJobsByState.unitModel.isAscending}
                            onClick={() => this.props.onClickTabHead(SortJobsByUnitModel)} />
                        <JobListHeader
                            name="UNIT CODE"
                            isActive={this.props.sortJobsByState.unitCode.isActive}
                            delay={300}
                            isAscending={this.props.sortJobsByState.unitCode.isAscending}
                            onClick={() => this.props.onClickTabHead(SortJobsByUnitCode)} />
                        <JobListHeader
                            name="JOB TYPE"
                            isActive={this.props.sortJobsByState.jobType.isActive}
                            delay={300}
                            isAscending={this.props.sortJobsByState.jobType.isAscending}
                            onClick={() => this.props.onClickTabHead(SortJobsByJobType)} />
                        <JobListHeader
                            name="WORK ORDER"
                            isActive={this.props.sortJobsByState.workOrder.isActive}
                            delay={300}
                            isAscending={this.props.sortJobsByState.workOrder.isAscending}
                            onClick={() => this.props.onClickTabHead(SortJobsByWorkOrder)} />
                        <JobListHeader
                            name="CUSTOMER"
                            isActive={this.props.sortJobsByState.customer.isActive}
                            delay={300}
                            isAscending={this.props.sortJobsByState.customer.isAscending}
                            onClick={() => this.props.onClickTabHead(SortJobsByCustomer)} />
                        <JobListHeader
                            name="BACKLOG OPEN"
                            isActive={this.props.sortJobsByState.backlogOpen.isActive}
                            delay={300}
                            isAscending={this.props.sortJobsByState.backlogOpen.isAscending}
                            onClick={() => this.props.onClickTabHead(SortJobsByBacklogOpen)} />
                        <JobListHeader
                            name="PLAN EXECUTION"
                            isActive={this.props.sortJobsByState.plantExecution.isActive}
                            delay={300}
                            isAscending={this.props.sortJobsByState.plantExecution.isAscending}
                            onClick={() => this.props.onClickTabHead(SortJobsByPlantExecution)} />
                        <JobListHeader
                            name="STATUS"
                            isActive={this.props.sortJobsByState.status.isActive}
                            delay={300}
                            isAscending={this.props.sortJobsByState.status.isAscending}
                            onClick={() => this.props.onClickTabHead(SortJobsByStatus)} />
                        <JobListHeader
                            name="STAGING"
                            isActive={this.props.sortJobsByState.staging.isActive}
                            delay={300}
                            isAscending={this.props.sortJobsByState.staging.isAscending}
                            onClick={() => this.props.onClickTabHead(SortJobsByStaging)} />
                    </TableRow>
                </TableHead>
                <TableBody classes={{ root: 'table-body' }}>
                    {this.props.jobList &&
                        this.props.jobList.map((row, index) => (
                            <TableRow key={index} classes={{ root: "table-row" }}>
                                <TableCell padding="checkbox">
                                    { this.props.displayCheckbox && <Checkbox disabled={this.isCheckboxAvailable(row)} checked={this.props.selectedJobList.some(jobs => jobs.woNumber === row.woNumber)} onClick={() => this.props.onChoosed(row)} classes={{ checked: "checkbox-checked" }} /> }
                                </TableCell>
                                <TableCell onClick={() => this.openDetail(row)} align="left" className="table-cell">{row.unitModel || '-'}</TableCell>
                                <TableCell onClick={() => this.openDetail(row)} align="left" className="table-cell">{row.unitCode || '-'}</TableCell>
                                <TableCell onClick={() => this.openDetail(row)} align="left" className="table-cell">{row.jobType || '-'}</TableCell>
                                <TableCell onClick={() => this.openDetail(row)} align="left" className="table-cell">{row.woNumber || '-'}</TableCell>
                                <TableCell onClick={() => this.openDetail(row)} align="left" className="table-cell">{row.customer || '-'}</TableCell>
                                <TableCell onClick={() => this.openDetail(row)} align="left" className="table-cell">{row.openBacklog || '-'}</TableCell>
                                <TableCell onClick={() => this.openDetail(row)} align="left" className="table-cell">{row.plantExecution ? this.datePlant(row.plantExecution) : '-'}</TableCell>
                                <TableCell onClick={() => this.openDetail(row)} align="left" className="table-cell">{row.status || '-'}</TableCell>
                                <TableCell onClick={() => this.openDetail(row)} align="left" className="table-cell">{row.staging || '-'}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        )
    }
}