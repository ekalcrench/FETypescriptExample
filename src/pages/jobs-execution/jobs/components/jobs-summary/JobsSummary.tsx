import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { JobsSummaryProps } from './JobsSummary.model';
import './JobsSummary.scss';

class JobsSummary extends React.PureComponent<JobsSummaryProps>{
    renderUnassign() {
        return (
            <div className="todo">
                <div className="column-title"><p>Belum Ditugaskan</p></div>
                <p className="todo-total">{this.props.data.todo < 10 ? '0' + this.props.data.todo : this.props.data.todo}</p>
            </div>
        )
    }

    renderHandover() {
        return (
            <div className="handover">
                <div className="column-title"><p>Handover</p></div>
                <p className="handover-total">{this.props.data.handover < 10 ? '0' + this.props.data.handover : this.props.data.handover}</p>
            </div>
        )
    }

    renderTotal() {
        return (
            <div className="total">
                <p className="card-content-title">{this.props.data.title}</p>
                <p className="card-content-total">{this.props.data.total === 0 ? '00' : this.props.data.total}</p>
            </div>
        )
    }

    render() {
        if (this.props.displayMode === 'mobile') {
            return (
                <Card className="card-container">
                    <CardContent className="card-content">
                        {this.renderTotal()}
                        <div className="vertical-line"></div>
                        <div className="card-content-detail-col">
                            {this.renderUnassign()}
                            {this.renderHandover()}
                        </div>
                    </CardContent>
                </Card>
            )
        }
        return (
            <Card className="card-container">
                <CardContent className="card-content">
                    {this.renderTotal()}
                    <div className="card-content-detail-row">
                        {this.renderUnassign()}
                        <div className="divider-container">
                            <div className="vertical-line"></div>
                        </div>
                        {this.renderHandover()}
                    </div>
                </CardContent>
            </Card>
        )
    }
}

export default JobsSummary;