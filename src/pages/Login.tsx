import React from 'react';
import axios from '../utils/axios';
import styled from 'styled-components';
import { Button, Input, Accordion, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { LanguageState } from '../types/language';
import { mainColor, backGroundColor } from '../constants/style';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LanguageDropdown from '../components/LanguageDropdown';
import { Link } from 'react-router-dom';
import history from 'history';
import Loading from '../components/Loading';

type OwnPros = {
  language: string;
  history: history.History;
};
type Props = OwnPros & WrappedComponentProps;
type State = {
  loginInput: {
    password: string;
    email: string;
    [key: string]: any;
  };
  loginError: string;
  activeIndex: number;
  isLoading: boolean;
};

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loginInput: {
        password: '',
        email: '',
      },
      loginError: '',
      activeIndex: 0,
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, accordionProps: any) => {
    const { index } = accordionProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const loginInput = { ...this.state.loginInput };
    loginInput[e.target.name] = e.target.value;
    this.setState({ loginInput });
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.setState({ isLoading: true });

    axios
      .post('/api/login', {
        email: this.state.loginInput.email,
        password: this.state.loginInput.password,
      })
      .then((response: any) => {
        localStorage.setItem('token', response.data.token);
        this.setState({ isLoading: false });
        this.props.history.push('/home');
      })
      .catch((error: any) => {
        this.setState({ isLoading: false });
        if (error.response.status === 401) {
          return this.setState({
            loginError: this.props.intl.formatMessage({
              id: 'login.login401Error',
              defaultMessage: 'パスワードかメールアドレスが間違っています。',
            }),
          });
        }
        return this.setState({
          loginError: this.props.intl.formatMessage({
            id: 'error.serverError',
            defaultMessage:
              '何らかのエラーが発生しています。申し訳ありませんが時間を空けて再度お試し下さい。',
          }),
        });
      });
  }

  render(): React.ReactNode {
    const { activeIndex, loginError, isLoading } = this.state;

    if (isLoading === true) {
      return <Loading isDataFetching={true} />;
    }

    return (
      <LoginWrapper>
        <LanguageSection>
          <LanguageDropdown height={'5%'} />
        </LanguageSection>
        <LoginContainer>
          <LoginSection>
            <ServiceName>
              <FontAwesomeIcon
                icon="chart-pie"
                style={{
                  width: 40,
                  height: 40,
                  color: mainColor,
                }}
              />
              <span style={{ color: mainColor }}>&nbsp;Accounting</span>
            </ServiceName>
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
                {loginError && (
                  <span style={{ color: 'red', marginTop: '10px' }}>{loginError}</span>
                )}
                <Button type="submit" style={{ color: 'black', marginTop: '25px' }} size="large">
                  <FormattedMessage id="login.submitButton" defaultMessage="送信" />
                </Button>
              </div>
            </form>
          </LoginSection>
          <Link style={{ marginTop: '15px' }} to="/register">
            <span style={{ color: mainColor }}>
              <FormattedMessage
                id="login.registerNotYet"
                defaultMessage="登録がお済みでない方はこちら"
              />
            </span>
          </Link>
          <Accordion style={{ textAlign: 'center', marginRight: '20px', marginTop: '10px' }}>
            <Accordion.Title
              style={{ color: mainColor }}
              active={activeIndex === 1}
              index={1}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              Demo account
            </Accordion.Title>
            <Accordion.Content style={{ marginLeft: '25px' }} active={activeIndex === 1}>
              <p style={{ textAlign: 'left', color: mainColor }}>
                email: demo.accounting@e-mail.jp
                <br />
                password : accounting1
              </p>
            </Accordion.Content>
          </Accordion>
        </LoginContainer>
      </LoginWrapper>
    );
  }
}

const ServiceName = styled.h1`
  font-size: 50px;
  text-align: left;
  margin-right: 20px;
  margin-bottom: 45px;
  font-family: Pacifico;
  color: ${mainColor};
`;

const LoginTitle = styled.span`
  font-size: 20px;
  text-align: center;
  margin-bottom: 5px;
  color: ${mainColor};
  font-weight: bold;
`;

const LanguageSection = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${backGroundColor};
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90%;
`;

const LoginSection = styled.div`
  width: 30%;
  height: 75%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
`;

function mapStateToProps(state: LanguageState) {
  return {
    language: state.ui.language.locale,
  };
}

export default connect(mapStateToProps)(injectIntl(Login));
