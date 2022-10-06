import moment, { ISO_8601 } from 'moment';
import React from 'react';
import CloseButton from '../../../../components/close-button/CloseButton';
import { SearchInput } from '../../../../components/search-input/SearchInput';
import { Button, FormControl, Input, MenuItem, Select, CircularProgress, Modal, DialogContent } from '@material-ui/core';
import { Delete, Bin, CheckedGood, Warning, Pencil } from '../../../../assets/icons';
import { AddPicture, BesHand } from '../../../../assets/imgs';
import { BacklogEntrySheetDetailProps, BacklogEntrySheetState, CauseModel, DamageModel, ObjectPartModel, PartRequirementModel, ResponsibilityModel, SuggestedActionModel, SpecificObjectPartModel, PriorityModel } from './BacklogEntrySheetDetail.model';
import { BasePathProv } from '../../../../common/constants';
import { ApiRequestActionsStatus } from '../../../../core/rest-client-helpers';
import ConfirmationModal from '../../../../components/confirmation-modal/ConfirmationModal';
import ProceedConfirmation from '../../../../components/proceed-confirmation/ProceedConfirmation';
import './BacklogEntrySheetDetail.scss';

export class BacklogEntrySheetDetail extends React.Component<BacklogEntrySheetDetailProps, BacklogEntrySheetState> {
    
    state: BacklogEntrySheetState = {
        selectedDate: new Date(),
        showEvidence: true,
        showIdentity: false,
        showRequirement: false,
        file: '',
        imgUrl: '',
        error: '',
        deletedImage: undefined,
        imageAction: undefined,
        displaySuggestion: false,
        changedPartIndex: 0,
        addPartError: '',
        isSubmissionError: false,
        isSubmitConfirmationShown: false,
        isCloseConfirmationShown: false,
        isApproveConfirmationShown: false,
        previewImg: false,
        selectedImg: ''
    }

    isBES = this.props.backlogParameter.showBES

    checkValidation = () => {
        let isShown: boolean = false
        this.props.backlogDetailUpdate.partRequirements && this.props.backlogDetailUpdate.partRequirements.map((part) => {
            if (part.isValidated === undefined || part.isValidated === null || !part.isValidated) return isShown = true
            else return isShown
        })
        return isShown
    }

