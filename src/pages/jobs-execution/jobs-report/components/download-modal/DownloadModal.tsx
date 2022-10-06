import React from 'react';
import './DownloadModal.scss';
import { DownloadModalProps } from './DownloadModal.model';
import { DownloadModalBg } from '../../../../../assets/imgs'
import { PDFDownloadLink } from '@react-pdf/renderer';
import { WoPdf } from '../pdf-pi/PdfPI';
import { BasePath } from '../../../../../common/constants';
import CloseButton from '../../../../../components/close-button/CloseButton';

export default class DownloadModal extends React.Component<DownloadModalProps> {
  
  state = {
    status: 0
  }

  render() {
    
    return (
      <div className="download-modal">
          <CloseButton onClose={this.props.onCancel}/>
          <div className="modal-header">
            <p className="modal-header-title">Download File</p>
            <img src={`${BasePath + DownloadModalBg}`} className="download-modal-img" alt=''/>
          </div>
          <div className="btn-container">
            <PDFDownloadLink document={<WoPdf />} fileName="wo.pdf">
              {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
          </div>
      </div>
    )
  }
}