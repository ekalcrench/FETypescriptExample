import React from 'react';
import NavBarComponent from '../components/nav-bar';
import routes from '../routes';
import SideMenuComponent from '../components/side-menu';
import moment from 'moment-timezone';
import { ConnectedRouter } from 'connected-react-router';
import { AppDefaultProps } from '.';
import './App.scss';

class App extends React.Component<AppDefaultProps> {

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    let mode: string = 'web';
    if (window.innerWidth < 600) { mode = 'mobile'; }
    else if (window.innerWidth < 1026) { mode = 'tab'; }
    this.props.setDisplayMode(mode);
  }

  componentDidMount() {
    this.props.getUserData();
    this.handleWindowSizeChange();
    this.props.setTimezone(moment().format('Z'))
  }
  
  render() {
    return (
      <div className="app-container">
        <NavBarComponent />
        <SideMenuComponent />
        <ConnectedRouter history={this.props.history}>
          {routes}
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;
