import React from 'react';
import { RadialChart } from 'react-vis';
import axios from '../utils/axios';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import { UserState } from '../types/user';
import { CompanyState } from '../types/company';
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

type ReduxState = UserState & CompanyState;

type State = {
  ratios: {
    current_assets_ratio: number;
    non_current_assets_ratio: number;
    current_liabilities_ratio: number;
    non_current_liabilities_ratio: number;
    equity_ratio: number;
    cost_of_goods_sold_ratio: number;
    selling_general_admin_expenses_ratio: number;
    operating_income_ratio: number;
    is_fetched: boolean;
  };
  errors: {
    isServerError: boolean;
  };
};

class Report extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ratios: {
        current_assets_ratio: 0,
        non_current_assets_ratio: 0,
        current_liabilities_ratio: 0,
        non_current_liabilities_ratio: 0,
        equity_ratio: 0,
        cost_of_goods_sold_ratio: 0,
        selling_general_admin_expenses_ratio: 0,
        operating_income_ratio: 0,
        is_fetched: false,
      },
      errors: {
        isServerError: false,
      },
    };
  }

  componentDidMount() {
    axios
      .get(`/api/report/${this.props.company.id}`)
      .then((response) => {
        this.setState({ ratios: response.data });
      })
      .catch(() => {
        const errors = { ...this.state.errors };
        errors['isServerError'] = true;
        return this.setState({ errors });
      });
  }

  render(): React.ReactNode {
    const {
      current_assets_ratio,
      non_current_assets_ratio,
      current_liabilities_ratio,
      non_current_liabilities_ratio,
      equity_ratio,
      cost_of_goods_sold_ratio,
      selling_general_admin_expenses_ratio,
      operating_income_ratio,
      is_fetched,
    } = this.state.ratios;

    const assetsData = [
      {
        angle: current_assets_ratio,
        label: `${this.props.intl.formatMessage({
          id: 'general.current_assets',
          defaultMessage: '流動資産',
        })} ${isNaN(current_assets_ratio) ? 0 : current_assets_ratio * 100}%`,
        color: '#3cb371',
      },
      {
        angle: non_current_assets_ratio,
        label: `${this.props.intl.formatMessage({
          id: 'general.non_current_assets',
          defaultMessage: '固定資産',
        })} ${isNaN(non_current_assets_ratio) ? 0 : non_current_assets_ratio * 100}%`,
        color: '#00bfff',
      },
    ];

    const equityData = [
      {
        angle: current_liabilities_ratio,
        label: `${this.props.intl.formatMessage({
          id: 'general.current_liabilities',
          defaultMessage: '流動負債',
        })} ${isNaN(current_liabilities_ratio) ? 0 : current_liabilities_ratio * 100}%`,
        color: '#ffa500',
      },
      {
        angle: non_current_liabilities_ratio,
        label: `${this.props.intl.formatMessage({
          id: 'general.non_current_liabilities',
          defaultMessage: '固定負債',
        })} ${isNaN(non_current_liabilities_ratio) ? 0 : non_current_liabilities_ratio * 100}%`,
        color: '#00bfff',
      },
      {
        angle: equity_ratio,
        label: `${this.props.intl.formatMessage({
          id: 'general.equity',
          defaultMessage: '純資産',
        })} ${isNaN(equity_ratio) ? 0 : equity_ratio * 100}%`,
        color: '#3cb371',
      },
    ];

    const salesProfitData = [
      {
        angle: cost_of_goods_sold_ratio,
        label: `${this.props.intl.formatMessage({
          id: 'general.cost_of_goods_sold',
          defaultMessage: '売上原価',
        })} ${isNaN(cost_of_goods_sold_ratio) ? 0 : cost_of_goods_sold_ratio * 100}%`,
        color: '#ffa500',
      },
      {
        angle: selling_general_admin_expenses_ratio,
        label: `${this.props.intl.formatMessage({
          id: 'general.selling_general_admin_expenses',
          defaultMessage: '販管費',
        })} ${
          isNaN(selling_general_admin_expenses_ratio)
            ? 0
            : selling_general_admin_expenses_ratio * 100
        }%`,
        color: '#00bfff',
      },
      {
        angle: operating_income_ratio,
        label: `${this.props.intl.formatMessage({
          id: 'general.operating_income',
          defaultMessage: '営業利益',
        })} ${isNaN(operating_income_ratio) ? 0 : operating_income_ratio * 100}%`,
        color: '#3cb371',
      },
    ];

    if (this.state.errors.isServerError) {
      return (
        <FormattedMessage
          id="error.serverError"
          defaultMessage="何らかのエラーが発生しています。申し訳ありませんが時間を空けて再度お試し下さい。"
        />
      );
    }

    if (is_fetched === false) {
      return <Loading isDataFetching={true} />;
    }

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          minHeight: '670px',
        }}
      >
        <div
          style={{
            background: 'white',
            width: '95%',
            minHeight: '550px',
            marginTop: '40px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <span style={{ padding: '60px', fontSize: '28px' }}>
            <FormattedMessage id="report.report" defaultMessage="レポート" />
          </span>
          <div style={{ display: 'flex', margin: 10 }}>
            <RadialChart
              colorType="literal"
              data={assetsData}
              width={330}
              height={330}
              showLabels={true}
              labelsStyle={{
                fill: '#222',
                fontSize: 18,
              }}
            />
            <RadialChart
              colorType="literal"
              data={equityData}
              width={330}
              height={330}
              showLabels={true}
              labelsStyle={{
                fill: '#222',
                fontSize: 18,
              }}
            />
            <RadialChart
              colorType="literal"
              data={salesProfitData}
              width={330}
              height={330}
              showLabels={true}
              labelsStyle={{
                fill: '#222',
                fontSize: 18,
              }}
            />
          </div>
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

export default connect(mapStateToProps)(injectIntl(Report));
