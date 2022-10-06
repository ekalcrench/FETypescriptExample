import React from 'react';
import { DropdownState, DropdownProps } from './DropdownComponent.model';
import { ExpandMore } from '@material-ui/icons'
import './DropdownComponent.scss';

class DropdownComponent extends React.Component<DropdownProps, DropdownState> {
  constructor(props: DropdownProps){
    super(props);

    this.state = {
        displayMenu: false
    };
  };

  showDropdownMenu = (event: any) => {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  }

  selectItem = (item: any) => {
    this.props.onSelectAction(this.props.onSelectActionType, item);
  }

  renderDropdown(){
    return (
      <div className="dropdown-button" onClick={this.showDropdownMenu}>
        <div className="dropdown-selected-item">{this.props.selected} 
          <div className="expand-icon-container"><ExpandMore className="expand-icon" /></div>
        </div>
      </div>
    )
  }

  renderDropdownList(){
    return(
      <ul className="list-items">
        { this.props.data &&
          this.props.data.map((item, index) => {
            return (
              item && <li className="list-item" onClick={() => this.selectItem(item)} key={index}>{item}</li>
            )}
          )
        }
      </ul>
    )
  }
  render() {
    if(this.props.displayMode === 'mobile') {
      return (
        <div >
          <div className="dropdown">
            {this.renderDropdown()}
          </div>
          { 
            this.state.displayMenu && this.renderDropdownList()
          }
        </div>
      )
    }

    return(        
      <div className="dropdown">
        {this.renderDropdown()}
        { 
          this.state.displayMenu && this.renderDropdownList()
        }
      </div>
    )
  }
}

export default DropdownComponent;