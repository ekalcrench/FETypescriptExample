import React from 'react';
import moment from 'moment-timezone';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { JobAssignmentTimeLine, Star, Dot, JobAssignmentNow } from '../../../../assets/icons';
import { AssignmentSummaryProps, MechanicModel } from './JobAssignment.model';
import { ISO_8601 } from 'moment';
import './JobAssignment.scss';

export class JobAssignment extends React.PureComponent<AssignmentSummaryProps> {
    componentDidMount = () => {
        if (this.props.timezoneInfo.timezone !== moment().format('Z')) this.props.setTimezone(moment().format('Z'))
    }
    componentDidUpdate = () => {
        if (this.props.timezoneInfo.timezone !== moment().format('Z')) this.props.setTimezone(moment().format('Z'))
    }

    renderAssignment() {
        const dateAssignment = moment.utc(this.props.summary.date, ISO_8601).local().format('DD MMMM YYYY')
        const timeAssignment = moment.utc(this.props.summary.date, ISO_8601).local().format('HH:mm')
        return (
            <div className="assignment-container">
                <div className="timeline-label">
                    <p>{this.props.summary.date? dateAssignment : ''}</p>
                    <p>{this.props.summary.date? `${timeAssignment} ${this.props.timezoneInfo.indonesianTimezone}` : ''}</p>
                </div>
                <div className="timeline-icon">
                    <img src={JobAssignmentNow} alt="timeline" />
                </div>
                <div className="jobs-assignment-creator">
                    <p className="jobs-assignment-creator-title">Assignment</p>
                    <p className="jobs-assignment-creator-label">Created By</p>
                    <p className="jobs-assignment-creator-value">{this.props.summary.createdBy || 'N/A'}</p>
                    <p className="jobs-assignment-creator-label">Assigned By</p>
                    <p className="jobs-assignment-creator-value">{this.props.summary.assignedBy || 'N/A'}</p>
                </div>
                <div className="jobs-assignment-target">
                    <p className="jobs-assignment-target-label">Assigned To</p>
                    {
                        this.props.summary.mechanicLeader &&
                        <div className="jobs-assignment-target-value">
                            <img src={`${Star}`} alt="" className="img-star" />
                            &nbsp;&nbsp;&nbsp;{this.props.summary.mechanicLeader.userName || 'N/A'} - {this.props.summary.mechanicLeader.name ? this.props.summary.mechanicLeader.name.toUpperCase() : 'N/A'}
                        </div>
                    }
                    {
                        this.props.summary.mechanicList && this.props.summary.mechanicList.map((mechanic: MechanicModel, index: number) => {                  
                            return (
                                <p key={index} className="jobs-assignment-target-value"><img src={`${Dot}`} alt="list" className="img-dot" />&nbsp;&nbsp;&nbsp;{mechanic.userName || 'N/A'} - {mechanic.name.toUpperCase() || 'UNKNOWN'}</p>
                            )                  
                        })
                    }
                </div>
            </div>
        )
    }

    renderHandover() {        
        const handoverDate = moment.utc(this.props.summary.handoverDate, ISO_8601).local().format('DD MMMM YYYY')
        const handoverTime = moment.utc(this.props.summary.handoverDate, ISO_8601).local().format('HH:mm')
        return (
            <div className="handover-container">
                <div className="timeline-label">
                    <p>{this.props.summary.handoverDate? handoverDate : ''}</p>
                    <p>{this.props.summary.handoverDate? `${handoverTime} ${this.props.timezoneInfo.indonesianTimezone}` : ''}</p>
                </div>
                <div className="timeline-icon">
                    <img src={JobAssignmentTimeLine} alt="timeline" />
                </div>
                <div className="jobs-assignment-creator">
                    <p className="jobs-assignment-creator-title">Handover</p>
                    <p className="jobs-assignment-creator-label">Created By</p>
                    <p className="jobs-assignment-creator-value">{this.props.summary.handoverCreatedBy || 'N/A'}</p>
                    <p className="jobs-assignment-creator-label">Assigned By</p>
                    <p className="jobs-assignment-creator-value">{this.props.summary.handoverAssignedBy || 'N/A'}</p>
                </div>
                <div className="jobs-assignment-target">
                    <p className="jobs-assignment-target-label">Assigned To</p>
                    {
                        this.props.summary.handoverMechanicLeader &&
                        <div className="jobs-assignment-target-value">
                            <img src={`${Star}`} alt="" className="img-star" />
                            &nbsp;&nbsp;&nbsp;{this.props.summary.handoverMechanicLeader.userName || 'N/A'} - {this.props.summary.handoverMechanicLeader.name ? this.props.summary.handoverMechanicLeader.name.toUpperCase() : 'N/A'}
                        </div>
                    }
                    {
                        this.props.summary.handoverMechanicList && this.props.summary.handoverMechanicList.map((mechanic: MechanicModel, index: number) => {                  
                            return (
                                <p key={index} className="jobs-assignment-target-value"><img src={`${Dot}`} alt="list" className="img-dot" />&nbsp;&nbsp;&nbsp;{mechanic.userName || 'N/A'} - {mechanic.name.toUpperCase() || 'UNKNOWN'}</p>
                            )                  
                        })
                    }
                </div>
            </div>
        )
    }

    render() {
        return(
            <div className="job-assignment-container">
                <ExpansionPanel defaultExpanded classes={{root: 'job-assignment-expand'}}>
                    <ExpansionPanelSummary expandIcon={<ExpandMore className="expand-icon"/>} 
                        classes={{expanded: 'job-assignment-header-icon', 
                                root: 'job-assignment-header-expanded', 
                                content: 'job-assignment-header-expanded'}} >
                        <p className="job-assignment-title">Job Assignment</p>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails classes={{root:'job-assignment-detail'}}>
                        {this.renderAssignment()}
                        {this.props.summary.handoverCreatedBy && this.renderHandover()}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }
}