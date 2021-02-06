import React from 'react';
import styled from 'styled-components';
import axios from '../utils/axios';
import { isValidAccountKey, isEmpty } from '../utils/validations';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import { mainColor } from '../constants/style';
import { Button, Message, Icon, Popup } from 'semantic-ui-react';
import { AccountType } from '../types/account';
import { classifications } from '../constants/classifications';
import { UserState } from '../types/user';
import { CompanyState } from '../types/company';
import Loading from '../components/Loading';
import history, { createBrowserHistory } from 'history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type OwnProps = {
  company: CompanyState;
  user: {
    id: string;
    name: string;
    company: CompanyState;
    isUserDataFetching: boolean;
    isUserDataFetched: boolean;
  };
  history: history.History;
  location: history.Location<any>;
};
type Props = OwnProps & WrappedComponentProps;

type ReduxState = UserState & CompanyState;

type State = {
  accounts: Array<any>;
  accountInputs: {
    name: string;
    account_key: string;
    classification: string;
    [key: string]: any;
  };
  errors: {
    isInvalidAccountKey: boolean;
    isDuplicateAccountKey: boolean;
    isRequired: {
      name: boolean;
      account_key: boolean;
      classification: boolean;
      [key: string]: any;
    };
    isRegistrationFailure: boolean;
    deletionErrorId: null | number;
    isServerError: boolean;
  };
  hideSuccessMessage: boolean;
};

