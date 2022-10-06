import React from 'react';
import { InputBase, Paper } from '@material-ui/core';
import { Zoom } from '../../assets/icons';
import { SearchInputProps, SearchInputState } from './SearchInput.model';
import './SearchInput.scss';

export class SearchInput extends React.PureComponent<SearchInputProps, SearchInputState> {

    state = {
        value: ''
    }

    handleKeyUp = (event: any) => {
        this.setState({ value: event.target.value });
        if (event.keyCode === 13) {
            this.props.onSearch(this.state.value);
        }
        else {
            setTimeout(() => {
                this.props.onSearch(this.state.value);
            }, 1000);
        }
    }

    render() {
        let info: string = (this.props.displayMode === 'web' ? this.props.webInfo : this.props.generalInfo) || 'Search'
        return (
            <Paper className={this.props.className || "search-input"} elevation={1}>
                <img src={Zoom} alt='' className="search-icon" />
                <InputBase
                    className="search-text"
                    placeholder={info}
                    onKeyUp={this.handleKeyUp} />
            </Paper>
        )
    }
}