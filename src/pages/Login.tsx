import React from 'react';
import axios from '../utils/axios';
import styled from 'styled-components';
import { Button, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { languageState } from '../types/language';
import { mainColor } from '../constants/style';
import { FormattedMessage, injectIntl } from 'react-intl';

type Props = any;
type State = {
  response: any;
  loginInput: {
    password: string;
    email: string;
    [key: string]: any;
  };
};

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      response: '',
      loginInput: {
        password: '',
        email: '',
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const loginInput = { ...this.state.loginInput };
    loginInput[e.target.name] = e.target.value;
    this.setState({ loginInput });
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    axios
      .post('/api/login', {
        email: this.state.loginInput.email,
        password: this.state.loginInput.password,
      })
      .then((response: any) => {
        localStorage.setItem('token', response.data.token);
        location.pathname = '/home';
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  render(): React.ReactNode {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
        }}
      >
        <LoginTitle>
          <FormattedMessage id="login.loginMessage" defaultMessage="ログイン" />
        </LoginTitle>
        <br />
        <form onSubmit={this.handleSubmit}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Input
              name="email"
              type="email"
              placeholder="E-mail address"
              onChange={(e) => this.handleChange(e)}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => this.handleChange(e)}
              style={{ marginTop: '15px' }}
            />
            <Button type="submit" style={{ color: mainColor, marginTop: '15px' }} size="large">
              <FormattedMessage id="login.submitButton" defaultMessage="送信" />
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const LoginTitle = styled.span`
  font-size: 20px;
  text-align: center;
  margin-top: 105px;
  margin-bottom: 5px;
  color: black;
`;

function mapStateToProps(state: languageState) {
  return {
    language: state.ui.language.locale,
  };
}

export default connect(mapStateToProps)(injectIntl(Login));
