import React from 'react';
import { ACEmpty, ACHigh, ACLow, ConditionBadWhite, ConditionGoodWhite, ConditionUncheckedWhite, Grace100, Grace25, Grace50, Grace75, High, Low, Medium, ThickClean, ThickHigh, ThickMedium, ViolanceHard, ViolanceSoft, Warning, ConditionBad, ConditionGood, ConditionUnchecked } from '../../../../../../assets/icons';
import { ConditionCode } from '../../../../../../common/constants';
import { ConditionProps, Conditions, ConditionGroupsProps } from './Conditions.model';
import { Popover } from '@material-ui/core';
import './Conditions.scss'
import { ConditionModel } from '../../PIForm.model';

function renderProperties(measurement: string, conditionCode: string, conditionDesc: string): Conditions {
    if (measurement === '0' && conditionCode === ConditionCode.GOOD) return { icon: ConditionGoodWhite, desc: conditionDesc, containerClassName: 'condition-choosen-good' }
    else if (measurement === '0' && conditionCode === ConditionCode.BAD) return { icon: ConditionBadWhite, desc: conditionDesc, containerClassName: 'condition-choosen-bad' }
    else if (measurement === '0' && conditionCode === ConditionCode.UNCHECK) return { icon: ConditionUncheckedWhite, desc: conditionDesc, containerClassName: 'condition-choosen-uncheck' }
    else if (measurement === '1' && conditionCode === ConditionCode.FLUID_LOW) return { icon: Low, desc: conditionDesc, containerClassName: 'condition-choosen' }
    else if (measurement === '1' && conditionCode === ConditionCode.FLUID_MEDIUM) return { icon: Medium, desc: conditionDesc, containerClassName: 'condition-choosen' }
    else if (measurement === '1' && conditionCode === ConditionCode.FLUID_HIGH) return { icon: High, desc: conditionDesc, containerClassName: 'condition-choosen' }
    else if (measurement === '2' && conditionCode === ConditionCode.VIOLANCE_SOFT) return { icon: ViolanceSoft, desc: conditionDesc, containerClassName: 'condition-choosen' }
    else if (measurement === '2' && conditionCode === ConditionCode.VIOLANCE_HARD) return { icon: ViolanceHard, desc: conditionDesc, containerClassName: 'condition-choosen' }
    else if (measurement === '3' && conditionCode === ConditionCode.SOIL_THICK_CLEAN) return { icon: ThickClean, desc: conditionDesc, containerClassName: 'condition-choosen' }
    else if (measurement === '3' && conditionCode === ConditionCode.SOIL_THICK_MEDIUM) return { icon: ThickMedium, desc: conditionDesc, containerClassName: 'condition-choosen' }
    else if (measurement === '3' && conditionCode === ConditionCode.SOIL_THICK_HIGH) return { icon: ThickHigh, desc: conditionDesc, containerClassName: 'condition-choosen' }
    else if (measurement === '4' && conditionCode === ConditionCode.REFRIGRERANT_EMPTY) return { icon: ACEmpty, desc: conditionDesc, containerClassName: 'condition-choosen' }
    else if (measurement === '4' && conditionCode === ConditionCode.REFRIGRERANT_LOW) return { icon: ACLow, desc: conditionDesc, containerClassName: 'condition-choosen' }
    else if (measurement === '4' && conditionCode === ConditionCode.REFRIGRERANT_HIGH) return { icon: ACHigh, desc: conditionDesc, containerClassName: 'condition-choosen' }
    else if (measurement === '5' && conditionCode === ConditionCode.GRACE25) return { icon: Grace25, desc: conditionDesc, containerClassName: 'condition-choosen' }
    else if (measurement === '5' && conditionCode === ConditionCode.GRADE50) return { icon: Grace50, desc: conditionDesc, containerClassName: 'condition-choosen' }
    else if (measurement === '5' && conditionCode === ConditionCode.GRACE75) return { icon: Grace75, desc: conditionDesc, containerClassName: 'condition-choosen' }
    else if (measurement === '5' && conditionCode === ConditionCode.GRACE100) return { icon: Grace100, desc: conditionDesc, containerClassName: 'condition-choosen' }
    else { return { icon: Warning, desc: 'Unknown', containerClassName: 'condition-choosen' } }
}

class ConditionGroups extends React.PureComponent<ConditionGroupsProps> {

    renderIcon (measurement: string, conditionCode: string, conditionDesc: string): string {
        if (measurement === '0' && conditionCode === ConditionCode.GOOD) return ConditionGood
        else if (measurement === '0' && conditionCode === ConditionCode.BAD) return ConditionBad
        else if (measurement === '0' && conditionCode === ConditionCode.UNCHECK) return ConditionUnchecked
        else return renderProperties(measurement, conditionCode, conditionDesc).icon
    }

    render() {
        return (
            <Popover id="popover-group-condition" open={this.props.isOpen} anchorEl={this.props.anchorEl} onClose={this.props.onClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
                <div className='popover-group-condition'>      
                    <div className="group-condition-popover">
                        {
                            this.props.piQuestions.mCondition.map((condition, index) => {
                                if (condition.measurement === this.props.measurement) return (
                                    <div key={index} className="group-condition-group" onClick={() => this.props.onClick(condition)}>
                                        <img className="group-condition-icon"  src={this.renderIcon(this.props.measurement, condition.conditionCode, condition.conditionCode)} alt=""/>
                                        <div className="group-label-level">{condition.conditionDesc}</div>
                                    </div>
                                )
                                else return <div key={index}/>
                            })
                        }
                    </div>
                </div>

            </Popover>
        )
    }
}

export default class ConditionComponent extends React.PureComponent<ConditionProps> {
    state = {
        showConditions: false,
        anchorEl: null
    }

    handleClose = () => { this.setState({ anchorEl: null, showConditions: false }) }
    handleClick = (e: any) => { this.setState({ anchorEl: e.currentTarget, showConditions: true }) }
    handleConditionClick = (condition: ConditionModel) => {
        this.setState({showConditions: false})
        this.props.onClickCondition(condition)
    }

    render() {
        const condition: Conditions = renderProperties(this.props.measurement, this.props.mCondition.conditionCode, this.props.mCondition.conditionDesc)
        return (
            <div className="popover-container">              
                <p className="btn-label">Condition</p>
                <div className="condition-popover">
                    <div onClick={this.handleClick} className={condition.containerClassName}>
                        <img src={`${condition.icon}`} className="condition-icon" alt="icon " />
                        <div className="label-level">{condition.desc}</div>
                    </div>
                </div>
                <ConditionGroups {...this.props} onClick={this.handleConditionClick} isOpen={this.state.showConditions} anchorEl={this.state.anchorEl} onClose={this.handleClose} />
            </div>
        )
    }
}