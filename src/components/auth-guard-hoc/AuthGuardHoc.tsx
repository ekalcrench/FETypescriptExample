import React, { Component, ComponentClass } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { AuthGuardHocProps } from './AuthGuardHoc.model';
import { isAccessTokenValid } from '../../core/helpers-function';
import { Menu } from '../../common/constants';

export default function(ComposedComponent: ComponentClass) {
    
    class AuthGuardHoc extends Component<AuthGuardHocDispatchProps & AuthGuardHocProps> {

        componentWillMount() {
            if(!isAccessTokenValid()) this.props.goToLogin();
        }

        componentWillUpdate() {
            if(!isAccessTokenValid()) this.props.goToLogin();
        }

        render() {
            return <ComposedComponent {...this.props.component} />
        }
    }

    const mapDispatchToProps = (dispatch: any) => {
        return {
            goToLogin: () => dispatch(push(Menu.LOGIN))
        }
    }

    type AuthGuardHocDispatchProps = ReturnType<typeof mapDispatchToProps>;

    return connect(null, mapDispatchToProps)(AuthGuardHoc);
}