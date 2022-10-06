import React from 'react';
import { Button, Checkbox, List, ListItem, ListItemText } from '@material-ui/core';
import { SelectedJobs } from '..';
import { MechanicPartner, MechanicUt } from '../../../../../assets/imgs';
import { AssignMechanicInfo, MechanicListModel } from '../../JobsPage.model';
import { SelectMechanicsProps } from './SelectMechanics.model';
import { BasePathSec } from '../../../../../common/constants';
import CloseButton from '../../../../../components/close-button/CloseButton';
import './SelectMechanics.scss';

export default class SelectMechanics extends React.Component<SelectMechanicsProps> {

  state = {
    isSelectedJobsShown: true,
    isMechanicUT: false,
    isMechanicPartner: false,
  }

  renderPrimaryText(mechanic: MechanicListModel) {
    const nrp: string = mechanic.username || 'N/A'
    const name: string = `${mechanic.firstName} ${mechanic.lastName}` || 'N/A'
    return `${nrp} - ${name}`
  }

  renderSecondaryText(mechanic: MechanicListModel) {
    let info: string = 'Belum ditugaskan'
    if (mechanic.penugasan && mechanic.penugasan.length > 0 && mechanic.penugasan.some(job => job.jumlah !== 0)) {
      return info = `Sudah ditugaskan${
        mechanic.penugasan.map((job: AssignMechanicInfo) => (
          ` ${job.jumlah} ${job.jobType}`
        ))
      }`
    }
    return info
  }

  renderMechanicUT() {
    return (
      <div className="select-mechanic-ut-container">
        <img className="mechanic-ut-img" src={`${BasePathSec + MechanicUt}`} alt="Mechanic ut" />
        <p className="select-mechanic-title">Pilih Mechanic UT</p>
        <div className="ut-underline"></div>
        <div className="mechanic-list-container">
          <List>
            {this.props.mechanicList && this.props.mechanicList.map((mechanic, index) => {
              if (mechanic.mechanicUT) return (
                <ListItem key={index} className="mechanic-list" role={undefined} dense button>
                  <Checkbox onClick={() => this.props.onClick(mechanic)} classes={{ root: 'checkbox' }} />
                  <ListItemText primary={this.renderPrimaryText(mechanic)} secondary={this.renderSecondaryText(mechanic)} classes={{ primary: 'primary-label', secondary: 'secondary-label' }} />
                </ListItem>
              )
              else return <div key={index}/>
            })}
          </List>
        </div>
      </div>
    )
  }

  renderMechanicPartner() {
    return (
      <div className="select-mechanic-partner-container">
        <img className="mechanic-partner-img" src={`${BasePathSec + MechanicPartner}`} alt="Mechanic partner" />
        <p className="select-mechanic-title">Pilih Mechanic Partner</p>
        <div className="partner-underline"></div>
        <div className="mechanic-list-container">
          <List>
            {this.props.mechanicList && this.props.mechanicList.map((mechanic, index) => {
              if (mechanic.mechanicUT === false) return (
                <ListItem key={index} className="mechanic-list" role={undefined} dense button>
                  <Checkbox onClick={() => this.props.onClick(mechanic)} classes={{ root: 'checkbox' }} />
                  <ListItemText primary={this.renderPrimaryText(mechanic)} secondary={this.renderSecondaryText(mechanic)} classes={{ primary: 'primary-label', secondary: 'secondary-label' }} />
                </ListItem>
              )              
              else return <div key={index}/>
            })}
          </List>
        </div>
      </div>
    )
  }

  renderButton() {
    const isDisabled: boolean = this.props.mechanicList.length < 1 || this.props.selectedMechanics.length < 1
    return (
      <div className="buttons-row">
        <Button className="btn-cancel" onClick={this.props.onCancel}>Batal</Button>
        <Button disabled={isDisabled} className="btn-assign" onClick={this.props.onAssign}>Tugaskan</Button>
      </div>
    )
  }

  render() {
    if (this.props.displayMode === 'tab') {
      return (
        <div className="assign-mechanic-modal">
          <CloseButton onClose={this.props.onCancel}/>
          <div className="selected-jobs-segment">
            <SelectedJobs selectedJobs={this.props.selectedJobs || []} />
          </div>
          <div className="assign-mechanic-container">
            {this.renderMechanicUT()}
            <div className="vertical-line" />
            {this.renderMechanicPartner()}
          </div>
          {this.renderButton()}
        </div>
      )
    }
    if (this.props.displayMode === 'mobile') {
      return (
        <div className="assign-mechanic-modal">
          <CloseButton onClose={this.props.onCancel}/>
          <div className="assignment-titles">
            <p onClick={() => this.setState({isMechanicPartner: false, isMechanicUT: false, isSelectedJobsShown: true})} className={this.state.isSelectedJobsShown ? 'assignment-title-choosen' : 'assignment-title'}>Selected Jobs</p>
            <p onClick={() => this.setState({isMechanicPartner: false, isMechanicUT: true, isSelectedJobsShown: false})} className={this.state.isMechanicUT ? 'assignment-title-choosen' : 'assignment-title'}>Mechanic UT</p>
            <p onClick={() => this.setState({isMechanicPartner: true, isMechanicUT: false, isSelectedJobsShown: false})} className={this.state.isMechanicPartner ? 'assignment-title-choosen' : 'assignment-title'}>Mechanic Partner</p>
          </div>
          {this.state.isMechanicUT && this.renderMechanicUT()}
          {this.state.isMechanicPartner && this.renderMechanicPartner()}
          {this.state.isSelectedJobsShown &&
            <div className="selected-jobs-segment">
              <SelectedJobs selectedJobs={this.props.selectedJobs || []} />
            </div>}
          {this.renderButton()}
        </div>
      )
    }
    return (
      <div className="assign-mechanic-modal">  
      <CloseButton onClose={this.props.onCancel}/>
        <div className="assign-mechanic-container">
          <div className="selected-jobs-segment">
            <SelectedJobs selectedJobs={this.props.selectedJobs || []} />
          </div>
          <div className="left-segment">
            {this.renderMechanicUT()}
          </div>
          <div className="right-segment">
            {this.renderMechanicPartner()}
          </div>
        </div>
        {this.renderButton()}
      </div>
    )
  }
}
