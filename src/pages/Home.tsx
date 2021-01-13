import React from 'react';
import styled from 'styled-components';
import axios from '../utils/axios';
import AccountCard from '../components/AccountCard';
import Chart from 'react-google-charts';
import { UserState } from '../types/user';
import { CompanyState } from '../types/company';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';

type Props = any;
type State = any;

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      accounts: {
        cash: 0,
        savings_accounts_amount: 0,
        checking_accounts_amount: 0,
        total_cash_amount: 0,
      },
      amounts: {
        journalsCredit: [],
        journalsDebit: [],
        originJournalsCredit: [],
        originJournalsDebit: [],
        total_cash_each_month_amounts: [],
      },
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
          isError: true,
        });
      });
  }

  render(): React.ReactNode {
    console.log('this.state: ', this.state);

    const {
      cash,
      savings_accounts_amount,
      checking_accounts_amount,
      total_cash_amount,
      total_cash_each_month_amounts,
    } = this.state.accounts;

    const options = {
      title: '現預金 残高推移',
      legend: { position: 'bottom' },
    };

    const data = total_cash_each_month_amounts;

    return (
      <div style={{ minHeight: '670px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={{ width: '20%', marginLeft: 30, marginTop: '20px' }}>
            <AccountCard title={'現預金 残高合計'} amount={total_cash_amount.toLocaleString()} />
            <AccountCard title={'現金'} amount={cash.toLocaleString()} />
            <AccountCard title={'普通預金'} amount={savings_accounts_amount.toLocaleString()} />
            <AccountCard title={'当座預金'} amount={checking_accounts_amount.toLocaleString()} />
          </div>
          <Chart
            style={{ marginTop: '20px' }}
            chartType="LineChart"
            width="95%"
            height="430px"
            data={data}
            options={options}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: UserState) {
  return {
    user: state.data.user,
    company: state.data.user.company,
  };
}

export default connect(mapStateToProps)(injectIntl(Home));
