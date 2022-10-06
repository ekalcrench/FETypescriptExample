import React from 'react';
import moment, { ISO_8601 } from 'moment';
import CloseButton from '../../../../components/close-button/CloseButton';
import { ProgressExecutionGreen, ProgressExecutionYellow, ProgressReportingGreen, ProgressReportingYellow, ProgressStartGreen, ProgressStartYellow, ProgressTravelingGreen, ProgressTravelingYellow, ProgressWaitingGreen, ProgressWaitingYellow, StagingLineGreen, StagingLineYellow, StagingVerticalLineGreen, StagingVerticalLineYellow } from '../../../../assets/icons';
import { StagingInfoModel } from '../../PiDetailPage.model';
import { JobInProgressDetailProps, ShiftCardProps, StagingDetail } from './JobInProgressDetail.model';
import { BasePathProv } from '../../../../common/constants';
import './JobInprogressDetail.scss';

export class JobInprogressDetail extends React.PureComponent<JobInProgressDetailProps>{
    renderShift(stageDetails: StagingInfoModel[]) {
        return (
            <div className="shift-details-row">
                {
                    stageDetails.map((stage: StagingInfoModel, index) => {
                        if (stage.sequence !== stageDetails.length) { return <ShiftDetailCard key={index} stage={stage} status="completed" /> }
                        else { return <ShiftDetailCard key={index} status="not yet" stage={stage} /> }
                    })
                }
            </div>
        )
    }

    renderIcon(stage: StagingInfoModel): StagingDetail {
        if (stage.sequence === 1 && stage.enddate) return { icon: ProgressStartGreen, iconClassName: "icon-progress-complete", className: "waiting-to-start", stagingLine: StagingLineGreen, stagingLineTab: StagingVerticalLineGreen }
        else if (stage.sequence === 1 && !stage.enddate) return { icon: ProgressStartYellow, iconClassName: "icon-progress-current", className: "waiting-to-start", stagingLine: StagingLineYellow, stagingLineTab: StagingVerticalLineYellow }
        else if (stage.sequence === 2 && stage.enddate) return { icon: ProgressTravelingGreen, iconClassName: "icon-progress-complete", className: "waiting-to-start", stagingLine: StagingLineGreen, stagingLineTab: StagingVerticalLineGreen }
        else if (stage.sequence === 2 && !stage.enddate) return { icon: ProgressTravelingYellow, iconClassName: "icon-progress-current", className: "waiting-to-start", stagingLine: StagingLineYellow, stagingLineTab: StagingVerticalLineYellow }
        else if (stage.sequence === 3 && stage.enddate) return { icon: ProgressWaitingGreen, iconClassName: "icon-progress-complete", className: "waiting-to-start", stagingLine: StagingLineGreen, stagingLineTab: StagingVerticalLineGreen }
        else if (stage.sequence === 3 && !stage.enddate) return { icon: ProgressWaitingYellow, iconClassName: "icon-progress-current", className: "waiting-to-start", stagingLine: StagingLineYellow, stagingLineTab: StagingVerticalLineYellow }
        else if (stage.sequence === 4 && stage.enddate) return { icon: ProgressExecutionGreen, iconClassName: "icon-progress-complete", className: "waiting-to-start", stagingLine: StagingLineGreen, stagingLineTab: StagingVerticalLineGreen }
        else if (stage.sequence === 4 && !stage.enddate) return { icon: ProgressExecutionYellow, iconClassName: "icon-progress-current", className: "waiting-to-start", stagingLine: StagingLineYellow, stagingLineTab: StagingVerticalLineYellow }
        else if (stage.sequence === 5 && stage.enddate) return { icon: ProgressReportingGreen, iconClassName: "icon-progress-complete", className: "waiting-to-start", stagingLine: StagingLineGreen, stagingLineTab: StagingVerticalLineGreen }
        else { return { icon: ProgressReportingYellow, iconClassName: "icon-progress-current", className: "waiting-to-start", stagingLine: StagingLineYellow, stagingLineTab: StagingVerticalLineYellow } }
    }

    render() {
        let jobStaging = this.props.stagingInfo.filter((function (item) { return item.type !== "JOB" }))
        let sortJobStaging = jobStaging.sort((function (a, b) { return a.sequence - b.sequence }))
        if (this.props.displayMode !== 'web') {
            return (
                <div className="job-inprogress-detail-modal">    
                    <CloseButton onClose={this.props.onClose}/>
                    <div className="job-inprogress-content">
                        <div className="icons-column">
                            {
                                sortJobStaging.map((stage: StagingInfoModel) => (
                                    <div className="progress-container" key={stage.sequence}>
                                        <img alt="icon" src={`${BasePathProv + this.renderIcon(stage).icon}`} className="icon-progress-complete"/>
                                        <p className="execution">{stage.title}</p>
                                        {stage.sequence < sortJobStaging.length && <img alt="" src={this.renderIcon(stage).stagingLineTab} className="staging-line-1"/>}
                                    </div>
                                ))
                            }                        
                        </div>
                        {this.renderShift(sortJobStaging)}
                    </div>
                </div>
            )
        }
        return (
            <div className="job-inprogress-detail-modal">    
                <CloseButton onClose={this.props.onClose}/>
                <div className="icons-row">
                    {
                        sortJobStaging.map((stage: StagingInfoModel, index) => (
                            <div key={index} className="progress-container">
                                {stage.sequence > 1 && <img src={`${this.renderIcon(stage).stagingLine}`} className="staging-line" alt="progress line" />}
                                <img src={`${BasePathProv + this.renderIcon(stage).icon}`} className={this.renderIcon(stage).iconClassName} alt="progress" />
                            </div>
                        ))
                    }       
                </div>
                <div className="labels-row">
                    {
                        sortJobStaging.map((stage: StagingInfoModel, index) => (
                            <p key={index} className={this.renderIcon(stage).className}>{stage.title}</p>
                        ))
                    }
                </div>
                {this.renderShift(sortJobStaging)}
            </div>
        )
    }
}

class ShiftDetailCard extends React.PureComponent<ShiftCardProps>{    
    renderShiftDetail(stage: StagingInfoModel) {
        let timezone = moment().format('Z')
        let indonesianTimezone: string = ''
        if ( timezone === '+07:00') indonesianTimezone = 'WIB'
        if ( timezone === '+08:00') indonesianTimezone = 'WITA'
        if ( timezone === '+09:00') indonesianTimezone = 'WIT'
        return (
            <div className="shifts">
                <div className="shift-detail-container">
                    <div className="label-container">
                        <p className="label-title">{stage.enddate ? `${moment.utc(stage.enddate, ISO_8601).local().format('DD.MM.YYYY')}` : '-'}&nbsp;&nbsp;</p>
                        <p>Latitude&nbsp;&nbsp;</p>
                        <p>Longitude&nbsp;&nbsp;</p>
                    </div>
                    <div className="value-container">
                        <p>{stage.enddate ? ':' : ''}&nbsp;&nbsp;{stage.enddate ? `${moment.utc(stage.enddate, ISO_8601).local().format('HH:mm')} ${indonesianTimezone}` : ''}</p>
                        <p>:&nbsp;&nbsp;{stage.latitude ? stage.latitude : 'N/A'}</p>
                        <p>:&nbsp;&nbsp;{stage.longtitude ? stage.longtitude : 'N/A'}</p>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className={this.props.status === 'completed' ? 'shift-details-container' : this.props.status === 'not yet' ? 'shift-details-container-current' : 'shift-details-container-not-yet'}>              
                {this.renderShiftDetail(this.props.stage)}
            </div>
        )
    }
}