class Setting extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      accounts: [],
      accountInputs: {
        name: '',
        account_key: '',
        classification: '',
      },
      errors: {
        isInvalidAccountKey: false,
        isDuplicateAccountKey: false,
        isRequired: {
          name: false,
          account_key: false,
          classification: false,
        },
        isRegistrationFailure: false,
        deletionErrorId: null,
        isServerError: false,
      },
      hideSuccessMessage: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDeletion = this.handleDeletion.bind(this);
    this.hideMessage = this.hideMessage.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/accounts/${this.props.company.id}`)
      .then((response) => {
        this.setState({ accounts: response.data });
      })
      .catch(() => {
        const errors = { ...this.state.errors };
        errors['isServerError'] = true;
        return this.setState({ errors });
      });

    // Reset history.location.state
    const history: history.History<any> = createBrowserHistory();
    if (history.location.state && history.location.state.isDoneRegistration) {
      const state = { ...history.location.state };
      delete state.isDoneRegistration;
      history.replace({ ...history.location, state });
    }
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const errors = { ...this.state.errors };

    // Check account_key
    if (e.target.name === 'account_key') {
      if (!isValidAccountKey(e.target.value)) {
        errors['isInvalidAccountKey'] = true;
        this.setState({ errors });
        return;
      }
      errors['isInvalidAccountKey'] = false;
      this.setState({ errors });
    }

    if (isEmpty(e.target.value)) {
      errors['isRequired'][e.target.name] = true;
      this.setState({ errors });
      return;
    }
    errors['isRequired'][e.target.name] = false;
    this.setState({ errors });

    const accountInputs = { ...this.state.accountInputs };
    accountInputs[e.target.name] = e.target.value;
    this.setState({ accountInputs });
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const accountInputs = this.state.accountInputs;
    const errors = { ...this.state.errors };

    // check required fields
    for (const key of Object.keys(accountInputs)) {
      if (isEmpty(accountInputs[key])) {
        errors['isRequired'][key] = true;
        return this.setState({ errors });
      }
    }

    const { name, account_key, classification } = this.state.accountInputs;
    axios
      .post('/api/accounts/new', {
        company_id: this.props.company.id,
        name: name,
        account_key: account_key,
        classification: classification,
      })
      .then(() => {
        // todo: Make sure whether this implementation is correct.
        this.props.history.push({
          pathname: '/',
        });
        this.props.history.push({
          pathname: '/setting',
          state: { isDoneRegistration: true },
        });
      })
      .catch((error: any) => {
        if (error.response.data.isDuplicate === true) {
          errors['isDuplicateAccountKey'] = true;
          return this.setState({ errors });
        }
        errors['isRegistrationFailure'] = true;
        return this.setState({ errors });
      });
  }

  handleDeletion(e: React.FormEvent<HTMLFormElement>, accountId: number, accountName: string) {
    e.preventDefault();
    if (
      !confirm(
        `${this.props.intl.formatMessage(
          {
            id: 'common.deleteAccount',
          },
          {
            defaultMessage: '勘定科目 {accountName} を本当に削除しますか?',
            accountName: accountName,
          }
        )}`
      )
    ) {
      return;
    }
    const errors = { ...this.state.errors };
    axios
      .delete(`/api/accounts/${accountId}`)
      .then(() => {
        // todo: Make sure whether this implementation is correct.
        this.props.history.push({
          pathname: '/',
        });
        this.props.history.push({
          pathname: '/setting',
        });
      })
      .catch(() => {
        errors['deletionErrorId'] = accountId;
        return this.setState({ errors });
      });
  }

  hideMessage() {
    this.setState({ hideSuccessMessage: true });
  }

  render(): React.ReactNode {
    const { accounts } = this.state;
    const {
      isServerError,
      isInvalidAccountKey,
      isRegistrationFailure,
      isDuplicateAccountKey,
      isRequired,
      deletionErrorId,
    } = this.state.errors;
    const isDoneRegistration = this.props.location.state
      ? this.props.location.state.isDoneRegistration
      : false;

    if (isServerError) {
      return (
        <FormattedMessage
          id="error.serverError"
          defaultMessage="何らかのエラーが発生しています。申し訳ありませんが時間を空けて再度お試し下さい。"
        />
      );
    }

    if (accounts.length === 0) {
      return <Loading isDataFetching={true} />;
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {isDoneRegistration && !this.state.hideSuccessMessage && (
          <Message
            style={{
              marginTop: '20px',
              color: '#1a531b',
              fontSize: '1.14285714em',
              fontWeight: 600,
            }}
            success
          >
            {this.props.intl.formatMessage({
              id: 'setting.registerAccount',
              defaultMessage: '勘定科目を登録しました。',
            })}
            <FontAwesomeIcon
              icon="times-circle"
              style={{
                marginLeft: '8px',
              }}
              onClick={() => this.hideMessage()}
            />
          </Message>
        )}
        <div style={{ height: '100%', width: '80%', display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              background: 'white',
              display: 'flex',
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            <div style={{ marginTop: 40, marginLeft: 40 }}>
              <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
                <FormattedMessage id="common.accountList" defaultMessage="勘定科目一覧" />
              </span>
              <div style={{ marginTop: 45, marginBottom: '20px' }}>
                <span style={{ color: mainColor, fontWeight: 'bold' }}>
                  <FormattedMessage id="common.registerAccount" defaultMessage="勘定科目登録" />
                </span>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label>
                    <FormattedMessage id="common.account" defaultMessage="勘定科目" />
                  </label>
                  <br />
                  <input
                    style={{ fontSize: 20, border: 'solid 1px #DDDDDD' }}
                    type="text"
                    name="name"
                    onChange={(e: any) => this.handleChange(e)}
                  />
                </div>
                {isRequired.name && (
                  <span style={{ color: 'red', marginTop: '10px' }}>
                    <FormattedMessage id="common.account" defaultMessage="勘定科目" />
                    {this.props.intl.formatMessage({
                      id: 'register.requiredError',
                      defaultMessage: 'は入力必須項目です。',
                    })}
                  </span>
                )}
                <div style={{ marginTop: 20 }}>
                  <label>
                    <FormattedMessage id="common.accountKey" defaultMessage="アカウントキー" />
                  </label>
                  <Popup
                    trigger={<Icon style={{ boxShadow: 'none' }} circular name="question circle" />}
                    content={this.props.intl.formatMessage({
                      id: 'setting.validAccountKey',
                      defaultMessage:
                        'アカウントキーは半角英字とアンダーバーのみで入力してください。',
                    })}
                    size="small"
                  />
                  <br />
                  <input
                    style={{ fontSize: 20, border: 'solid 1px #DDDDDD' }}
                    type="text"
                    name="account_key"
                    onChange={(e: any) => this.handleChange(e)}
                  />
                </div>
                {isInvalidAccountKey && (
                  <span style={{ color: 'red', marginTop: '10px' }}>
                    {this.props.intl.formatMessage({
                      id: 'setting.validAccountKey',
                      defaultMessage:
                        'アカウントキーは半角英字とアンダーバーのみで入力してください。',
                    })}
                  </span>
                )}
                {isDuplicateAccountKey && (
                  <span style={{ color: 'red', marginTop: '10px' }}>
                    {this.props.intl.formatMessage({
                      id: 'register.fieldUserNam',
                      defaultMessage: 'このアカウントキーは既に登録済みです。',
                    })}
                  </span>
                )}
                {isRequired.account_key && (
                  <span style={{ color: 'red', marginTop: '10px' }}>
                    <FormattedMessage id="common.accountKey" defaultMessage="アカウントキー" />
                    {this.props.intl.formatMessage({
                      id: 'register.requiredError',
                      defaultMessage: 'は入力必須項目です。',
                    })}
                  </span>
                )}
                <div style={{ marginTop: 20 }}>
                  <label>
                    <FormattedMessage id="common.classification" defaultMessage="区分" />
                  </label>
                  <br />
                  <select
                    name="classification"
                    style={{ fontSize: 12 }}
                    onChange={(e: any) => this.handleChange(e)}
                  >
                    <option value="">
                      {this.props.intl.formatMessage({
                        id: 'common.select',
                        defaultMessage: '選択してください',
                      })}
                    </option>
                    {classifications.map((classification: string, Index: number) => {
                      return (
                        <option key={Index} value={classification}>
                          {this.props.intl.formatMessage({
                            id: `general.${classification}`,
                            defaultMessage: classification,
                          })}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {isRequired.classification && (
                  <span style={{ color: 'red', marginTop: '10px' }}>
                    <FormattedMessage id="common.classification" defaultMessage="区分" />
                    {this.props.intl.formatMessage({
                      id: 'register.requiredError',
                      defaultMessage: 'は入力必須項目です。',
                    })}
                  </span>
                )}
                <div style={{ marginBottom: '10px' }}>
                  <Button
                    disabled={isInvalidAccountKey}
                    style={{
                      background: mainColor,
                      color: 'white',
                      borderRadius: '10px',
                      marginTop: '20px',
                    }}
                  >
                    <FormattedMessage id="common.register" defaultMessage="登録" />
                  </Button>
                </div>
                {isRegistrationFailure && (
                  <span style={{ color: 'red' }}>
                    <FormattedMessage
                      id="error.serverError"
                      defaultMessage="何らかのエラーが発生しています。申し訳ありませんが時間を空けて再度お試し下さい。"
                    />
                  </span>
                )}
              </form>
            </div>

            <table style={{ margin: 20 }}>
              <thead style={{ background: '#DDDDDD' }}>
                <tr>
                  <TableData>
                    <FormattedMessage id="common.account" defaultMessage="勘定科目" />
                  </TableData>
                  <TableData>
                    <FormattedMessage id="common.classification" defaultMessage="区分" />
                  </TableData>
                  <TableData>
                    <FormattedMessage id="common.accountKey" defaultMessage="アカウントキー" />
                  </TableData>
                  <TableData>
                    <FormattedMessage id="common.delete" defaultMessage="削除" />
                  </TableData>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account: AccountType, Index: number) => {
                  return (
                    <tr key={Index}>
                      <TableData>
                        {account.is_default_account ? (
                          <FormattedMessage
                            id={`general.${account.account_key}`}
                            defaultMessage={account.name}
                          />
                        ) : (
                          account.name
                        )}
                      </TableData>
                      <TableData>
                        <FormattedMessage
                          id={`general.${account.classification}`}
                          defaultMessage={account.classification}
                        />
                      </TableData>
                      <TableData>{account.account_key}</TableData>
                      <TableData>
                        {!account.is_default_account && (
                          <Button
                            onClick={(e: any) => this.handleDeletion(e, account.id, account.name)}
                            type="submit"
                            size="small"
                          >
                            Delete
                          </Button>
                        )}
                        {account.id === deletionErrorId && (
                          <span style={{ color: 'red', marginTop: '10px' }}>
                            {this.props.intl.formatMessage({
                              id: 'error.serverError',
                              defaultMessage:
                                '何らかのエラーが発生しています。申し訳ありませんが時間を空けて再度お試し下さい。',
                            })}
                          </span>
                        )}
                      </TableData>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const TableData = styled.td`
  height: 40px;
  padding: 10px;
  text-align: center;
  border: solid 1px #ddd;
`;

function mapStateToProps(state: ReduxState) {
  return {
    user: state.data.user,
    company: state.data.user.company,
  };
}

export default connect(mapStateToProps)(injectIntl(Setting));
