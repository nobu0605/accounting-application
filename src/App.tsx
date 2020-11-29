import React from 'react';
import { Router } from 'react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Journal from './pages/Journal';
import 'semantic-ui-css/semantic.min.css';
import AuthRouteWrapper from './pages/layout/AuthRouteWrapper';

type Props = any;

export default class App extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="app">
        <Router history={this.props.history}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" render={() => <Redirect to={{ pathname: '/login' }} />} />
            <AuthRouteWrapper>
              <Journal exact path="/journal" component={Journal} />
            </AuthRouteWrapper>
          </Switch>
        </Router>
      </div>
    );
  }
}
