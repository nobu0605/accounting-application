import React from 'react';
import axios from '../utils/axios';
import styled from 'styled-components';
import { Button, Input, Popup, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { LanguageState } from '../types/language';
import { UserState } from '../types/user';
import { mainColor, backGroundColor } from '../constants/style';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LanguageDropdown from '../components/LanguageDropdown';
import { fetchUser } from '../thunks/user';
import { Link } from 'react-router-dom';
import { isValidPassword, isEmpty } from '../utils/validations';
import { industryOptionsJa } from '../languages/ja';
import { industryOptionsEn } from '../languages/en';

type Props = any;
type State = {
  response: any;
  registerInput: {
    user_name: string;
    password: string;
    confirm_password: string;
    email: string;
    company_name: string;
    industry_class: string;
    number_of_employees: number;
    fiscal_start_date: string;
    fiscal_end_date: string;
    founded_date: string;
    [key: string]: any;
  };
  errors: {
    registerError: string;
    isRequired: {
      user_name: boolean;
      password: boolean;
      email: boolean;
      company_name: boolean;
      fiscal_start_date: boolean;
      fiscal_end_date: boolean;
      founded_date: boolean;
      [key: string]: any;
    };
    [key: string]: any;
  };
};
type ReduxState = LanguageState & UserState;

type SelectedOption = {
  name?: string;
  value?: any;
};

const optionalKeys = ['number_of_employees', 'industry_class'];

class Register extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      response: '',
      registerInput: {
        user_name: '',
        password: '',
        confirm_password: '',
        email: '',
        company_name: '',
        industry_class: '',
        number_of_employees: 0,
        fiscal_start_date: '',
        fiscal_end_date: '',
        founded_date: '',
      },
      errors: {
        registerError: '',
        isRequired: {
          user_name: false,
          password: false,
          confirm_password: false,
          email: false,
          company_name: false,
          fiscal_start_date: false,
          fiscal_end_date: false,
          founded_date: false,
        },
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>, selectedOption?: SelectedOption): void {
    const registerInput = { ...this.state.registerInput };
    const errors = { ...this.state.errors };
    let inputValue = e.target.value;
    let targetName = e.target.name;
    // DropDownのみe.targetから値取得できないため
    if (selectedOption && selectedOption.value && selectedOption.name) {
      inputValue = selectedOption.value;
      targetName = selectedOption.name;
    }
    if (isEmpty(inputValue)) {
      errors['isRequired'][targetName] = true;
      this.setState({ errors });
      return;
    }
    errors['isRequired'][targetName] = false;
    this.setState({ errors });

    registerInput[targetName] = inputValue;
    this.setState({ registerInput });
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const registerInputs = this.state.registerInput;

    const {
      user_name,
      email,
      password,
      confirm_password,
      company_name,
      industry_class,
      number_of_employees,
      fiscal_start_date,
      fiscal_end_date,
      founded_date,
    } = this.state.registerInput;
    const errors = { ...this.state.errors };

    // check required fields
    for (const key of Object.keys(registerInputs)) {
      if (optionalKeys.includes(key)) {
        continue;
      }
      if (isEmpty(registerInputs[key])) {
        errors['registerError'] = this.props.intl.formatMessage({
          id: 'register.inputRequiredError',
          defaultMessage: '必須項目が入力されていません。',
        });
        return this.setState({ errors });
      }
    }

    // // check password
    if (password !== confirm_password) {
      errors['registerError'] = this.props.intl.formatMessage({
        id: 'register.confirmPasswordError',
        defaultMessage: 'パスワードとパスワード(確認)が一致しません。',
      });
      return this.setState({ errors });
    }
    if (!isValidPassword(password)) {
      errors['registerError'] = this.props.intl.formatMessage({
        id: 'register.passwordStrengthError',
        defaultMessage: 'パスワードは半角英字と半角数字を組み合わせた6文字以上で設定してください。',
      });
      return this.setState({ errors });
    }

    axios
      .post('/api/register', {
        user_name: user_name,
        email: email,
        password: password,
        company_name: company_name,
        industry_class: industry_class,
        number_of_employees: number_of_employees,
        fiscal_start_date: fiscal_start_date,
        fiscal_end_date: fiscal_end_date,
        founded_date: founded_date,
      })
      .then((response: any) => {
        axios
          .post('/api/login', {
            email: email,
            password: password,
          })
          .then((response: any) => {
            localStorage.setItem('token', response.data.token);
            this.props.history.push('/completed');
          });
      })
      .catch((error: any) => {
        if (error.response.data.isDuplicate === true) {
          errors['registerError'] = this.props.intl.formatMessage({
            id: 'register.duplicateEmailError',
            defaultMessage: 'このメールアドレスは既に登録されています。',
          });
          return this.setState({ errors });
        }
        errors['registerError'] = this.props.intl.formatMessage({
          id: 'register.registerError',
          defaultMessage:
            '何らかのエラーが発生しています。申し訳ありませんが時間を空けて再度ご登録下さい。',
        });
        return this.setState({ errors });
      });
  }

  render(): React.ReactNode {
    const { registerError, isRequired } = this.state.errors;
    const industryOptions = this.props.language === 'ja' ? industryOptionsJa : industryOptionsEn;

    return (
      <RegisterWrapper>
        <LanguageSection>
          <LanguageDropdown height={'5%'} />
        </LanguageSection>
        <RegisterContainer>
          <RegisterSection>
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
            <RegisterTitle>
              <FormattedMessage id="register.registerMessage" defaultMessage="アカウント新規作成" />
            </RegisterTitle>
            <br />
            <form
              style={{
                width: '60%',
              }}
              onSubmit={this.handleSubmit}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'left',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <label htmlFor="name" style={{ marginBottom: '5px' }}>
                  <RequiredMark>*</RequiredMark>
                  {this.props.intl.formatMessage({
                    id: 'register.fieldUserName',
                    defaultMessage: 'ユーザー名',
                  })}
                </label>
                <Input
                  id="name"
                  name="user_name"
                  type="text"
                  placeholder="Name"
                  onChange={(e) => this.handleChange(e)}
                />
                {isRequired.user_name && (
                  <span style={{ color: 'red', marginTop: '10px' }}>
                    {this.props.intl.formatMessage({
                      id: 'register.fieldUserName',
                      defaultMessage: 'ユーザー名',
                    })}
                    {this.props.intl.formatMessage({
                      id: 'register.requiredError',
                      defaultMessage: 'は入力必須項目です。',
                    })}
                  </span>
                )}
                <label htmlFor="email" style={{ marginTop: '15px', marginBottom: '5px' }}>
                  <RequiredMark>*</RequiredMark>
                  {this.props.intl.formatMessage({
                    id: 'register.fieldEmail',
                    defaultMessage: 'メールアドレス',
                  })}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={(e) => this.handleChange(e)}
                />
                {isRequired.email && (
                  <span style={{ color: 'red', marginTop: '10px' }}>
                    {this.props.intl.formatMessage({
                      id: 'register.fieldEmail',
                      defaultMessage: 'メールアドレス',
                    })}
                    {this.props.intl.formatMessage({
                      id: 'register.requiredError',
                      defaultMessage: 'は入力必須項目です。',
                    })}
                  </span>
                )}
                <label htmlFor="password" style={{ marginTop: '15px', marginBottom: '5px' }}>
                  <RequiredMark>*</RequiredMark>
                  {this.props.intl.formatMessage({
                    id: 'register.fieldPassword',
                    defaultMessage: 'パスワード',
                  })}
                </label>
                <Popup
                  content={this.props.intl.formatMessage({
                    id: 'register.passwordStrengthError',
                    defaultMessage:
                      'パスワードは半角英字と半角数字を組み合わせた6文字以上で設定してください。',
                  })}
                  trigger={
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => this.handleChange(e)}
                    />
                  }
                />
                {isRequired.password && (
                  <span style={{ color: 'red', marginTop: '10px' }}>
                    {this.props.intl.formatMessage({
                      id: 'register.fieldPassword',
                      defaultMessage: 'パスワード',
                    })}
                    {this.props.intl.formatMessage({
                      id: 'register.requiredError',
                      defaultMessage: 'は入力必須項目です。',
                    })}
                  </span>
                )}
                <label
                  htmlFor="confirm_password"
                  style={{ marginTop: '15px', marginBottom: '5px' }}
                >
                  <RequiredMark>*</RequiredMark>
                  {this.props.intl.formatMessage({
                    id: 'register.fieldConfirmPassword',
                    defaultMessage: 'パスワード(確認)',
                  })}
                </label>
                <Input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm password"
                  onChange={(e) => this.handleChange(e)}
                />
                {isRequired.confirm_password && (
                  <span style={{ color: 'red', marginTop: '10px' }}>
                    {this.props.intl.formatMessage({
                      id: 'register.fieldConfirmPassword',
                      defaultMessage: 'パスワード(確認)',
                    })}
                    {this.props.intl.formatMessage({
                      id: 'register.requiredError',
                      defaultMessage: 'は入力必須項目です。',
                    })}
                  </span>
                )}
                <label htmlFor="company_name" style={{ marginTop: '15px', marginBottom: '5px' }}>
                  <RequiredMark>*</RequiredMark>
                  {this.props.intl.formatMessage({
                    id: 'register.fieldCompanyName',
                    defaultMessage: '事業所名(会社名)',
                  })}
                </label>
                <Input
                  id="company_name"
                  name="company_name"
                  type="text"
                  placeholder="Company name"
                  onChange={(e) => this.handleChange(e)}
                />
                {isRequired.company_name && (
                  <span style={{ color: 'red', marginTop: '10px' }}>
                    {this.props.intl.formatMessage({
                      id: 'register.fieldCompanyName',
                      defaultMessage: '事業所名(会社名)',
                    })}
                    {this.props.intl.formatMessage({
                      id: 'register.requiredError',
                      defaultMessage: 'は入力必須項目です。',
                    })}
                  </span>
                )}
                <label htmlFor="industry_class" style={{ marginTop: '15px', marginBottom: '5px' }}>
                  {this.props.intl.formatMessage({
                    id: 'register.fieldIndustry',
                    defaultMessage: '業種',
                  })}
                </label>
                <Dropdown
                  id="industry_class"
                  name="industry_class"
                  placeholder="Industry"
                  fluid
                  selection
                  options={industryOptions}
                  onChange={(e: any, { name, value }) => this.handleChange(e, { name, value })}
                />
                <label
                  htmlFor="number_of_employees"
                  style={{ marginTop: '15px', marginBottom: '5px' }}
                >
                  {this.props.intl.formatMessage({
                    id: 'register.fieldNumberOfEmployees',
                    defaultMessage: '従業員数',
                  })}
                </label>
                <Input
                  id="number_of_employees"
                  name="number_of_employees"
                  type="number"
                  placeholder="Number of the employees"
                  onChange={(e) => this.handleChange(e)}
                />
                <label htmlFor="company_name" style={{ marginTop: '15px', marginBottom: '5px' }}>
                  <RequiredMark>*</RequiredMark>
                  {this.props.intl.formatMessage({
                    id: 'register.fieldFoundedDate',
                    defaultMessage: '設立年月日',
                  })}
                </label>
                <Input
                  id="founded_date"
                  name="founded_date"
                  type="date"
                  placeholder="Founded date"
                  onChange={(e) => this.handleChange(e)}
                />
                {isRequired.founded_date && (
                  <span style={{ color: 'red', marginTop: '10px' }}>
                    {this.props.intl.formatMessage({
                      id: 'register.fieldFoundedDate',
                      defaultMessage: '設立年月日',
                    })}
                    {this.props.intl.formatMessage({
                      id: 'register.requiredError',
                      defaultMessage: 'は入力必須項目です。',
                    })}
                  </span>
                )}
                <label htmlFor="fiscal_year" style={{ marginTop: '15px', marginBottom: '5px' }}>
                  <RequiredMark>*</RequiredMark>
                  {this.props.intl.formatMessage({
                    id: 'register.fieldFiscalYear',
                    defaultMessage: '会計年度',
                  })}
                </label>
                <div>
                  <Input
                    id="fiscal_start_date"
                    name="fiscal_start_date"
                    type="date"
                    style={{ width: '45%' }}
                    onChange={(e) => this.handleChange(e)}
                  />
                  &nbsp;&nbsp;~&nbsp;&nbsp;
                  <Input
                    id="fiscal_end_date"
                    name="fiscal_end_date"
                    type="date"
                    style={{ width: '45%' }}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                {isRequired.fiscal_start_date ||
                  (isRequired.fiscal_end_date && (
                    <span style={{ color: 'red', marginTop: '10px' }}>
                      {this.props.intl.formatMessage({
                        id: 'register.fieldFiscalYear',
                        defaultMessage: '会計年度',
                      })}
                      {this.props.intl.formatMessage({
                        id: 'register.requiredError',
                        defaultMessage: 'は入力必須項目です。',
                      })}
                    </span>
                  ))}
                {registerError && (
                  <span style={{ color: 'red', marginTop: '10px' }}>{registerError}</span>
                )}
                <Button type="submit" style={{ color: 'black', marginTop: '25px' }} size="large">
                  <FormattedMessage id="register.registerButton" defaultMessage="登録" />
                </Button>
              </div>
            </form>
          </RegisterSection>
          <Link style={{ marginTop: '15px' }} to="/login">
            <span style={{ color: mainColor }}>
              <FormattedMessage
                id="register.alreadyHaveAccount"
                defaultMessage="すでにアカウントをお持ちの方"
              />
            </span>
          </Link>
        </RegisterContainer>
      </RegisterWrapper>
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

const RegisterTitle = styled.span`
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

const RegisterWrapper = styled.div`
  width: 100%;
  background: ${backGroundColor};
  padding-bottom: 50px;
`;

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

const RegisterSection = styled.div`
  width: 45%;
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
`;

const RequiredMark = styled.span`
  color: red;
  font-size: 22px;
`;

function mapStateToProps(state: ReduxState) {
  return {
    language: state.ui.language.locale,
    user: state.data.user,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    loadUser: () => dispatch(fetchUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Register));
