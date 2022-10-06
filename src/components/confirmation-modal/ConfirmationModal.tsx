import React from 'react';
import CloseButton from '../close-button/CloseButton';
import { Success } from '../../assets/imgs';
import { Modal, DialogContent } from '@material-ui/core';
import { ConditionBad } from '../../assets/icons';
import './ConfirmationModal.scss'

interface ConfirmationModalProps {
    isSuccess: boolean
    openModal: boolean
    successMsg?: string
    errorMsg?: string
    onClose: () => void
}
export default class ConfirmationModal extends React.Component<ConfirmationModalProps> {  
  render() {
    return (      
      <Modal open={this.props.openModal} onClose={this.props.onClose} className="modal-container">
        <DialogContent className="confirmation-modal-content">
          <div className="confirmation-modal">
            <CloseButton onClose={this.props.onClose}/>
              {this.props.isSuccess ?
                <div className="confirmation-container">
                  <p className="confirmation-title">Successful</p>
                  <img className="confirmation-image" src={Success} alt="" />
                  <p className="confirmation-caption">Congratulations!</p>
                  <p className="confirmation-caption">{this.props.successMsg}</p>
                </div> :
                <div className="confirmation-container">
                  <p className="confirmation-title">Failed</p>
                  <img className="confirmation-image" src={`${ConditionBad}`} alt="" />
                  <p className="confirmation-caption">{this.props.errorMsg || 'Something is wrong'}</p>
                </div>
              }        
          </div>
        </DialogContent>
      </Modal>
    )
  }
}
