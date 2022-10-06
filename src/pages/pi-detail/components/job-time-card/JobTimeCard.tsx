import React from 'react';
import moment, { ISO_8601 } from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { Card, Input } from '@material-ui/core';
import { EquipmentProps, EquipmentComponentState } from './JobTimeCard.model';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import ConfirmationModal from '../../../../components/confirmation-modal/ConfirmationModal';
import './JobTimeCard.scss';

export class JobTimeIdentity extends React.PureComponent<EquipmentProps, EquipmentComponentState> {    
    state: EquipmentComponentState = {
        dateEnd: new Date(),
        timeEnd: new Date(),
        isError: false,
        errorMsg: '',
    }

    handleSmrChanged = (e: any) => { this.props.updateEquipment({...this.props.equipmentValue, smr: e.target.value }) }    
    handleKmChanged = (e: any) => { this.props.updateEquipment({...this.props.equipmentValue, km: e.target.value }) }
    handleHmTravelChanged = (e: any) => { this.props.updateEquipment({...this.props.equipmentValue, hmTravel: e.target.value }) }
    handleLocationChanged = (e: any) => { this.props.updateEquipment({...this.props.equipmentValue, location: e.target.value }) }
   
    handleDateChange = (date: any) => { this.setState({dateEnd: date}); }
    handleTimeChange = (time: any) => { this.setState({timeEnd: time}); }

    handleSubmit = () => {
        if (this.props.equipmentValue.downTimeEnd && this.props.equipmentValue.downTimeStart && this.props.equipmentValue.downTimeEnd < this.props.equipmentValue.downTimeStart) return this.setState({isError: true, errorMsg: 'Down time end should be larger than down time start', dateEnd: new Date(), timeEnd: new Date()})
        if (this.props.equipmentValue.downTimeEnd && moment.utc(this.props.equipmentValue.downTimeEnd, ISO_8601).local().format() > moment().format()) return this.setState({isError: true, errorMsg: 'Down time end should not be larger than now', dateEnd: new Date(), timeEnd: new Date()})
        if (this.props.equipmentValue.smr && this.props.identity.lastSMR && this.props.equipmentValue.smr > this.props.identity.lastSMR + 52) this.setState({isError: true, errorMsg: 'SMR exceeds the Limit',})
        else return this.props.submitEquipment(this.props.equipmentValue, this.props.token)
    }

    componentDidUpdate = (prevProps: EquipmentProps, prevState: EquipmentComponentState) => {
        if (prevState !== this.state) {
            let newDate = moment.parseZone(this.state.dateEnd).utc().format('YYYY-MM-DD')
            let newTime = moment.parseZone(this.state.timeEnd).utc().format('HH:mm:ss')
            let newEnd = moment.utc(newDate + ' ' + newTime).format()
            return this.props.updateEquipment({...this.props.equipmentValue, downTimeEnd: newEnd})
        }
    }
    
    render() {
        return (
            <Card className="job-time-card">
                <ConfirmationModal onClose={() => this.setState({isError: false})} openModal={this.state.isError} isSuccess={false} errorMsg={this.state.errorMsg}/>
                <div className="color-line"></div>
                <div className="job-card-content">
                    <div className="job-card-title-row">
                        <p className="job-card-title">WAKTU PEKERJAAN</p>
                        {
                            this.props.identity.status === 'Need Approval' &&
                            <div onClick={this.handleSubmit} className="job-card-badge-container">
                                <p className="job-card-badge">Simpan</p>
                            </div>
                        }
                    </div>
                    <div className="job-card-detail-container">
                        <div className="job-card-detail-left">
                            <p className="job-card-detail-label">Down TIme Start Date</p>
                            <p className="job-card-detail-text">{this.props.equipmentValue.downTimeStart ? moment.utc(this.props.equipmentValue.downTimeStart, ISO_8601).local().format('DD MMMM YYYY') : '-'}</p>
                            <p className="job-card-detail-label">Down Time Start Hour</p>
                            <p className="job-card-detail-text">{this.props.equipmentValue.downTimeStart ? moment.utc(this.props.equipmentValue.downTimeStart, ISO_8601).local().format('HH:mm') : '-'}</p>
                        </div>
                        <div className="job-card-detail-right">
                            <div className="date-container">
                                <p className="job-card-detail-label">Down Time End Date</p>
                                {
                                    this.props.identity.status === 'Need Approval' &&
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker KeyboardButtonProps={{classes: {label: 'pickers-icon'}}} error={false} margin="none" id="mui-pickers-date" value={this.state.dateEnd} onChange={this.handleDateChange} InputProps={{disableUnderline: true, classes: {root: 'date-pickers', input: 'input-picker'}}}/>
                                    </MuiPickersUtilsProvider>
                                }
                            </div>
                            <p className="job-card-detail-text">{this.props.equipmentValue.downTimeEnd ? moment.utc(this.props.equipmentValue.downTimeEnd, ISO_8601).local().format('DD MMMM YYYY') : '-'}</p> 
                            <div className="date-container">
                                <p className="job-card-detail-label">Down Time End Hour</p>         
                                {
                                    this.props.identity.status === 'Need Approval' &&
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardTimePicker KeyboardButtonProps={{className: 'pickers-icon'}} error={false} margin="none" id="mui-pickers-date" value={this.state.timeEnd} onChange={this.handleTimeChange} InputProps={{disableUnderline: true, classes: {root: 'date-pickers', input: 'input-picker'}}}/>
                                    </MuiPickersUtilsProvider>
                                }
                            </div>                   
                            <p className="job-card-detail-text">{this.props.equipmentValue.downTimeEnd ? moment.utc(this.props.equipmentValue.downTimeEnd, ISO_8601).local().format('HH:mm') : '-'}</p>
                        </div>
                    </div>
                    <div className="job-card-detail-container">
                        <div className='job-card-detail-buttom'>
                            <p className="job-card-detail-label">SMR</p>
                            {
                                this.props.identity.status !== 'Need Approval' ? 
                                <p className="job-card-detail-text">{this.props.equipmentValue.smr || '-'}</p> :
                                <Input onChange={this.handleSmrChanged} value={this.props.equipmentValue.smr || ''} className="job-card-input-form" />
                            }
                        </div>
                        <div className='job-card-detail-buttom'>
                            <p className="job-card-detail-label">KM</p>
                            {
                                this.props.identity.status !== 'Need Approval' ? 
                                <p className="job-card-detail-text">{this.props.equipmentValue.km || '-'}</p> :
                                <Input onChange={this.handleKmChanged} value={this.props.equipmentValue.km || ''} className="job-card-input-form" />
                            }
                        </div>
                        <div className='job-card-detail-buttom'>
                            <p className="job-card-detail-label">HM Travel</p>
                            {
                                this.props.identity.status !== 'Need Approval' ? 
                                <p className="job-card-detail-text">{this.props.equipmentValue.hmTravel || '-'}</p>:
                                <Input onChange={this.handleHmTravelChanged} value={this.props.equipmentValue.hmTravel || ''} className="job-card-input-form" />
                            }
                        </div>
                        <div className='job-card-detail-buttom'>
                            <p className="job-card-detail-label">Location</p>
                            {
                                this.props.identity.status !== 'Need Approval' ? 
                                <p className="job-card-detail-text">{this.props.equipmentValue.location || '-'}</p> :
                                <Input onChange={this.handleLocationChanged} value={this.props.equipmentValue.location || ''} className="job-card-input-form" />
                            }
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}