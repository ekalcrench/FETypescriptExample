import React from 'react';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Input } from '@material-ui/core';
import { ExpandMore, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { ConditionBad, ConditionGood, ConditionUnchecked, Grace100, Grace25, Grace50, Grace75, SelectedACEmpty, SelectedACHigh, SelectedACLow, SelectedHigh, SelectedLow, SelectedMedium, SelectedThickClean, SelectedThickHigh, SelectedThickMedium, SelectedViolanceHard, SelectedViolanceSoft, Warning } from '../../../../../assets/icons';
import { HorizontalLine } from '../../../../../assets/imgs';
import { ConditionCode } from '../../../../../common/constants';
import { CheckListItemProps, ChecklistProps } from './CheckListGroup.model';
import { ConditionModel, CheckSheetValueModel, ZoneCheckSheetModel, AreaCheckSheetModel } from '../PIForm.model';
import ConditionComponent from './condition-button/Conditions';
import NoteComponent from './note-button/NoteComponent';
import PriorityComponent from './priority-button/PriorityComponent';
import './CheckListGroup.scss';

class CheckListItem extends React.Component<CheckListItemProps> {
    state = {
        isExpanded: false
    }

    onDataChanged = (newCheckSheet: CheckSheetValueModel) => {
        let newData: ZoneCheckSheetModel[] = this.props.piFormData.map((zone) => {
            if (zone.zoneDesc !== this.props.checkSheetValue.zoneDesc) return zone;
            else {
                let newArea: AreaCheckSheetModel[] = []
                zone.areaCheckSheets.map((area) => {
                    if (area.area !== this.props.checkSheetValue.areaDesc) return newArea = [...newArea, area];
                    else {
                        let newValue: CheckSheetValueModel[] = []
                        area.checkSheetValue.map((value) => {
                            if (value.checkSheetValueId !== this.props.checkSheetValue.checkSheetValueId) return newValue = [...newValue, value]
                            else return  newValue = [...newValue, newCheckSheet]
                        })
                        return newArea = [...newArea, {...area, checkSheetValue: newValue}]
                    }
                })
                return {...zone, areaCheckSheets: newArea}
            }
        })
        this.props.updatePIForm(newData)
    }

    onClickCondition = (condition: ConditionModel) => { this.onDataChanged({...this.props.checkSheetValue, mCondition: condition}) }

    handleComment = (e: any) => { this.onDataChanged({...this.props.checkSheetValue, comment: e.target.value}) }

    renderIcon(conditionCode: string, measurement: string) {
        if (measurement === '0' && conditionCode === ConditionCode.GOOD) return ConditionGood
        else if (measurement === '0' && conditionCode === ConditionCode.BAD) return ConditionBad
        else if (measurement === '0' && conditionCode === ConditionCode.UNCHECK) return ConditionUnchecked
        else if (measurement === '1' && conditionCode === ConditionCode.FLUID_LOW) return SelectedLow
        else if (measurement === '1' && conditionCode === ConditionCode.FLUID_MEDIUM) return SelectedMedium
        else if (measurement === '1' && conditionCode === ConditionCode.FLUID_HIGH) return SelectedHigh
        else if (measurement === '2' && conditionCode === ConditionCode.VIOLANCE_SOFT) return SelectedViolanceSoft
        else if (measurement === '2' && conditionCode === ConditionCode.VIOLANCE_HARD) return SelectedViolanceHard
        else if (measurement === '3' && conditionCode === ConditionCode.SOIL_THICK_CLEAN) return SelectedThickClean
        else if (measurement === '3' && conditionCode === ConditionCode.SOIL_THICK_MEDIUM) return SelectedThickMedium
        else if (measurement === '3' && conditionCode === ConditionCode.SOIL_THICK_HIGH) return SelectedThickHigh
        else if (measurement === '4' && conditionCode === ConditionCode.REFRIGRERANT_EMPTY) return SelectedACEmpty
        else if (measurement === '4' && conditionCode === ConditionCode.REFRIGRERANT_LOW) return SelectedACLow
        else if (measurement === '4' && conditionCode === ConditionCode.REFRIGRERANT_HIGH) return SelectedACHigh
        else if (measurement === '5' && conditionCode === ConditionCode.GRACE25) return Grace25
        else if (measurement === '5' && conditionCode === ConditionCode.GRADE50) return Grace50
        else if (measurement === '5' && conditionCode === ConditionCode.GRACE75) return Grace75     
        else if (measurement === '5' && conditionCode === ConditionCode.GRACE100) return Grace100      
        else { return Warning}
    }

    render() {
        return (
            <div className="checklist-item-container">
                <div onClick={() => this.setState({isExpanded: !this.state.isExpanded})} className="checklist-item-header-container">
                    <p className="title">{this.props.checkSheetValue.sequence}. {this.props.checkSheetValue.itemDesc}</p> 
                    <img alt='' src={`${HorizontalLine}`} className="horizontal-line" />
                    <div className="icons">
                        <img alt='icon ' src={`${this.renderIcon(this.props.checkSheetValue.mCondition.conditionCode, this.props.checkSheetValue.measurement)}`} className="completed-icon" />
                        { this.state.isExpanded ? <KeyboardArrowUp className="arrow-icon" /> : <KeyboardArrowDown className="arrow-icon" /> }                       
                    </div>
                </div>
                {
                    this.state.isExpanded && 
                    <div className='condition-detail-container'>
                        <div className="condition-row">
                            <ConditionComponent onClickCondition={this.onClickCondition} {...this.props} measurement={this.props.checkSheetValue.measurement} mCondition={this.props.checkSheetValue.mCondition}/>
                            { this.props.checkSheetValue.mCondition.conditionCode === ConditionCode.BAD && <NoteComponent {...this.props}/> }
                            { this.props.checkSheetValue.mCondition.conditionCode === ConditionCode.BAD && <PriorityComponent {...this.props}/> }
                        </div>
                        {
                            this.props.checkSheetValue.mCondition.conditionCode === ConditionCode.BAD &&
                            <div className='condition-row'>
                                 <div className="comment-container">              
                                    <p className="btn-label">Comment</p>
                                    <Input onChange={this.handleComment} value={this.props.checkSheetValue.comment || ''} className="comment-input-form" />
                                </div>
                                <div className="backlog-container">              
                                    <p className="btn-label">Backlog</p>
                                    <div onClick={() => this.props.onBacklogClick(this.props.checkSheetValue.backlogId || '')} className={this.props.checkSheetValue.backlogId ? "btn-backlog-problems" : 'btn-backlog-null'}>{this.props.checkSheetValue.backlogId ? 'Yes' : '+'}</div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}


export default class ChecklistGroup extends React.Component<ChecklistProps> {

    render() {
        return (
            <div className="checklist-group-container">
                {
                    this.props.areaChecksheets.map((item, index) => {
                        return (
                            <ExpansionPanel key={index} classes={{ root: 'checklist-group-expand' }}>
                                <ExpansionPanelSummary expandIcon={<ExpandMore />} classes={{ expanded: 'checklist-group-header-icon', root: 'checklist-group-header-expanded', content: 'checklist-group-header-expanded' }}>
                                    <p className="checklist-group-title">{item.area}</p>
                                    <p className="checklist-group-summary">
                                        <span className="green">{item.goodCondition}</span>&nbsp;/&nbsp;
                                        <span className="red">{item.badCondition}</span>&nbsp;/&nbsp;
                                        <span className="yellow">{item.uncheckCondition}</span>
                                    </p>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails classes={{ root: 'checklist-group-detail' }}>
                                    { 
                                        item.checkSheetValue.map((item) => { return (
                                            <CheckListItem {...this.props} key={item.sequence} checkSheetValue={item} />
                                        )})
                                    }
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )
                    })
                }
            </div>
        )
    }
}