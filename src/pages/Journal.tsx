import React from 'react';
import styled from 'styled-components';
import axios from '../utils/axios';
import moment from 'moment';
import { UserState } from '../types/user';
import { CompanyState } from '../types/company';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import { mainColor } from '../constants/style';
import { JournalType } from '../types/journal';
import Loading from '../components/Loading';
import { Button } from 'semantic-ui-react';
import history from 'history';

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
};
type Props = OwnProps & WrappedComponentProps;
type State = {
  journals: Array<any>;
  errors: {
    isServerError: boolean;
    isDeletionError: boolean;
  };
};

class Journal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      journals: [],
      errors: {
        isServerError: false,
        isDeletionError: false,
      },
    };
    this.handleDeletion = this.handleDeletion.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/journals/${this.props.company.id}`)
      .then((response) => {
        this.setState({ journals: response.data });
      })
      .catch(() => {
        const errors = { ...this.state.errors };
        errors['isServerError'] = true;
        return this.setState({ errors });
      });
  }

  handleDeletion(e: React.FormEvent<HTMLFormElement>, journalId: number) {
    e.preventDefault();
    if (
      !confirm(
        `${this.props.intl.formatMessage({
          id: 'journal.deleteJournalConfirm',
          defaultMessage: '本当に削除しますか?',
        })}`
      )
    ) {
      return;
    }
    const errors = { ...this.state.errors };
    axios
      .delete(`/api/journals/${journalId}`)
      .then(() => {
        // todo: Make sure whether this implementation is correct.
        this.props.history.push({
          pathname: '/',
        });
        this.props.history.push({
          pathname: '/journal',
        });
      })
      .catch(() => {
        errors['isDeletionError'] = true;
        return this.setState({ errors });
      });
  }

  render(): React.ReactNode {
    const { journals } = this.state;
    const { isServerError, isDeletionError } = this.state.errors;

    if (isServerError) {
      return (
        <FormattedMessage
          id="error.serverError"
          defaultMessage="何らかのエラーが発生しています。申し訳ありませんが時間を空けて再度お試し下さい。"
        />
      );
    }

    if (journals.length === 0) {
      return <Loading isDataFetching={true} />;
    }

    return (
      <div style={{ textAlign: 'center' }}>
        {isDeletionError && (
          <span style={{ color: 'red', fontSize: '18px' }}>
            <br />
            {this.props.intl.formatMessage({
              id: 'error.serverError',
              defaultMessage:
                '何らかのエラーが発生しています。申し訳ありませんが時間を空けて再度お試し下さい。',
            })}
          </span>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '670px' }}>
          <table
            style={{
              margin: 20,
              background: 'white',
              borderBottom: 'solid 1px #ddd',
              borderRight: 'solid 1px #ddd',
            }}
          >
            <thead style={{ background: '#DDDDDD' }}>
              <tr>
                <TableData>
                  <FormattedMessage id="journal.dealDate" defaultMessage="取引日" />
                </TableData>
                <TableData>
                  <FormattedMessage id="journal.debitAccountName" defaultMessage="借方科目" />
                </TableData>
                <TableData>
                  <FormattedMessage id="journal.subAccount" defaultMessage="補助科目" />
                </TableData>
                <TableData>
                  <FormattedMessage id="journal.debitAmount" defaultMessage="借方金額" />
                </TableData>
                <TableData>
                  <FormattedMessage id="journal.creditAccountName" defaultMessage="貸方科目" />
                </TableData>
                <TableData>
                  <FormattedMessage id="journal.subAccount" defaultMessage="補助科目" />
                </TableData>
                <TableData>
                  <FormattedMessage id="journal.creditAmount" defaultMessage="貸方金額" />
                </TableData>
                <TableData>
                  <FormattedMessage id="journal.remark" defaultMessage="摘要" />
                </TableData>
                <TableData>
                  <FormattedMessage id="common.delete" defaultMessage="削除" />
                </TableData>
              </tr>
            </thead>
            <tbody>
              {journals.map((journal: JournalType, Index: number) => {
                return (
                  <tr key={Index}>
                    <TableData
                      style={{
                        borderTop: journal.is_multiple_journal ? 'none' : '1px solid #ddd',
                      }}
                    >
                      {!journal.is_multiple_journal && moment(journal.deal_date).format('Y/M/DD')}
                    </TableData>
                    <TableData>
                      {journal.is_default_account_debit ? (
                        <FormattedMessage
                          id={`general.${journal.debit_account_key}`}
                          defaultMessage={' '}
                        />
                      ) : (
                        journal.debit_account_name
                      )}
                    </TableData>
                    <TableData>{journal.debit_sub_account_key}</TableData>
                    <TableData>{journal.debit_amount.toLocaleString()}</TableData>
                    <TableData>
                      {journal.is_default_account_credit ? (
                        <FormattedMessage
                          id={`general.${journal.credit_account_key}`}
                          defaultMessage={' '}
                        />
                      ) : (
                        journal.credit_account_name
                      )}
                    </TableData>
                    <TableData>{journal.credit_sub_account_key}</TableData>
                    <TableData>{journal.credit_amount.toLocaleString()}</TableData>
                    <TableData>{journal.remark}</TableData>
                    <TableData
                      style={{
                        borderTop: journal.is_multiple_journal ? 'none' : '1px solid #ddd',
                      }}
                    >
                      {!journal.is_multiple_journal && (
                        <Button
                          onClick={(e: any) => this.handleDeletion(e, journal.id)}
                          style={{
                            background: mainColor,
                            color: 'white',
                            borderRadius: '10px',
                          }}
                        >
                          <FormattedMessage id="common.delete" defaultMessage="削除" />
                        </Button>
                      )}
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
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
`;

function mapStateToProps(state: UserState) {
  return {
    user: state.data.user,
    company: state.data.user.company,
  };
}

export default connect(mapStateToProps)(injectIntl(Journal));
