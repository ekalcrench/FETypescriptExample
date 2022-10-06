import React from 'react'
import './Logout.scss'

interface LogoutProps {
    onYesClicked: () => void
    onNoClicked: () => void
}

export default class LogoutModal extends React.Component<LogoutProps> {
    render () {
        return (
            <div className="logout-modal">
                <p className="title">Are you sure you want to Logout now?</p>
                <div className="btn-container">                    
                    <div className="btn-yes" onClick={this.props.onYesClicked}>
                        Yes
                    </div>                  
                    <div className="btn-no" onClick={this.props.onNoClicked}>
                        No
                    </div>
                </div>
            </div>
        )
    }
}