import React from 'react';
import Addition from './components/addition/Addition';
import CloseButton from '../../../../components/close-button/CloseButton';
import { Button, CircularProgress } from '@material-ui/core';
import { ChecklistGroup } from './components';
import { PIFormProps, AdditionalFluid, CheckSheetValueModel } from './PIForm.model';
import { ApiRequestActionsStatus } from '../../../../core/rest-client-helpers';
import ProceedConfirmation from '../../../../components/proceed-confirmation/ProceedConfirmation';
import './PIForm.scss';

export class PIForm extends React.Component<PIFormProps> {

    state = {
        activeIndex: 0,
        isApprovalConfirmationShown: false,
        isHandoverConfirmationShown: false
    }

    componentDidMount() {
        this.props.updatePIForm(this.props.piAnswers.zoneCheckSheets)
    }
    
    handleSubmit = () => {
        let newAdditions: AdditionalFluid[] = []
        let newCheckSheetValue: CheckSheetValueModel[] = []
        this.props.piFormData.map((data) => {
            data.additionalFluids.map((fluid) => (newAdditions = [...newAdditions, fluid]))
            data.areaCheckSheets.map((area) => (
                area.checkSheetValue.map((value) => (newCheckSheetValue = [...newCheckSheetValue, value]))
            ))
            return data
        })
        return this.props.submitPI({additionalFluids: newAdditions, checkSheetValueDTOs: newCheckSheetValue}, this.props.token)
    }

    handleApproval = async() => {
        this.setState({isApprovalConfirmationShown: false})
        this.props.unhandover(this.props.identity.workOrderId || '', this.props.token)
        await this.handleSubmit()
        if (this.props.unhandoverStatus.status === ApiRequestActionsStatus.SUCCEEDED) await this.props.approvePI(this.props.identity.workOrderId || '', this.props.token)
    }
    
    handleHandover = async() => {
        this.setState({isHandoverConfirmationShown: false})
        await this.handleSubmit()
        this.props.handover(this.props.identity.workOrderId || '', this.props.token)
    }

    render() {
        const isLoading: boolean = this.props.handoverStatus.status === ApiRequestActionsStatus.LOADING || this.props.unhandoverStatus.status === ApiRequestActionsStatus.LOADING || this.props.piSubmissions.status === ApiRequestActionsStatus.LOADING || this.props.piApprovalStatus === ApiRequestActionsStatus.LOADING
        return (
            <div className="pi-form-modal"> 
                { isLoading && <CircularProgress size={100} className='circular-progress'/>}
                <CloseButton onClose={this.props.onClose}/>
                <div className="title-container">
                    <p className="title">Periodic Inspection</p>
                </div>
                <div className="zone-row">
                    {this.props.piAnswers.zoneCheckSheets.map((zone, index) => (
                        <Button key={index} className={this.state.activeIndex === index ? 'zone-active' : 'zone'} onClick={() => this.setState({activeIndex: index})}>
                            {zone.zoneDesc.slice(0,6)}
                        </Button>                            
                    ))}                
                </div>
                <div style={{overflowY: 'scroll'}}>
                    {
                        this.props.piFormData.map((zone, index) => {
                            if (this.state.activeIndex === index) {
                                return (
                                    <div key={index}>
                                        <ChecklistGroup {...this.props} areaChecksheets={zone.areaCheckSheets}/>
                                        <Addition {...this.props} woId={this.props.identity.workOrderId || undefined} zone={zone.zoneDesc} additionalFluids={zone.additionalFluids}/>
                                    </div>
                                )
                            }
                            else return <div key={index}/>
                        })
                    }
                </div>
                {this.props.identity.isHandover && !this.props.identity.supervisorApprovalDate && <p className="request-handover">Your mechanic requested a handover permissions</p>}
                <div className="btn-approve-container">
                    {!this.props.identity.supervisorApprovalDate && <div onClick={() => this.setState({isHandoverConfirmationShown: true})} className="btn-submit">Handover</div>}
                    <div onClick={() => this.setState({isApprovalConfirmationShown: true})} className="btn-approve">Approve</div>
                </div>
                <ProceedConfirmation openModal={this.state.isApprovalConfirmationShown} onClose={() => this.setState({isApprovalConfirmationShown: false})} onProceed={this.handleApproval} />
                <ProceedConfirmation openModal={this.state.isHandoverConfirmationShown} onClose={() => this.setState({isHandoverConfirmationShown: false})} onProceed={this.handleHandover} />
            </div>
        );
    }
}