import React from 'react';
import { JobsDataModel } from '../../JobsPage.model';
import './SelectedJobs.scss';

interface SelectedJobsProps {
  selectedJobs: JobsDataModel[]
}

export default class SelectedJobsComponent extends React.Component<SelectedJobsProps> {
  render() {
    return (
      <div className="selected-jobs">
        <div className="selected-jobs-title">Selected Item</div>
        <div className="selected-jobs-list">
          {
            this.props.selectedJobs.map((item: JobsDataModel, index: number) => {
              return (
                <div key={index} className="selected-jobs-detail-container">
                  <div className="selected-jobs-detail">
                    <div className="selected-jobs-label">Unit Model</div>
                    <div className="selected-jobs-info">{item.unitModel}</div>
                  </div>
                  <div className="selected-jobs-detail">
                    <div className="selected-jobs-label">Unit Code</div>
                    <div className="selected-jobs-info">{item.unitCode}</div>
                  </div>
                  <div className="selected-jobs-detail">
                    <div className="selected-jobs-label">Tipe Pekerjaan</div>
                    <div className="selected-jobs-info">{item.jobType}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}