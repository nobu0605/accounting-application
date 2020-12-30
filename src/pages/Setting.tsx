import React from 'react';
import styled from 'styled-components';
import axios from '../utils/axios';
import { UserState } from '../types/user';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { mainColor } from '../constants/style';
import { Button } from 'semantic-ui-react';
import { AccountType } from '../types/account';

type Props = any;
type State = {
  accounts: Array<any>;
  isError: boolean;
};

class Setting extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      accounts: [],
      isError: false,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/accounts/${this.props.company.id}`)
      .then((response) => {
        this.setState({ accounts: response.data });
      })
      .catch(() => {
        return this.setState({
          isError: true,
        });
      });
  }

  handleChange(e: any, input: any) {
    // this.setState({ [input]: e.target.value });
  }

  handleSubmit(e: any) {
    e.preventDefault();
  }

  handleDeletion(e: any, id: any) {
    e.preventDefault();
    if (!confirm('本当に削除しますか?')) {
      return;
    }
  }

  render(): React.ReactNode {
    const { accounts, isError } = this.state;

    if (isError) {
      return (
        <FormattedMessage
          id="error.serverError"
          defaultMessage="何らかのエラーが発生しています。申し訳ありませんが時間を空けて再度ログインして下さい。"
        />
      );
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            height: '100%',
            width: '80%',
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
                <input
                  style={{ fontSize: 20, marginLeft: 10, border: 'solid 1px #DDDDDD' }}
                  type="text"
                  onChange={(e: any) => this.handleChange(e, 'account')}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <label>
                  <FormattedMessage id="common.classification" defaultMessage="区分" />
                </label>
                <select
                  style={{ fontSize: 12, marginLeft: 10 }}
                  onChange={(e) => this.handleChange(e, 'type')}
                >
                  <option value="">
                    {this.props.intl.formatMessage({
                      id: 'common.select',
                      defaultMessage: '選択してください',
                    })}
                  </option>
                  {accounts.map((account: AccountType, Index: number) => {
                    return (
                      <option key={Index} value={account.account_key}>
                        {account.is_default_account
                          ? this.props.intl.formatMessage({
                              id: `general.${account.account_key}`,
                              defaultMessage: account.name,
                            })
                          : account.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <RegisterButton>
                  <FormattedMessage id="common.register" defaultMessage="登録" />
                </RegisterButton>
              </div>
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
                    <TableData>
                      <form onSubmit={(e) => this.handleDeletion(e, account.id)}>
                        <Button type="submit" size="small">
                          Delete
                        </Button>
                      </form>
                    </TableData>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
const RegisterButton = styled.button`
  font-size: 14px;
  display: block;
  font-family: HiraginoSans;
  font-weight: 300;
  margin-top: 20px;
  line-height: 1;
  padding: 8px 20px 8px 20px;
  border-radius: 10px;
  background: ${mainColor};
  border-style: none;
  color: white;
`;

function mapStateToProps(state: UserState) {
  return {
    user: state.data.user,
    company: state.data.user.company,
  };
}

export default connect(mapStateToProps)(injectIntl(Setting));
