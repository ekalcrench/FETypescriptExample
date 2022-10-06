import React from 'react';
import Message from '../../core/message/Message';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Button, Input } from '@material-ui/core';
import { MovingAsOneLogo, UTLogo, ArrowRight, DcaLogo, MovingAsOneInverse, LoginBg } from '../../assets/imgs'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { LoginState } from './LoginPage.model';
import { Menu, BasePath } from '../../common/constants';
import { LoginPageProps } from '.';
import { ApiRequestActionsStatus } from '../../core/rest-client-helpers';
import { isAccessTokenValid } from '../../core/helpers-function';
import './LoginPage.scss';

class LoginPage extends React.Component<LoginPageProps, LoginState>{
  state: LoginState = {
    username: '',
    password: '',
    showPassword: false
  };

  componentWillMount() {
    if (isAccessTokenValid()) {this.props.push(Menu.DASHBOARD);}
  }

  handleUsernameChange = (event: any) => { this.setState({ username: event.target.value }); }
  handlePasswordChange = (event: any) => { this.setState({ password: event.target.value }); }
  handleKeyPress = (event: any) => { if (event.key === 'Enter') return this.handleLogin()  }
  
  handleLogin = () => { this.props.login(this.state.username, this.state.password) }

  isDisabled(): boolean { return this.state.username === '' || this.state.password === ''; }

  componentDidUpdate(prevProps: LoginPageProps) {
    if (prevProps.loginRequest !== this.props.loginRequest && this.props.loginRequest.status === ApiRequestActionsStatus.SUCCEEDED) {
      this.props.saveUserData(this.props.loginRequest.payload);
      this.props.push(Menu.DASHBOARD);
    }
  }

  renderForm() {
    return (
      <form noValidate autoComplete="off" className="login-form">
        <label htmlFor="username" className="username-label">USERNAME</label>
        <Input id="username" type="text" value={this.state.username} onChange={this.handleUsernameChange} className="username-input" placeholder="Input your username" classes={{ input: "username-input-text" }} />
        <label htmlFor="password" className="password-label">PASSWORD</label>
        <Input onKeyPress={this.handleKeyPress} id="password" type={this.state.showPassword ? "text" : "password"} value={this.state.password} onChange={this.handlePasswordChange} className="password-input" placeholder="Input your password" classes={{ input: "username-input-text" }}/>
        {
          this.state.showPassword ?
            <Visibility className="visibility-icon" onClick={() => this.setState({ showPassword: !this.state.showPassword })} /> :
            <VisibilityOff className="visibility-icon" onClick={() => this.setState({ showPassword: !this.state.showPassword })} />
        }
        <Button disabled={this.isDisabled()} variant="contained" className={this.isDisabled() ? "btn-login-disabled" : "btn-login"} onClick={this.handleLogin}>
          Log In &nbsp; &nbsp;
          <img alt='' src={ArrowRight} className="arrow-icon" />
        </Button>
      </form>
    )
  }

  renderLinearProgress() { if (this.props.loginRequest.status === ApiRequestActionsStatus.LOADING) return <LinearProgress classes={{ barColorPrimary: 'bar-color' }} /> }
  renderError() { if (this.props.loginRequest.status === ApiRequestActionsStatus.FAILED) return <Message type="Error" message={'Username or password is invalid. Please try again'} /> }

  render() {
    if (window.innerWidth > 1025) {
      return (
        <div>
          {this.renderLinearProgress()}
          <div className="login-page">
            <div className="left-pane">
              <img src={BasePath + LoginBg} className="login-bg" alt=""/>
              <img src={`${BasePath +  UTLogo}`} className="logo-ut" alt="united tractors" />
              <div className="app-title">
                <p className="appname1">DATA CAPTURE</p>
                <p className="appname2">APPLICATION</p>
              </div>
            </div>
            <div className="right-pane">
              <img src={MovingAsOneLogo} className="movingasone" alt="logo" />
              <div className="login-form-container">
                <div className="login-form-inner">
                  {this.renderError()}
                  <h2 className="login-title">Log In</h2>
                  {this.renderForm()}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        {this.renderLinearProgress()}
        <div className="login-page-mobile">
        <img src={BasePath + LoginBg} className="login-bg" alt=""/>
          <img src={`${BasePath + UTLogo}`} className="logo-ut" alt="united tractors" />
          <div className="login-form-container">
            <img alt='logo' src={`${DcaLogo}`} className="dca-logo" />
            {this.renderError()}
            {this.renderForm()}
          </div>
          <img alt='' src={`${BasePath + MovingAsOneInverse}`} className="movingasone" />
        </div>
      </div>
    )
  }
}

export default LoginPage;