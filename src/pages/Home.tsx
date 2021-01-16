import React from 'react';
import axios from '../utils/axios';
import AccountCard from '../components/AccountCard';
import Chart from 'react-google-charts';
import { UserState } from '../types/user';
import { CompanyState } from '../types/company';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import Loading from '../components/Loading';

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
  accounts: {
    cash: number;
    savings_accounts_amount: number;
    checking_accounts_amount: number;
    total_cash_amount: number;
    total_cash_each_month_amounts: Array<any>;
  };
  isServerError: boolean;
};

type ReduxState = UserState & CompanyState;

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      accounts: {
        cash: 0,
        savings_accounts_amount: 0,
        checking_accounts_amount: 0,
        total_cash_amount: 0,
        total_cash_each_month_amounts: [],
      },
      isServerError: false,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/home/${this.props.company.id}`)
      .then((response: any) => {
        this.setState({ accounts: response.data });
      })
      .catch(() => {
        return this.setState({
          isServerError: true,
        });
      });
  }

  render(): React.ReactNode {
    const {
      cash,
      savings_accounts_amount,
      checking_accounts_amount,
      total_cash_amount,
      total_cash_each_month_amounts,
    } = this.state.accounts;

    const options = {
      title: this.props.intl.formatMessage({
        id: 'common.cashEquivalentBalanceTransition',
        defaultMessage: '現預金 残高推移',
      }),
      legend: { position: 'bottom' },
    };

    if (this.state.isServerError) {
      return (
        <FormattedMessage
          id="error.serverError"
          defaultMessage="何らかのエラーが発生しています。申し訳ありませんが時間を空けて再度お試し下さい。"
        />
      );
    }

    if (total_cash_each_month_amounts.length === 0) {
      return <Loading isDataFetching={true} />;
    }

    return (
      <div style={{ minHeight: '670px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={{ width: '20%', marginLeft: 30, marginTop: '20px' }}>
            <AccountCard
              title={this.props.intl.formatMessage({
                id: 'common.cashEquivalentTotalBalance',
                defaultMessage: '現預金 残高合計',
              })}
              amount={total_cash_amount.toLocaleString()}
            />
            <AccountCard
              title={this.props.intl.formatMessage({
                id: 'general.cash',
                defaultMessage: '現金',
              })}
              amount={cash.toLocaleString()}
            />
            <AccountCard
              title={this.props.intl.formatMessage({
                id: 'general.savings_accounts',
                defaultMessage: '普通預金',
              })}
              amount={savings_accounts_amount.toLocaleString()}
            />
            <AccountCard
              title={this.props.intl.formatMessage({
                id: 'general.checking_accounts',
                defaultMessage: '当座預金',
              })}
              amount={checking_accounts_amount.toLocaleString()}
            />
          </div>
          <Chart
            style={{ marginTop: '20px' }}
            chartType="LineChart"
            width="95%"
            height="430px"
            data={total_cash_each_month_amounts}
            options={options}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: ReduxState) {
  return {
    user: state.data.user,
    company: state.data.user.company,
  };
}

export default connect(mapStateToProps)(injectIntl(Home));
