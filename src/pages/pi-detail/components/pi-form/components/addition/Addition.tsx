import React from 'react'
import { AdditionProps } from './Addition.model';
import { Delete } from '../../../../../../assets/icons';
import { Input } from '@material-ui/core';
import { AdditionalFluid, ZoneCheckSheetModel } from '../../PIForm.model';
import './Addition.scss'

const uuidv1 = require('uuid/v1');

export default class Addition extends React.Component<AdditionProps> {
    handleChange = (e: any, id: string, type: 'inc' | 'dec' | 'change' | 'delete') => {
        let newData: ZoneCheckSheetModel[] = this.props.piFormData.map((zone) => {
            let newAdditonal: AdditionalFluid[] = type === 'delete' ? zone.additionalFluids.filter((function (fluid) { return fluid.fluidDataId !== id })) : zone.additionalFluids.map((fluid) => {
                if (fluid.fluidDataId === id) {
                    if (type === 'inc') return { ...fluid, fluidQuantity: fluid.fluidQuantity + 0.5 }
                    else if (type === 'dec' && fluid.fluidQuantity > 0.5) return { ...fluid, fluidQuantity: fluid.fluidQuantity - 0.5 }
                    else if (type === 'change') return { ...fluid, additionalFluidName: e.target.value }
                    else return { ...fluid}
                }
                else return fluid
            })
            return { ...zone, additionalFluids: newAdditonal }
        })
        this.props.updatePIForm(newData)
    }

    handleAddFluid = () => {
        let newAdditions: AdditionalFluid[] = []
        const workOrderId: string | undefined = this.props.woId
        const zoneDesc: string | undefined = this.props.zone
        const addition: AdditionalFluid = { fluidDataId: uuidv1(), fluidQuantity: 0.5, uom: 'Litre', workOrderId: workOrderId, zoneDesc: zoneDesc, additionalFluidName: '' }
        if (this.props.additionalFluids.length < 1) newAdditions = [addition]
        else {
            this.props.additionalFluids.map((fluid) => (newAdditions = [...newAdditions, fluid]))
            newAdditions.push(addition)
        }
        let newData: ZoneCheckSheetModel[] = this.props.piFormData.map((zone) => {
            if (zone.zoneDesc === zoneDesc) return { ...zone, additionalFluids: newAdditions }
            else return zone
        })
        this.props.updatePIForm(newData)
    }

    render() {
        return (
            <div className="addition-container">
                <div className="addition-title">Addition</div>
                {
                    this.props.additionalFluids.map((fluid, index) => (
                        <div key={index} className="addition-detail">
                            <div className="fluid-description">
                                <p className="fluid-label">ADDITIONAL OF FLUID {index + 1}</p>
                                <Input onChange={(e) => this.handleChange(e, fluid.fluidDataId, 'change')} value={fluid.additionalFluidName} className="additional-input" />
                            </div>
                            <div className="fluid-quantity">
                                <p className="fluid-label">QUANTITY</p>
                                <div className="fluid-quantity-container">
                                    <div onClick={(e) => this.handleChange(e, fluid.fluidDataId, 'dec')} className="fluid-quantity-card-btn">-</div>
                                    <div className="fluid-quantity-card">{fluid.fluidQuantity}</div>
                                    <div onClick={(e) => this.handleChange(e, fluid.fluidDataId, 'inc')} className="fluid-quantity-card-btn">+</div>
                                    <img onClick={(e) => this.handleChange(e, fluid.fluidDataId, 'delete')} className="fluid-delete" alt="del" src={`${Delete}`} />
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div onClick={this.handleAddFluid} className="btn-addition">+ Other Addition</div>
            </div>
        )
    }
}