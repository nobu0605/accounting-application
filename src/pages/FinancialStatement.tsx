import React from 'react';
import styled from 'styled-components';
import axios from '../utils/axios';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { UserState } from '../types/user';
import FinancialStatementRow from '../components/FinancialStatementRow';
import TotalAmountRow from '../components/TotalAmountRow';

type Props = any;
type State = {
  financialStatement: {
    account_amounts: {
      sales: Array<any>;
      current_liabilities: Array<any>;
      non_current_liabilities: Array<any>;
      equity: Array<any>;
      special_income: Array<any>;
      non_operating_income: Array<any>;
      current_assets: Array<any>;
      non_current_assets: Array<any>;
      cost_of_goods_sold: Array<any>;
      purchases: Array<any>;
      selling_general_admin_expenses: Array<any>;
      non_operating_expenses: Array<any>;
      special_expenses: Array<any>;
      income_taxes: Array<any>;
    };
    assets_total_amount: number;
    gross_profit: number;
    income_before_income_taxes: number;
    liabilities_total_amount: number;
    liabilities_and_equity_total_amount: number;
    net_income: number;
    operating_income: number;
    ordinary_income: number;
  };
  errors: {
    isServerError: boolean;
  };
};

class FinancialStatement extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      financialStatement: {
        account_amounts: {
          sales: [],
          current_liabilities: [],
          non_current_liabilities: [],
          equity: [],
          special_income: [],
          non_operating_income: [],
          current_assets: [],
          non_current_assets: [],
          cost_of_goods_sold: [],
          purchases: [],
          selling_general_admin_expenses: [],
          non_operating_expenses: [],
          special_expenses: [],
          income_taxes: [],
        },
        assets_total_amount: 0,
        gross_profit: 0,
        income_before_income_taxes: 0,
        liabilities_total_amount: 0,
        liabilities_and_equity_total_amount: 0,
        net_income: 0,
        operating_income: 0,
        ordinary_income: 0,
      },
      errors: {
        isServerError: false,
      },
    };
  }

  componentDidMount() {
    axios
      .get(`/api/financial-statement/${this.props.company.id}`)
      .then((response) => {
        this.setState({ financialStatement: response.data });
      })
      .catch(() => {
        const errors = { ...this.state.errors };
        errors['isServerError'] = true;
        return this.setState({ errors });
      });
  }

  render(): React.ReactNode {
    const {
      account_amounts,
      assets_total_amount,
      gross_profit,
      income_before_income_taxes,
      liabilities_total_amount,
      liabilities_and_equity_total_amount,
      net_income,
      operating_income,
      ordinary_income,
    } = this.state.financialStatement;
    const {
      cost_of_goods_sold,
      current_assets,
      current_liabilities,
      equity,
      income_taxes,
      non_current_assets,
      non_current_liabilities,
      sales,
      selling_general_admin_expenses,
      special_expenses,
      non_operating_income,
      non_operating_expenses,
      special_income,
    } = account_amounts;

    if (this.state.errors.isServerError) {
      return (
        <FormattedMessage
          id="error.serverError"
          defaultMessage="何らかのエラーが発生しています。申し訳ありませんが時間を空けて再度お試し下さい。"
        />
      );
    }

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          minHeight: '670px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
          <span
            style={{
              fontSize: '23px',
              marginTop: '30px',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            <FormattedMessage id="common.balanceSheet" defaultMessage="貸借対照表" />
          </span>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <table
              style={{
                width: '50%',
                height: '100%',
                background: 'white',
                borderBottom: 'solid 1px #ddd',
                borderRight: 'solid 1px #ddd',
              }}
            >
              <thead style={{ background: '#c0c0c0' }}>
                <tr>
                  <TableData colSpan={3}>
                    <FormattedMessage id="common.assets" defaultMessage="資産の部" />
                  </TableData>
                </tr>
              </thead>
              <thead style={{ background: '#c0c0c0' }}>
                <tr>
                  <TableData height={40}>
                    <FormattedMessage id="common.classification" defaultMessage="区分" />
                  </TableData>
                  <TableData height={40}>
                    <FormattedMessage id="common.account" defaultMessage="勘定科目" />
                  </TableData>
                  <TableData height={40}>
                    <FormattedMessage id="common.amount" defaultMessage="金額" />
                  </TableData>
                </tr>
              </thead>
              <tbody>
                <FinancialStatementRow
                  accounts={current_assets}
                  intlId={'general.current_assets'}
                />
                <FinancialStatementRow
                  accounts={non_current_assets}
                  intlId={'general.non_current_assets'}
                />
                <TotalAmountRow
                  totalAmount={assets_total_amount}
                  intlId={'general.assets_total_amount'}
                />
              </tbody>
            </table>
            <table
              style={{
                width: '50%',
                height: '100%',
                background: 'white',
                borderBottom: 'solid 1px #ddd',
                borderRight: 'solid 1px #ddd',
              }}
            >
              <thead style={{ background: '#c0c0c0' }}>
                <tr>
                  <TableData colSpan={3}>
                    <FormattedMessage
                      id="general.liabilities_and_equity"
                      defaultMessage="負債の部"
                    />
                  </TableData>
                </tr>
              </thead>
              <thead style={{ background: '#c0c0c0' }}>
                <tr>
                  <TableData height={40}>
                    <FormattedMessage id="common.classification" defaultMessage="区分" />
                  </TableData>
                  <TableData height={40}>
                    <FormattedMessage id="common.account" defaultMessage="勘定科目" />
                  </TableData>
                  <TableData height={40}>
                    <FormattedMessage id="common.amount" defaultMessage="金額" />
                  </TableData>
                </tr>
              </thead>
              <tbody>
                <FinancialStatementRow
                  accounts={current_liabilities}
                  intlId={'general.current_liabilities'}
                />
                <FinancialStatementRow
                  accounts={non_current_liabilities}
                  intlId={'general.non_current_liabilities'}
                />
                <TotalAmountRow
                  totalAmount={liabilities_total_amount}
                  intlId={'general.liabilities_total_amount'}
                />
                <FinancialStatementRow accounts={equity} intlId={'general.equity'} />
                <tr>
                  <TableData></TableData>
                  <TableData>
                    <FormattedMessage id="general.retained_earnings" defaultMessage="利益剰余金" />
                  </TableData>
                  <TableData>{net_income.toLocaleString()}</TableData>
                </tr>
                <TotalAmountRow
                  totalAmount={liabilities_and_equity_total_amount}
                  intlId={'general.liabilities_and_equity_total_amount'}
                />
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px', width: '40%' }}>
          <span style={{ fontSize: '23px', marginTop: '30px', textAlign: 'center' }}>
            <FormattedMessage id="common.incomeStatement" defaultMessage="損益計算書" />
          </span>
          <table
            style={{
              margin: 20,
              background: 'white',
              borderBottom: 'solid 1px #ddd',
              borderRight: 'solid 1px #ddd',
            }}
          >
            <thead style={{ background: '#c0c0c0' }}>
              <tr>
                <TableData height={40}>
                  <FormattedMessage id="common.classification" defaultMessage="区分" />
                </TableData>
                <TableData height={40}>
                  <FormattedMessage id="common.account" defaultMessage="勘定科目" />
                </TableData>
                <TableData height={40}>
                  <FormattedMessage id="common.amount" defaultMessage="金額" />
                </TableData>
              </tr>
            </thead>
            <tbody>
              <FinancialStatementRow accounts={sales} intlId={'general.sales'} />
              <FinancialStatementRow
                accounts={cost_of_goods_sold}
                intlId={'general.cost_of_goods_sold'}
              />
              <TotalAmountRow totalAmount={gross_profit} intlId={'general.gross_profit'} />
              <FinancialStatementRow
                accounts={selling_general_admin_expenses}
                intlId={'general.selling_general_admin_expenses'}
              />
              <TotalAmountRow totalAmount={operating_income} intlId={'general.operating_income'} />
              <FinancialStatementRow
                accounts={non_operating_income}
                intlId={'general.non_operating_income'}
              />
              <FinancialStatementRow
                accounts={non_operating_expenses}
                intlId={'general.non_operating_expenses'}
              />
              <TotalAmountRow totalAmount={ordinary_income} intlId={'general.ordinary_income'} />
              <FinancialStatementRow accounts={special_income} intlId={'general.special_income'} />
              <FinancialStatementRow
                accounts={special_expenses}
                intlId={'general.special_expenses'}
              />
              <TotalAmountRow
                totalAmount={income_before_income_taxes}
                intlId={'general.income_before_income_taxes'}
              />
              <FinancialStatementRow accounts={income_taxes} intlId={'general.income_taxes'} />
              <TotalAmountRow totalAmount={net_income} intlId={'general.net_income'} />
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

export default connect(mapStateToProps)(injectIntl(FinancialStatement));
