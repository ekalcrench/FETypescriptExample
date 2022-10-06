import React from 'react';
import { PriorityProps, PriorityStyle } from './PriorityComponent.model';
import { PriorityCode } from '../../../../../../common/constants';
import './PriorityComponent.scss'

function renderPriorityStyle(code: string): PriorityStyle {
    if (code === PriorityCode.NOW) return {textStyle: 'priority-red-text'}
    if (code === PriorityCode.NEXT_SHIFT) return {textStyle: 'priority-yellow-text'}
    if (code === PriorityCode.NEXT_PS) return {textStyle: 'priority-green-text'}
    else return {textStyle: 'priority-black-text'}
}

export default class PriorityComponent extends React.PureComponent<PriorityProps> {
    state = {
        showNote: false,
        anchorEl: null
    }

    render() {
        return (
            <div className="priority-container">              
                <p className="btn-label">Priority</p>
                <div className="btn-priority-problems">
                    <div className={renderPriorityStyle(this.props.checkSheetValue.mPriority.priorityCode).textStyle}>Priority {this.props.checkSheetValue.mPriority.priorityCode}</div>
                </div>
            </div>
        )
    }
}