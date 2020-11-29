import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {
  children: any;
};

type State = {
  authenticated: boolean;
};

class AuthRouteWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render(): any {
    let authenticated: boolean;
    const token = localStorage.getItem('token');

    if (typeof token === 'undefined' || token === null) {
      location.pathname = '/login';
      return;
    } else {
      authenticated = true;
    }

    if (authenticated) {
      return <Route>{this.props.children}</Route>;
    } else {
      return (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      );
    }
  }
}

export default AuthRouteWrapper;
