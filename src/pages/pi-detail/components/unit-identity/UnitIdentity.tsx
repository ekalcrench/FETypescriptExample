import React from 'react';
import moment, { ISO_8601 }  from 'moment'
import { Card } from '@material-ui/core';
import { JobsDataModel } from '../../../jobs-execution/jobs/JobsPage.model';
import './UnitIdentity.scss';

interface UnitIdentityProps {
    unitIdentity: JobsDataModel
}

export class UnitIdentity extends React.PureComponent<UnitIdentityProps>{    
    render() {
        let smrDate: string = moment.utc(this.props.unitIdentity.smrLastValueDate, ISO_8601).local().format('DD MM YYYY')
        return(
            <Card className="unit-card">
                <div className="color-line"></div>
                <div className="unit-card-content">
                    <p className="unit-card-title">IDENTITAS UNIT</p>
                    <div className="unit-card-detail-container">
                        <div className="unit-card-detail-left">
                            <p className="unit-card-detail-label">Unit Model</p>
                            <p className="unit-card-detail-text">{this.props.unitIdentity.unitModel && this.props.unitIdentity.unitModel !== ' ' ? this.props.unitIdentity.unitModel :  'N/A'}</p>
                            <p className="unit-card-detail-label">Unit Code</p>
                            <p className="unit-card-detail-text">{this.props.unitIdentity.unitCode && this.props.unitIdentity.unitCode !== ' ' ? this.props.unitIdentity.unitCode : 'N/A'}</p>
                            <p className="unit-card-detail-label">Unit Serial Number</p>
                            <p className="unit-card-detail-text">{this.props.unitIdentity.unitSerialNumber && this.props.unitIdentity.unitSerialNumber !== ' ' ? this.props.unitIdentity.unitSerialNumber : 'N/A'}</p>
                        </div>
                        <div className="unit-card-detail-right">
                            <p className="unit-card-detail-label">Engine Model</p>
                            <p className="unit-card-detail-text">{this.props.unitIdentity.engineModel && this.props.unitIdentity.engineModel !== ' ' ? this.props.unitIdentity.engineModel : 'N/A'}</p>
                            <p className="unit-card-detail-label">Engine Serial Number</p>
                            <p className="unit-card-detail-text">{this.props.unitIdentity.engineSerialNumber && this.props.unitIdentity.engineSerialNumber !== ' ' ? this.props.unitIdentity.engineSerialNumber : 'N/A'}</p>
                            <p className="unit-card-detail-label">SMR pada {smrDate}</p>
                            <p className="unit-card-detail-text">{this.props.unitIdentity.lastSMR || 0}</p>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}