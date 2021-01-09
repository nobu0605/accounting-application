import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Completed from './pages/Completed';
import Home from './pages/Home';
import Journal from './pages/Journal';
import FinancialStatement from './pages/FinancialStatement';
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
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/" render={() => <Redirect to={{ pathname: '/login' }} />} />
              <Route exact path="/completed" component={Completed} />
              <AuthRouteWrapper>
                <HeaderWrapper>
                  <PageWrapper>
                    <Switch>
                      <Route exact path="/home" component={Home} />
                      <Route exact path="/financialStatement" component={FinancialStatement} />
                      <Route exact path="/journal" component={Journal} />
                      <Route exact path="/report" component={Report} />
                      <Route exact path="/setting" component={Setting} />
                      {/* todo: Make sure whether this implementation is correct. */}
                      <BrowserRouter forceRefresh={true}>
                        <Route exact path="/transaction" component={Transaction} />
                      </BrowserRouter>
                    </Switch>
                  </PageWrapper>
                </HeaderWrapper>
              </AuthRouteWrapper>
            </Switch>
          </BrowserRouter>
        </LanguageProvider>
      </div>
    );
  }
}
