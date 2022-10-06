import React from 'react';
import moment, { ISO_8601 }  from 'moment';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { StagingGreen, StagingLineGreen, StagingLineYellow, StagingYellow } from '../../../../assets/icons';
import { StagingInfoModel } from '../../PiDetailPage.model';
import { JobsStagingDetailProps, JobStagingProps } from './JobStaging.model';
import './JobStaging.scss';

class JobsStagingDetail extends React.PureComponent<JobsStagingDetailProps> {
    render() {
        return (
            <div className="staging-group">
                <img className="staging-icon" src={`${this.props.icon}`} alt="staging" />
                <p className="staging-group-title">{this.props.info.title}</p>
                {
                    this.props.info.sequence === 3 ? <a href="#/" className="staging-group-detail" onClick={this.props.onClick}>See Detail</a> :
                    this.props.displayMode === 'web' ? <p className="staging-group-timestamp">{this.props.info.enddate ? `${moment.utc(this.props.info.enddate, ISO_8601).local().format('DD.MM.YYYY HH:mm')}` : ''}</p> : 
                    this.props.displayMode !== 'web' &&
                    <div className="staging-timestamp">
                        <p className="staging-group-timestamp">{this.props.info.enddate ? `${moment.utc(this.props.info.enddate, ISO_8601).local().format('DD.MM.YYYY')}` : ''}</p>
                        <p className="staging-group-timestamp">{this.props.info.enddate ? `${moment.utc(this.props.info.enddate, ISO_8601).local().format('HH:mm')} ${this.props.timezoneInfo.indonesianTimezone}` : ''}</p>
                    </div>
                }
            </div>
        )
    }
}

class JobStaging extends React.PureComponent<JobStagingProps> {
    state = {
        showLine: true
    }

    componentDidMount = () => {
        if (this.props.timezoneInfo.timezone !== moment().format('Z')) this.props.setTimezone(moment().format('Z'))
    }

    render() {
        let jobStaging = this.props.stagingInfo.filter((function (item) { return item.type === "JOB" }))
        let sortJobStaging = jobStaging.sort((function (a, b) { return a.sequence - b.sequence }))
        return (
            <div className="staging-container">
                <ExpansionPanel defaultExpanded classes={{ root: 'staging-expand' }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMore className="expand-icon" />}
                        classes={{
                            expanded: 'staging-header-icon',
                            root: 'staging-header-expanded',
                            content: 'staging-header-expanded'
                        }}
                        onClick={() => this.setState({ showLine: !this.state.showLine })} >
                        <p className="staging-title">Job Staging</p>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails classes={{ root: 'staging-detail' }}>
                        {sortJobStaging.map((info: StagingInfoModel) => (
                            <div className="staging-detail-container" key={info.sequence}>
                                <JobsStagingDetail {...this.props} onClick={this.props.onClick} icon={!info.enddate ? StagingYellow : StagingGreen} displayMode={this.props.displayMode || 'web'} info={info} />
                                {info.sequence === 2 && <img className="staging-line1" src={`${!info.enddate ? StagingLineYellow : StagingLineGreen}`} alt="" />}
                                {info.sequence === 3 && <img className="staging-line2" src={`${!info.enddate ? StagingLineYellow : StagingLineGreen}`} alt="" />}
                                {info.sequence === 4 && <img className="staging-line3" src={`${!info.enddate ? StagingLineYellow : StagingLineGreen}`} alt="" />}
                                {info.sequence === 5 && <img className="staging-line4" src={`${!info.enddate ? StagingLineYellow : StagingLineGreen}`} alt="" />}
                            </div>
                        ))}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }
}

export { JobStaging };

