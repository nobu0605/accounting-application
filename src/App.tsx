import React from 'react';
import { Router } from 'react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Journal from './pages/Journal';
import ProfitLossStatement from './pages/ProfitLossStatement';
import Transaction from './pages/Transaction';
import Report from './pages/Report';
import Setting from './pages/Setting';
import AuthRouteWrapper from './pages/layout/AuthRouteWrapper';
import LanguageProvider from './components/LanguageProvider';
import HeaderWrapper from './pages/layout/HeaderWrapper';
import PageWrapper from './pages/layout/PageWrapper';

import 'semantic-ui-css/semantic.min.css';

type Props = any;

export default class App extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="app">
        <LanguageProvider>
          <Router history={this.props.history}>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/" render={() => <Redirect to={{ pathname: '/login' }} />} />
              <AuthRouteWrapper>
                <HeaderWrapper>
                  <PageWrapper>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/profitLossStatement" component={ProfitLossStatement} />
                    <Route exact path="/journal" component={Journal} />
                    <Route exact path="/transaction" component={Transaction} />
                    <Route exact path="/report" component={Report} />
                    <Route exact path="/setting" component={Setting} />
                  </PageWrapper>
                </HeaderWrapper>
              </AuthRouteWrapper>
            </Switch>
          </Router>
        </LanguageProvider>
      </div>
    );
  }
}
