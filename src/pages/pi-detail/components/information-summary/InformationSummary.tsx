import React from 'react';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { BES, BMS, PI, StagingGreen } from '../../../../assets/icons';
import { BacklogEntrySheetList } from '../backlog-entry-sheet-list/BacklogEntrySheetList';
import { InformationSummaryProps, InformationSummaryState } from './InformationSummary.model';
import './InformationSummary.scss';

export class InformationSummary extends React.PureComponent<InformationSummaryProps, InformationSummaryState>{

    state: InformationSummaryState = {
        isExpanded: true,
        isShowBes: false
    }

    handleOnClicked = async() => {
        this.props.updateBacklogParameter({...this.props.backlogParameter, currentPage: 1, showBMS: true, showBES: false}) ;
        this.setState({ isShowBes: true })
    }

    render() {
        return (
            <div className="summary-info-container">
                <ExpansionPanel defaultExpanded classes={{ root: 'summary-info-expand' }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMore className="expand-icon" />}
                        classes={{
                            expanded: 'summary-info-header-icon',
                            root: 'summary-info-header-expanded',
                            content: 'summary-info-header-expanded'
                        }}
                        onClick={() => this.setState({ isExpanded: !this.state.isExpanded })} >
                        <p className="summary-info-title">Information Summary</p>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails classes={{ root: 'summary-info-expanded' }}>
                        <div className="summary-info-detail">
                            <div className="summary-info-item-container">
                                <p className="summary-info-item-title">Periodic Inspection</p>
                                <div className="summary-info-item">
                                    <div className="summary-info-item-icon-container" onClick={this.props.onClickPiForm} >
                                        <img src={`${PI}`} alt="periodic inspection" className="summary-info-item-icon"/>
                                        {
                                            this.state.isExpanded &&
                                            <img src={`${StagingGreen}`} alt="checked" className="summary-info-item-icon-checked" />
                                        }
                                    </div>
                                    <div className="summary-info-item-detail-container">
                                        <p><span className="green">{this.props.piAnswers.goodCondition}  Item</span> in Good Condition</p>
                                        <p><span className="red">{this.props.piAnswers.badCondition}  Item</span> in Bad Condition</p>
                                        <p><span className="yellow">{this.props.piAnswers.uncheckCondition}  Item</span> in Uncheck Condition</p>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-info-item-container">
                                <p className="summary-info-item-title">Backlog Entry Sheet</p>
                                <div className="summary-info-item">
                                    <div className="summary-info-item-icon-container" onClick={() => {this.props.updateBacklogParameter({...this.props.backlogParameter, currentPage: 1, showBES: true, showBMS: false}); this.setState({ isShowBes: true })}}>
                                        <img src={`${BES}`} alt="periodic inspection" className="summary-info-item-icon" />
                                        {
                                            this.state.isExpanded &&
                                            <img src={`${StagingGreen}`} alt="checked" className="summary-info-item-icon-checked2" />
                                        }
                                    </div>
                                    <div className="summary-info-item-detail-container">
                                        <p><span className="red">{this.props.backlogSummary.backlogEntryPriority1}  New</span> Priority 1 Backlog</p>
                                        <p><span className="yellow">{this.props.backlogSummary.backlogEntryPriority2}  New</span> Priority 2 Backlog</p>
                                        <p><span className="green">{this.props.backlogSummary.backlogEntryPriority3}  New</span> Priority 3 Backlog</p>
                                        <p><span className="grey">{this.props.backlogSummary.backlogEntryPriority4}  New</span> Priority 4 Backlog</p>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-info-item-container">
                                <p className="summary-info-item-title">Backlog Monitoring Sheet</p>
                                <div className="summary-info-item">
                                    <div className="summary-info-item-icon-container" onClick={this.handleOnClicked}>
                                        <img src={`${BMS}`} alt="periodic inspection" className="summary-info-item-icon" />
                                        {
                                            this.state.isExpanded &&
                                            <img src={`${StagingGreen}`} alt="checked" className="summary-info-item-icon-checked3" />
                                        }
                                    </div>
                                    <div className="summary-info-item-detail-container">
                                        <p><span className="green">{this.props.backlogSummary.backlogMonitoringUpdate}  BMS</span> data update</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.isShowBes && <BacklogEntrySheetList {...this.props} isExpanded={this.state.isExpanded} />
                        }
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }
}