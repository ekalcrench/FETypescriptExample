import React from 'react';
import { Button, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { SelectedJobs } from '..';
import { AssignLeader } from '../../../../../assets/imgs';
import { MechanicListModel } from '../../JobsPage.model';
import { SelectMechanicsProps } from '../select-mechanics/SelectMechanics.model';
import CloseButton from '../../../../../components/close-button/CloseButton';
import './SelectTeamLeader.scss';
import { BasePathSec } from '../../../../../common/constants';

export default class SelectTeamLeader extends React.Component<SelectMechanicsProps> {

    handleLeaderChoosen = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        let LeaderCandidate: MechanicListModel = {}
        this.props.selectedMechanics.map((mechanic) => {
            if (mechanic.username === String(event.target.value)) return LeaderCandidate = mechanic
            else return LeaderCandidate
        })
        this.props.onClick(LeaderCandidate)
    }

    renderTitle() {
        return (
            <div className="select-teamleader-header">
                <img className="assign-leader-image" src={`${BasePathSec + AssignLeader}`} alt="select team leader" />
                <p className="assign-leader-title">Penugasan Pekerjaan</p>
                <div className="assign-leader-underline"></div>
            </div>            
        )
    }

    renderSelectedJobs() {
        return (
            <div className="assign-leader-left-pane">
                <SelectedJobs selectedJobs={this.props.selectedJobs || []} />
            </div>
        )
    }

    renderSelectLeader() {
        return (
            <div className="assign-leader-right-pane">
                <div className="assign-leader-item-label">Select leader</div>
                <div className="assign-leader-item">
                    <RadioGroup aria-label="Gender" name="gender1">
                        {
                            this.props.selectedMechanics.map((mechanic: MechanicListModel, index: number) => {
                                let mechanicInfo: string = `${mechanic.username} - ${mechanic.firstName} ${mechanic.lastName}`
                                return (
                                    <FormControlLabel
                                        key={index}
                                        onChange={() => this.props.onClick(mechanic)}
                                        value={index.toString()}
                                        control={<Radio size={'small'} classes={{ root: 'radio-checked', checked: 'radio-checked' }} />}
                                        label={mechanicInfo} classes={{ root: 'assign-leader-list-item', label: 'assign-leader-list-item-label' }} />
                                )
                            })
                        }
                    </RadioGroup>
                </div>
            </div>            
        )
    }

    renderButton() {
        return (
            <div className="buttons-row">
                <Button classes={{ root: 'btn-cancel' }} onClick={this.props.onCancel}>Batal</Button>
                <Button disabled={!this.props.selectedLeader || !this.props.selectedLeader.username} classes={{ root: 'btn-assign' }} onClick={this.props.onAssign}>Tugaskan</Button>
            </div>
        )
    }

    render() {
        if (this.props.displayMode === 'mobile') {
            return (
                <div className="select-teamleader-modal">
                    <CloseButton onClose={this.props.onCancel} />
                    <div className="assign-leader-col">
                        {this.renderTitle()}
                        {this.renderSelectedJobs()}
                        {this.renderSelectLeader()}
                    </div>
                    {this.renderButton()}
                </div>
            )
        }
        return (
            <div className="select-teamleader-modal">
                <CloseButton onClose={this.props.onCancel} />
                <div className="select-teamleader-info">
                    {this.renderSelectedJobs()}
                    <div className="assign-leader-col">
                        {this.renderTitle()}
                        {this.renderSelectLeader()}
                    </div>
                </div>
                {this.renderButton()}
            </div>
        )
    }
}
