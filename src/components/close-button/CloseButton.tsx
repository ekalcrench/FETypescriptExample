import React from 'react';
import './CloseButton.scss'

interface CloseButtonProps {
    onClose: () => void
}
export default class CloseButton extends React.Component<CloseButtonProps> {  
  render() {
    return (      
    <div className="close-button-row">
        <div className="close-button" onClick={this.props.onClose} />
    </div>
    )
  }
}
