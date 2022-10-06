import React from 'react';
import { Card } from '@material-ui/core';
import { JobsDataModel } from '../../../jobs-execution/jobs/JobsPage.model';
import './JobIdentity.scss';

interface JobIdentityProps {
    jobIdentity: JobsDataModel
}

export class JobIdentity extends React.PureComponent<JobIdentityProps>{
    render() {
        return(
            <Card className="job-card">
                <div className="color-line"></div>
                <div className="job-card-content">
                    <div className="job-card-title-row">
                        <p className="job-card-title">IDENTITAS PEKERJAAN</p>                        
                    </div>
                    <div className="job-card-detail-container">
                        <div className="job-card-detail-left">
                            <p className="job-card-detail-label">Work Order</p>
                            <p className="job-card-detail-text">{this.props.jobIdentity.woNumber || 'N/A'}</p>
                            <p className="job-card-detail-label">Job Type</p>
                            <p className="job-card-detail-text">{this.props.jobIdentity.jobType || 'N/A'}</p>
                            <p className="job-card-detail-label">Job Description</p>
                            <p className="job-card-detail-text">{this.props.jobIdentity.jobType || 'N/A'}</p>
                        </div>
                        <div className="job-card-detail-right">
                            <p className="job-card-detail-label">Branch/Site</p>
                            <p className="job-card-detail-text">{this.props.jobIdentity.plant || 'N/A'}</p>
                            <p className="job-card-detail-label">Work Center</p>                        
                            <p className="job-card-detail-text">{this.props.jobIdentity.workCenter || 'N/A'}</p>
                            <p className="job-card-detail-label">Customer Name</p>
                            <p className="job-card-detail-text">{this.props.jobIdentity.customer || '-'}</p>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}