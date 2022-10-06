import moment, { ISO_8601 }  from 'moment';
import React from 'react';
import CloseButton from '../../../../components/close-button/CloseButton';
import { BacklogDetailProps } from './BacklogDetail.model';
import './BacklogDetail.scss';

export class BacklogDetail extends React.PureComponent<BacklogDetailProps> {
    render() {
        const detail = this.props.backlogDetail
        return (
            <div className="backlog-detail-modal">
                <CloseButton onClose={this.props.onClick}/>
                <div className="backlog-detail-header">
                    <div className="backlog-detail-header-item">
                        <p className="backlog-detail-header-item-label">Created Date</p>
                        <p className="backlog-detail-header-item-value">{detail.backlogCreatedDate ? moment.utc(detail.backlogCreatedDate, ISO_8601).local().format('DD MMMM YYYY') : '-'}</p>
                    </div>
                    <div className="backlog-detail-header-item">
                        <p className="backlog-detail-header-item-label">Created By</p>
                        <p className="backlog-detail-header-item-value">{detail.backlogCreatedBy || '-'}</p>
                    </div>
                    <div className="backlog-detail-header-item">
                        <p className="backlog-detail-header-item-label">Approved By</p>
                        <p className="backlog-detail-header-item-value">{detail.superVisorApproveBy || '-'}</p>
                    </div>
                </div>
                <div className="backlog-detail-table-header">
                    <p className="backlog-detail-table-title-number">Part Number</p>
                    <p className="backlog-detail-table-title-desc">Part Description</p>
                    <p className="backlog-detail-table-title-qty">Qty</p>
                </div>
                <div className="backlog-detail-table-content">
                    {
                        detail.partRequirements ? detail.partRequirements.map((part, index) => (
                            <div key={index} className="backlog-detail-table-row">
                                <p className="backlog-detail-table-cell-number">{part.partNumber}</p>
                                <p className="backlog-detail-table-cell-desc">{part.partDescription}</p>
                                <p className="backlog-detail-table-cell-qty">{part.quantity}</p>
                            </div>
                        )) :
                            <div className="backlog-detail-table-row">
                                <p className="backlog-detail-table-cell-number">-</p>
                                <p className="backlog-detail-table-cell-desc">-</p>
                                <p className="backlog-detail-table-cell-qty">-</p>
                            </div>
                    }
                </div>
                <div className="images-row">
                    {
                        detail.images && detail.images.map((image, index) => (
                            <div key={index} className="img-container">
                                <img className="img-tractor" src={`${image}`} alt="tractor 1" />
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}