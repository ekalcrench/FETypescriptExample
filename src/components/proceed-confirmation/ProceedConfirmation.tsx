import React from 'react';
import CloseButton from '../close-button/CloseButton';
import { Modal, DialogContent } from '@material-ui/core';
import './ProceedConfirmation.scss'

interface ProceedConfirmationProps {
    openModal: boolean
    msg?: string
    onProceed: () => void
    onClose: () => void
}
export default class ProceedConfirmation extends React.Component<ProceedConfirmationProps> {  
  render() {
    return (      
      <Modal open={this.props.openModal} onClose={this.props.onClose} className="modal-container" >
        <DialogContent className="confirmation-modal-content">
          <div className="proceed-confirmation-modal">
            <CloseButton onClose={this.props.onClose}/>
            <div className="confirmation-container">
                <p className="confirmation-title">{this.props.msg || 'Do you want to proceed?'}</p>
                <div className="btn-confirmation">
                    <div onClick={this.props.onClose} className="btn-no">No</div>
                    <div onClick={this.props.onProceed} className="btn-yes">Yes</div>
                </div>
            </div>            
          </div>
        </DialogContent>
      </Modal>
    )
  }
}