    handleObjectPart = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        let objectPartUpdated: ObjectPartModel = { objPartCode: '' }
        this.props.besMaster.objectparts.map((part) => {
            if (part.objPartCategory === String(event.target.value)) return objectPartUpdated = part
            else return objectPartUpdated
        })
        this.props.updateBacklogDetail({ ...this.props.backlogDetailUpdate, objectPart: objectPartUpdated })
    }

    handleSpecificObjectPart =(event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        let specificObjectUpdated: SpecificObjectPartModel = { objSpecificPartDesc: '' }
        this.props.specificObjectParts.map((part) => {
            if (part.objSpecificPartDesc === String(event.target.value)) return specificObjectUpdated = part
            else return specificObjectUpdated
        })
        this.props.updateBacklogDetail({...this.props.backlogDetailUpdate, specificObjectPart: specificObjectUpdated})
    }

    handleDamage = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        let damageUpdated: DamageModel = { damageCode: '' }
        this.props.besMaster.damages.map((damage) => {
            if (damage.damageDesc === String(event.target.value)) return damageUpdated = damage
            else return damageUpdated
        })
        this.props.updateBacklogDetail({ ...this.props.backlogDetailUpdate, damage: damageUpdated })
    }

    handleCause = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        let causeUpdated: CauseModel = { causeDesc: '' }
        this.props.besMaster.causes.map((cause) => {
            if (cause.causeDesc === String(event.target.value)) return causeUpdated = cause
            else return causeUpdated
        })
        this.props.updateBacklogDetail({ ...this.props.backlogDetailUpdate, cause: causeUpdated })
    }

    handleSuggestedAction = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        let suggestedActionUpdated: SuggestedActionModel = { actionDesc: '' }
        this.props.besMaster.suggestedActions.map((action) => {
            if (action.actionDesc === String(event.target.value)) return suggestedActionUpdated = action
            else return suggestedActionUpdated
        })
        this.props.updateBacklogDetail({ ...this.props.backlogDetailUpdate, suggestedAction: suggestedActionUpdated })
    }

    handleActionChanged = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => { 
        let actionUpdated: SuggestedActionModel = { actionDesc: '' }
        this.props.besMaster.actions.map((action) => {
            if (action.actionDesc === String(event.target.value)) return actionUpdated = action
            else return actionUpdated
        })
        this.props.updateBacklogDetail({ ...this.props.backlogDetailUpdate, action: actionUpdated })
    }

    handlePriority = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => { 
        let priorityUpdated: PriorityModel = { priorityDesc: '' }
        this.props.besMaster.mPriorities.map((priority) => {
            if (priority.priorityDesc === String(event.target.value)) return priorityUpdated = priority
            else return priorityUpdated
        })
        this.props.updateBacklogDetail({ ...this.props.backlogDetailUpdate, priority: priorityUpdated })
    }

    handleResponsibility = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        let responsibilityUpdated: ResponsibilityModel = { responsibilityDesc: '' }
        this.props.besMaster.responsibilities.map((responsibilty) => {
            if (responsibilty.responsibilityDesc === String(event.target.value)) return responsibilityUpdated = responsibilty
            else return responsibilityUpdated
        })
        this.props.updateBacklogDetail({ ...this.props.backlogDetailUpdate, responsibility: responsibilityUpdated })
    }

    handleStatus = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        let statusUpdated: string = ''
        this.props.besMaster.backlogStatuses.map((status) => {
            if (status.status.toUpperCase() === String(event.target.value)) return statusUpdated = status.status.toUpperCase()
            else return statusUpdated
        })
        this.props.updateBacklogDetail({ ...this.props.backlogDetailUpdate, status: statusUpdated })
    }

    handleSmr = (e: any) => { this.props.updateBacklogDetail({ ...this.props.backlogDetailUpdate, smr: e.target.value }) }
    handleEstimationJob = (type: string | 'inc' | 'dec') => {
        let estimationJob: number = this.props.backlogDetailUpdate.estimation || 0
        if (type === 'inc') return this.props.updateBacklogDetail({ ...this.props.backlogDetailUpdate, estimation: estimationJob + 0.25 })
        if (type === 'dec' && estimationJob !== 0) return this.props.updateBacklogDetail({ ...this.props.backlogDetailUpdate, estimation: estimationJob - 0.25 })
        else return this.props.updateBacklogDetail({ ...this.props.backlogDetailUpdate })
    }

    handleAddPart = () => {
        let newPart: PartRequirementModel[] = this.props.backlogDetailUpdate.partRequirements ? this.props.backlogDetailUpdate.partRequirements : []
        newPart.push({partNumber: '', partDescription: '', quantity: 1})
        this.props.updateBacklogDetail({ ...this.props.backlogDetailUpdate, partRequirements: newPart })
    }

    handleChangePart = (e: any, key: string, type: 'inc' | 'dec' | 'change-part' | 'change-desc', index?: number) => {
        let newPart: PartRequirementModel[] = this.props.backlogDetailUpdate.partRequirements ? this.props.backlogDetailUpdate.partRequirements.map((part) => {
            if (type === 'inc' && part.partNumber === key) { return { ...part, quantity: part.quantity + 1 } }
            else if (type === 'dec' && part.partNumber === key && part.quantity > 1) { return { ...part, quantity: part.quantity - 1 } }
            else if (type === 'change-part' && part.partNumber === key) { 
                if (e.target.value && e.target.value !== '') { 
                    this.props.searchSparePart(e.target.value, this.props.token);
                    this.setState({displaySuggestion: true, changedPartIndex: index || 0})
                }
                else if (!e.target.value || e.target.value === '') this.setState({displaySuggestion: false}) 
                return { ...part, partNumber: e.target.value }
            }
            else if (type === 'change-desc' && part.partNumber === key) { return { ...part, partDescription: e.target.value.toUpperCase() }}
            else return { ...part }
        }) : []
        this.props.updateBacklogDetail({ ...this.props.backlogDetailUpdate, partRequirements: newPart })
    }

    handleDeletePart = (partNumber: string) => {
        this.setState({displaySuggestion: false})
        this.props.updateBacklogDetail({ ...this.props.backlogDetailUpdate, partRequirements: this.props.backlogDetailUpdate.partRequirements ? this.props.backlogDetailUpdate.partRequirements.filter((function (part) {return part.partNumber !== partNumber})) : [] })
    }
    
    handleAddImage = (e: any, type: 'add' | 'change' | undefined, data?: string) => {
        var reader = new FileReader()
        let file = e.target.files[0]
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            if (file.size < 7500000) {
                const img = new Image();
                img.src = String(reader.result);
                img.onload = () => {
                    const elem = document.createElement('canvas');
                    const width = 250;
                    const scale = 250 / img.width ;
                    const height = img.height * scale;
                    elem.width = width;
                    elem.height = height;
                    const ctx = elem.getContext('2d')
                    ctx && ctx.drawImage(img, 0, 0, width, height)
                    const data = ctx ? ctx.canvas.toDataURL('image/jpg', 80) : ''
                    this.setState({ file: file, imgUrl: data, error: '' })
                }

            }
            else { this.setState({error: 'File is too large'})}
        }
        this.setState({imageAction: type, deletedImage: data})
    }

    handleAction = async(type: 'submit' | 'approve' | 'close' | 'reject') => {
        this.setState({isApproveConfirmationShown: false, isCloseConfirmationShown: false, isSubmitConfirmationShown: false})
        await this.props.submitBacklog(this.props.backlogDetailUpdate, this.props.token)
        if (this.props.backlogSubmission.status === ApiRequestActionsStatus.FAILED || !this.props.backlogSubmission.response) {this.setState({isSubmissionError: true})}
        if (type === 'reject' && this.props.backlogSubmission.status === ApiRequestActionsStatus.SUCCEEDED && this.props.backlogSubmission.response) return this.props.onReject()
        if (type === 'approve' && this.props.backlogSubmission.status === ApiRequestActionsStatus.SUCCEEDED && this.props.backlogSubmission.response) return this.props.approveBES(this.props.backlogDetailUpdate.backlogId || '', this.props.token) 
        if (type === 'close' && this.props.backlogSubmission.status === ApiRequestActionsStatus.SUCCEEDED && this.props.backlogSubmission.response) return this.props.closeBMS(this.props.backlogDetailUpdate.backlogId || '', this.props.token)                    
    }

    handleSearch = (keyword?: string) => {
        if (keyword && keyword !== '') return this.props.searchSparePart(keyword, this.props.token)
        return this.props.spareParts
    }

    selectPart = (newPartData: PartRequirementModel) => {
        let newPart: PartRequirementModel[] = this.props.backlogDetailUpdate.partRequirements ? this.props.backlogDetailUpdate.partRequirements : []
        let isExist: boolean = false
        this.props.backlogDetailUpdate.partRequirements && this.props.backlogDetailUpdate.partRequirements.map((part) => {
            if (part.partNumber === newPartData.partNumber) {this.setState({addPartError: 'Part number is exist'}); return isExist = true}
            else {this.setState({addPartError: ''}); return isExist}
        })
        if (!isExist) newPart.push({...newPartData, quantity: 1})
        this.props.updateBacklogDetail({ ...this.props.backlogDetailUpdate, partRequirements: newPart })
        this.setState({displaySuggestion: false})
    }

    validate = async() => {
        let spareparts: string[] = []
        this.props.backlogDetailUpdate.partRequirements && this.props.backlogDetailUpdate.partRequirements.map((part) => (spareparts = [...spareparts, part.partNumber]))
        await this.props.validateSparepart(spareparts, this.props.token)        
        let checkedPart: PartRequirementModel[] = []
        this.props.backlogDetailUpdate.partRequirements && this.props.backlogDetailUpdate.partRequirements.map((part) => (
            this.props.sparePartsValidation.data.map((data) => {
                if (data.sparepartNumber === part.partNumber) return checkedPart = [...checkedPart, {...part, isValidated: data.isValidated}]
                else return checkedPart
            })
        ))
        this.props.updateBacklogDetail({...this.props.backlogDetailUpdate, partRequirements: checkedPart})
    }

    componentDidMount() { this.props.fetchSpecificObject(this.props.backlogDetailUpdate.objectPart || { objPartCode: '' }, this.props.token) }
    async componentDidUpdate(prevProps: BacklogEntrySheetDetailProps, prevState: BacklogEntrySheetState) {
        if (prevProps.backlogDetailUpdate.objectPart !== this.props.backlogDetailUpdate.objectPart) { 
            await this.props.fetchSpecificObject(this.props.backlogDetailUpdate.objectPart || { objPartCode: '' }, this.props.token)
            this.props.updateBacklogDetail({...this.props.backlogDetailUpdate, specificObjectPart: this.props.specificObjectParts[0]})
        }
        if (prevState.file !== this.state.file) {
            let newImages: string[] = this.props.backlogDetailUpdate.images || []
            if (this.state.imageAction === 'add') newImages.push(this.state.imgUrl)
            else if (this.state.imageAction === 'change') {
                var index = this.props.backlogDetailUpdate.images ? this.props.backlogDetailUpdate.images.indexOf(this.state.deletedImage || '') : 0
                newImages[index] = this.state.imgUrl
            }
            return this.props.updateBacklogDetail({...this.props.backlogDetailUpdate, images: newImages})
        }
    }

    renderCircularProgress() {
        if (
            this.props.backlogSubmission.status === ApiRequestActionsStatus.LOADING ||
            this.props.besApprovalStatus === ApiRequestActionsStatus.LOADING ||
            this.props.bmsClosedStatus === ApiRequestActionsStatus.LOADING ||
            this.props.sparePartsValidation.status === ApiRequestActionsStatus.LOADING) {
            return <CircularProgress size={100} className='circular-progress'/>
        }
    }

    renderPreview() {
        return (            
            <Modal open={this.state.previewImg} className="modal-container" onClose={() => this.setState({previewImg: false})}>
                <DialogContent className="modal-content">
                    <div className="selected-img-container">
                        <CloseButton onClose={() => {this.setState({previewImg: false})}}/>
                        <img alt='' className='selected-img' src={this.state.selectedImg}/>
                    </div>
                </DialogContent>
            </Modal>
        )
    }
    renderProblemEvidence() {
        const images: string[] = this.props.backlogDetailUpdate.images ? this.props.backlogDetailUpdate.images.map((image) => { return image }) : []
        return (
            <div className="problem-evidence-container">
                {
                    images[0] &&
                    <div className="image-container">
                        <div className="image-header">
                            <p className="image-label">Foto 1</p>
                            <div className="edit-img-container">
                                <input type="file" onChange={(e) => this.handleAddImage(e, 'change', images[0])} className="add-image-input"/>
                                <img alt='edit' className='edit-img' src={Pencil}/>
                            </div>                            
                        </div>
                        <img onClick={() => this.setState({previewImg: true, selectedImg: images[0]})} alt="evidence" className="tractor-img" src={images[0]} />
                    </div>
                }
                {
                    images[1] &&
                    <div className="image-container">
                        <div className="image-header">
                            <p className="image-label">Foto 2</p>
                            <div className="edit-img-container">
                                <input type="file" onChange={(e) => this.handleAddImage(e, 'change', images[1])} className="add-image-input"/>
                                <img alt='edit' className='edit-img' src={Pencil}/>
                            </div>                            
                        </div>
                        <img onClick={() => this.setState({previewImg: true, selectedImg: images[1]})}  alt="evidence" className="tractor-img" src={images[1]} />
                    </div>
                }
                {
                    images[2] &&
                    <div className="image-container">
                        <div className="image-header">
                            <p className="image-label">Foto 3</p>
                            <div className="edit-img-container">
                            <input type="file" onChange={(e) => this.handleAddImage(e, 'change', images[2])} className="add-image-input"/>
                                <img alt='edit' className='edit-img' src={Pencil}/>
                            </div>                            
                        </div>
                        <img onClick={() => this.setState({previewImg: true, selectedImg: images[2]})} alt="evidence" className="tractor-img" src={images[2]} />
                    </div>
                }
                {
                    this.props.backlogDetailUpdate.status !== 'CLOSED' && images.length < 3 &&
                    <div className="add-image">
                        <img src={`${AddPicture}`} className="add-image-icon" alt="add"/>
                        <input type="file" onChange={(e) => this.handleAddImage(e, 'add')} className="add-image-input"/>
                    </div>
                }
                {this.state.error !== '' && <p className="error-text">{this.state.error}</p>}
            </div>
        )
    }

    renderProblemIdentity() {
        const detail = this.props.backlogDetailUpdate
        const backlogDate = this.props.backlogDetailUpdate.backlogCreatedDate ? moment.utc(this.props.backlogDetailUpdate.backlogCreatedDate, ISO_8601).local().format('DD MMMM YYYY') : '-';     
        const ITEM_HEIGHT = 50;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
                width: 250,
                },
            },
        };
        return (
            <div className="item-row-container">
                <div className="item-column-container">
                    <div className="item">
                        <p className="item-label">BACKLOG DATE</p>
                        <div className='text-input'>{backlogDate}</div>
                    </div>
                    <div className="item">
                        <p className="item-label">UNIT MODEL</p>
                        <div className='text-input'>{detail.unitModel || '-'}</div>
                    </div>
                    <div className="item">
                        <p className="item-label">WORK ZONE</p>
                        <div className='text-input'>{detail.workZone ? `Zone ${detail.workZone.zone}` : '-'}</div>
                    </div>
                    <div className="item">
                        <p className="item-label">OBJECT PART</p>
                        {
                            this.isBES ?
                            <FormControl className='form-control'>
                                <Select MenuProps={MenuProps} classes={{ select: 'select-item' }} onChange={this.handleObjectPart} displayEmpty={true} name="object-part" value={detail.objectPart ? detail.objectPart.objPartCategory : 'Pilih object part'}>
                                    {this.props.besMaster.objectparts.map((part) => (<MenuItem key={part.sequence} value={part.objPartCategory}>{part.objPartCategory}</MenuItem>))}
                                </Select>
                            </FormControl> :
                            <div className='text-input'>{detail.objectPart ? detail.objectPart.objPartCategory : '-'}</div>
                        }
                    </div>
                    <div className="item">
                        <p className="item-label">DAMAGE</p>
                        {
                            this.isBES ?
                            <FormControl className='form-control'>
                                <Select MenuProps={MenuProps} classes={{ select: 'select-item' }} onChange={this.handleDamage} displayEmpty={true} name="damage" value={detail.damage ? detail.damage.damageDesc : 'Pilih damage'}>
                                    {this.props.besMaster.damages.map((part) => (<MenuItem key={part.sequence} value={part.damageDesc}>{part.damageDesc}</MenuItem>))}
                                </Select>
                            </FormControl> :
                            <div className='text-input'>{detail.damage ? detail.damage.damageDesc : '-'}</div>
                        }
                    </div>
                    <div className="item">
                        <p className="item-label">SUGGESTED ACTION</p>
                        <FormControl className='form-control'>
                            <Select MenuProps={MenuProps} classes={{ select: 'select-item' }} onChange={this.handleSuggestedAction} displayEmpty={true} name="suggested-action" value={detail.suggestedAction ? detail.suggestedAction.actionDesc : 'Pilih suggested action'}>
                                {this.props.besMaster.suggestedActions.map((suggestedAction) => (<MenuItem key={suggestedAction.sequence} value={suggestedAction.actionDesc}>{suggestedAction.actionDesc}</MenuItem>))}
                            </Select>
                        </FormControl> 
                    </div>
                    <div className="item">
                        <p className="item-label">{this.isBES ? 'PRIORITY' : 'ACTION'}</p>                        
                        {
                            this.isBES ?
                            <FormControl className='form-control'>
                                <Select MenuProps={MenuProps} classes={{ select: 'select-item' }} onChange={this.handlePriority} displayEmpty={true} name="priority" value={detail.priority ? detail.priority.priorityDesc : 'Pilih Priority'}>
                                    {this.props.besMaster.mPriorities.map((priority) => (<MenuItem key={priority.sequence} value={priority.priorityDesc}>{priority.priorityDesc}</MenuItem>))}
                                </Select>
                            </FormControl> :
                            <FormControl className='form-control'>
                                <Select MenuProps={MenuProps} classes={{ select: 'select-item' }} onChange={this.handleActionChanged} displayEmpty={true} name="action" value={detail.action ? detail.action.actionDesc : 'Pilih Priority'}>
                                    {this.props.besMaster.actions.map((action) => (<MenuItem key={action.sequence} value={action.actionDesc}>{action.actionDesc}</MenuItem>))}
                                </Select>
                            </FormControl> 
                        }
                    </div>
                </div>
                <div className="item-column-container">
                    <div className="item">
                        <p className="item-label">{this.isBES ? 'BACKLOG SOURCE' : 'NOTIFICATION'}</p>
                        <div className='text-input'>{this.isBES ? detail.jobType || '-' : detail.notifNumber || '-'}</div>
                    </div>
                    <div className="item">
                        <p className="item-label">UNIT CODE</p>
                        <div className='text-input'>{detail.unitCode || ''}</div>
                    </div>
                    <div className="item">
                        <p className="item-label">SMR / KM</p>
                        {
                            this.isBES ?
                            <Input onChange={this.handleSmr} value={detail.smr || 0} className="text-input-form" /> :
                            <div className='text-input'>{detail.smr || detail.km || 0}</div>
                        }
                    </div>
                    <div className="item">
                        <p className="item-label">SPECIFIC OBJECT PART</p>
                        {
                            this.isBES ?
                            <FormControl className='form-control'>
                                <Select MenuProps={MenuProps} classes={{ select: 'select-item' }} onChange={this.handleSpecificObjectPart} displayEmpty={true} name="cause" value={detail.specificObjectPart ? detail.specificObjectPart.objSpecificPartDesc : 'Pilih cause'}>
                                    {this.props.specificObjectParts.map((specificObjectPart) => (<MenuItem key={specificObjectPart.sequence} value={specificObjectPart.objSpecificPartDesc}>{specificObjectPart.objSpecificPartDesc}</MenuItem>))}
                                </Select>
                            </FormControl> :
                            <div className='text-input'>{detail.specificObjectPart ? detail.specificObjectPart.objSpecificPartDesc : '-'}</div>
                        }
                    </div>
                    <div className="item">
                        <p className="item-label">CAUSE</p>
                        {
                            this.isBES ?
                            <FormControl className='form-control'>
                                <Select MenuProps={MenuProps} classes={{ select: 'select-item' }} onChange={this.handleCause} displayEmpty={true} name="cause" value={detail.cause ? detail.cause.causeDesc : 'Pilih cause'}>
                                    {this.props.besMaster.causes.map((cause) => (<MenuItem key={cause.sequence} value={cause.causeDesc}>{cause.causeDesc}</MenuItem>))}
                                </Select>
                            </FormControl> :
                            <div className='text-input'>{detail.cause ? detail.cause.causeDesc : '-'}</div>
                        }
                    </div>
                    <div className="item">
                        <p className="item-label">ESTIMATED JOB (HOURS)</p>
                        {
                            this.isBES ?
                            <div className="item-row-button">
                                <div className="button" onClick={() => this.handleEstimationJob('dec')}>-</div>
                                <div className="count">{detail.estimation || 0}</div>
                                <div className="button" onClick={() => this.handleEstimationJob('inc')}>+</div>
                            </div> :
                            <div className='text-input'>{detail.estimation || 0}</div>
                        }
                    </div>
                    <div className="item">
                        <p className="item-label">{this.isBES ? 'RESPONSIBILITY' : 'STATUS'}</p>
                        {
                            this.isBES ?
                            <FormControl className='form-control'>
                                <Select MenuProps={MenuProps} classes={{ select: 'select-item' }} onChange={this.handleResponsibility} displayEmpty={true} name="responsibilty" value={detail.responsibility ? detail.responsibility.responsibilityDesc : 'Pilih responsibilty'}>
                                    {this.props.besMaster.responsibilities.map((responsibility) => (<MenuItem key={responsibility.sequence} value={responsibility.responsibilityDesc}>{responsibility.responsibilityDesc}</MenuItem>))}
                                </Select>
                            </FormControl> :
                            <FormControl className='form-control'>
                                <Select MenuProps={MenuProps} classes={{ select: 'select-item' }} onChange={this.handleStatus} displayEmpty={true} name="responsibilty" value={detail.status ? detail.status.toUpperCase() : 'Pilih Status'}>
                                    {this.props.besMaster.backlogStatuses.map((status, index) => (<MenuItem key={index} value={status.status.toUpperCase()}>{status.status.toUpperCase()}</MenuItem>))}
                                </Select>
                            </FormControl>
                        }
                    </div>
                </div>
            </div>
        )
    }

    renderPartRequirement() {
        return (
            <div className="part-requirement-container">
                { this.isBES && 
                    <div>
                        <SearchInput className="search-input" webInfo='Search part number' displayMode={this.props.displayMode} onSearch={this.handleSearch} />                    
                        <ul className="spare-part-list">
                            {this.props.spareParts.map((part, index) => (
                                <div key={index} className="spare-parts">
                                    <li className="spare-part-list-item" >{part.partNumber}</li>
                                    <div onClick={() => this.selectPart(part)} className='add-part-button'>+</div>
                                </div>
                            ))}
                        </ul>
                    </div>
                }                
                <p className="error-text">{this.state.addPartError}</p>
                <div className="row-container-header">
                    {this.isBES && <div className='part-validation'/>}
                    <div className="part-number">Part Number</div>
                    <div className="part-description">Part Description</div>
                    <div className="qty">Qty</div>
                </div>
                <div className="container-content">
                    {
                        this.props.backlogDetailUpdate.partRequirements && this.props.backlogDetailUpdate.partRequirements.map((part, index) => (
                            <div key={index} className="row-container-content">
                                { this.isBES &&
                                    <div className="part-validation">
                                        <img alt='' src={part.isValidated !== undefined ? part.isValidated ? CheckedGood : Delete : Warning} className="validation-icon"/>
                                    </div>
                                }
                                <div className="part-number">{part.partNumber}</div>
                                <div className="part-description">{part.partDescription}</div>
                                <div className="qty">
                                    {this.isBES && <div className="operation" onClick={(e) => this.handleChangePart(e, part.partNumber, 'dec')}>-</div>}
                                    <div className="qty-val">{part.quantity}</div>
                                    {this.isBES && <div className="operation" onClick={(e) => this.handleChangePart(e, part.partNumber, 'inc')}>+</div>}
                                    {this.isBES && <img onClick={() => this.handleDeletePart(part.partNumber)} className="part-delete" alt="del" src={Bin} />}
                               </div>
                            </div>
                        ))
                    }
                </div>  
                {this.isBES && this.props.displayMode === 'web' && <div onClick={this.validate} className="btn-save">Validate</div>}
                {
                    this.props.displayMode === 'web' &&
                    <div className="img-container">
                        <img alt='' className={ this.isBES ? "beshand" : "beshand-bms"} src={`${BasePathProv + BesHand}`} />
                    </div>
                }
                {
                    this.props.backlogDetailUpdate.status &&
                    <div className="btn-row">
                        {this.isBES && this.props.displayMode !== 'web' && <div onClick={this.validate} className="btn-save">Validate</div>}
                        <Button onClick={() => this.isBES ? this.handleAction('reject') : this.setState({isSubmitConfirmationShown: true})} className="btn-approve">{this.isBES ? 'Reject' : 'Save'}</Button>
			            <Button disabled={this.isBES ? this.checkValidation() || this.props.backlogSubmission.status === ApiRequestActionsStatus.LOADING || this.props.besApprovalStatus === ApiRequestActionsStatus.LOADING : this.props.backlogDetailUpdate.status.toUpperCase() === 'OPEN'} onClick={() => this.isBES ? this.setState({isApproveConfirmationShown: true}) : this.setState({isCloseConfirmationShown: true})} className="btn-approve">Approve</Button>
                    </div>
                }
                <ProceedConfirmation openModal={this.state.isSubmitConfirmationShown} onClose={() => this.setState({isSubmitConfirmationShown: false})} onProceed={() => this.handleAction('submit')} />    
                <ProceedConfirmation openModal={this.state.isApproveConfirmationShown} onClose={() => this.setState({isApproveConfirmationShown: false})} onProceed={() => this.handleAction('approve')} />                
                <ProceedConfirmation openModal={this.state.isCloseConfirmationShown} onClose={() => this.setState({isCloseConfirmationShown: false})} onProceed={() => this.handleAction('close')} />
                <ConfirmationModal onClose={() => this.setState({isSubmissionError: false})} openModal={this.state.isSubmissionError} isSuccess={false} errorMsg={`Something is wrong.\nData can not be saved`}/>
            </div>
        )
    }

    renderEvidence = () => {
        this.setState({ ...this.state, showEvidence: true, showIdentity: false, showRequirement: false })
    }

    renderIdentity = () => {
        this.setState({ ...this.state, showEvidence: false, showIdentity: true, showRequirement: false })
    }

    renderRequirement = () => {
        this.setState({ ...this.state, showEvidence: false, showIdentity: false, showRequirement: true })
    }

    render() {
        if (this.props.displayMode !== 'web') {
            return (
                <div className="bes-detail-modal">
                    {this.renderPreview()}
                    <CloseButton onClose={this.props.onClose}/>
                    <div className="modal-header">
                        <div className="modal-header-line" />
                        <p>Backlog {this.isBES ? 'Entry' : 'Monitoring'} Sheet</p>
                    </div>
                    <div className="modal-content-container">                        
                        {this.renderCircularProgress()}
                        <div className="titles">
                            <p onClick={this.renderEvidence} className={this.state.showEvidence ? 'title-choosen' : "title"}>Problem Evidence</p>
                            <p onClick={this.renderIdentity} className={this.state.showIdentity ? 'title-choosen' : "title"}>Problem Identity</p>
                            <p onClick={this.renderRequirement} className={this.state.showRequirement ? 'title-choosen' : "title"}>Part Requirement</p>
                        </div>
                        {
                            this.state.showEvidence &&
                            <div className="problem-evidence-container">
                                {this.renderProblemEvidence()}
                            </div>
                        }
                        {
                            this.state.showIdentity &&
                            <div className="problem-identity-container">
                                {this.renderProblemIdentity()}
                            </div>
                        }
                        {
                            this.state.showRequirement &&
                            <div className="part-requirement-container">
                                {this.renderPartRequirement()}
                            </div>
                        }
                    </div>
                </div>
            )
        }
        return (
            <div className="bes-detail-modal">               
                {this.renderCircularProgress()}
                {this.renderPreview()}
                <CloseButton onClose={this.props.onClose}/>
                <div className="modal-header">
                    <p>Backlog {this.isBES ? 'Entry' : 'Monitoring'} Sheet</p>
                </div>
                <div className="modal-content-container">     
                    <div className="problem-evidence-container">
                        <p className="title">Problem Evidence</p>
                        {this.renderProblemEvidence()}
                    </div>
                    <div className="problem-identity-container">
                        <div className="item-problem-desc">
                            <p className="title">Problem Description</p>
                            <p className="label">
                                {this.props.backlogDetailUpdate.problemDesc}
                            </p>
                        </div>
                        <p className="title">Problem Identity</p>
                        {this.renderProblemIdentity()}
                    </div>
                    <div className="part-requirement-container">
                        <p className="title">Part Requirement</p>
                        {this.renderPartRequirement()}
                    </div>
                </div>
            </div>
        )
    }
}