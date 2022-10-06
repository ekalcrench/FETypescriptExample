import React from 'react';
import { NoteProps } from './NoteComponent.model';
import './NoteComponent.scss'

export default class NoteComponent extends React.PureComponent<NoteProps> {
    state = {
        showNote: false,
        anchorEl: null
    }

    render() {
        return (
            <div className="note-container">              
                <p className="btn-label">Note</p>
                <div className="btn-note-problems">{this.props.checkSheetValue.mNotes.noteDesc || '+'}</div>
            </div>
        )
    }
}