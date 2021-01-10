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

type OwnProps = {
  company: CompanyState;
  user: {
    id: string;
    name: string;
    company: CompanyState;
    isUserDataFetching: boolean;
    isUserDataFetched: boolean;
  };
};
type Props = OwnProps & WrappedComponentProps;
type State = {
  journals: Array<any>;
  isError: boolean;
};

class Journal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      journals: [],
      isError: false,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/journals/${this.props.company.id}`)
      .then((response) => {
        this.setState({ journals: response.data });
      })
      .catch(() => {
        return this.setState({
          isError: true,
        });
      });
  }

  render(): React.ReactNode {
    const { journals, isError } = this.state;

    if (isError) {
      return (
        <FormattedMessage
          id="error.serverError"
          defaultMessage="何らかのエラーが発生しています。申し訳ありませんが時間を空けて再度お試し下さい。"
        />
      );
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                <FormattedMessage id="common.edit" defaultMessage="編集" />
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
                    <form>
                      {!journal.is_multiple_journal && <EditButton type="submit" value="Edit" />}
                    </form>
                  </TableData>
                </tr>
              );
            })}
          </tbody>
        </table>
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
const EditButton = styled.input`
  font-size: 14px;
  display: block;
  font-family: HiraginoSans;
  font-weight: 300;
  margin-left: 10px;
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

export default connect(mapStateToProps)(injectIntl(Journal));
