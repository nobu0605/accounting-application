import React from 'react';
import styled from 'styled-components';
import HeaderIcon from '../../components/HeaderIcon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faHome,
  faBookOpen,
  faBook,
  faPen,
  faSignal,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
library.add(faChartPie, faHome, faBookOpen, faBook, faPen, faSignal, faCog);
import { Link } from 'react-router-dom';
import LanguageDropdown from '../../components/LanguageDropdown';
import UserDropdown from '../../components/UserDropdown';
import { mainColor } from '../../constants/style';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { fetchUser } from '../../thunks/user';
import { UserState } from '../../types/user';
import Loading from '../../components/Loading';

type OwnProps = {
  children: React.ReactNode;
};
type Props = OwnProps & any;

class HeaderWrapper extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadUser();
  }

  render(): React.ReactNode {
    const { children, user } = this.props;
    const company = user.company;

    if (user.isUserDataFetching) {
      return <Loading isDataFetching={this.props.user.isUserDataFetching} />;
    }

    return (
      <div style={{ height: '100%' }}>
        <HeaderContainer>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '5px',
            }}
          >
            <HeaderTitle>
              <FontAwesomeIcon
                icon="chart-pie"
                style={{
                  width: 40,
                  height: 40,
                  color: mainColor,
                }}
              />
              <Link to="/home">
                <span style={{ color: mainColor }}>&nbsp;Accounting</span>
              </Link>
            </HeaderTitle>
            <HeaderRightSection>
              <div>
                <span>
                  <FormattedMessage
                    id="header.accountingTerm"
                    defaultMessage="第{accountingTerm}期"
                    values={{
                      accountingTerm: company.accounting_term,
                    }}
                  />
                  &nbsp;&nbsp;&nbsp;{company.fiscal_start_date}
                  &nbsp;~&nbsp;
                  {company.fiscal_end_date}
                </span>
                <br />
                <span
                  style={{
                    marginRight: '17px',
                    borderRight: '1px solid',
                    borderLeft: '1px solid',
                    paddingRight: '17px',
                    paddingLeft: '17px',
                    paddingTop: '3px',
                    paddingBottom: '3px',
                  }}
                >
                  {company.name}
                </span>
                <UserDropdown isBorderRight={true} userName={user.name} />
              </div>
              <LanguageDropdown marginTop={'6px'} />
            </HeaderRightSection>
          </div>
          <HeaderMenu>
            <Link to="/home">
              <MenuList>
                <HeaderIcon icon="home" />
                <FormattedMessage id="header.home" defaultMessage="ホーム" />
              </MenuList>
            </Link>
            <Link to="/financialStatement">
              <MenuList>
                <HeaderIcon icon="book-open" />
                <FormattedMessage id="header.financialStatement" defaultMessage="財務諸表" />
              </MenuList>
            </Link>
            <Link to="/journal">
              <MenuList>
                <HeaderIcon icon="book" />
                <FormattedMessage id="header.journal" defaultMessage="仕訳日記帳" />
              </MenuList>
            </Link>
            <Link to="/transaction">
              <MenuList>
                <HeaderIcon icon="pen" />
                <FormattedMessage id="header.transaction" defaultMessage="取引" />
              </MenuList>
            </Link>
            <Link to="/report">
              <MenuList>
                <HeaderIcon icon="signal" />
                <FormattedMessage id="header.report" defaultMessage="レポート" />
              </MenuList>
            </Link>
            <Link to="/setting">
              <MenuList>
                <HeaderIcon icon="cog" />
                <FormattedMessage id="header.setting" defaultMessage="設定" />
              </MenuList>
            </Link>
          </HeaderMenu>
        </HeaderContainer>
        {children}
      </div>
    );
  }
}

const HeaderTitle = styled.h1`
  font-size: 40px;
  text-align: left;
  margin-left: 25px;
  margin-right: 10px;
  margin-bottom: 15px;
  font-family: Pacifico;
  color: ${mainColor};
`;
const HeaderMenu = styled.div`
  background: ${mainColor};
  height: 40px;
  display: flex;
  align-items: center;
`;
const MenuList = styled.span`
  font-size: 16px;
  color: white;
  margin-left: 10px;
  cursor: pointer;
  cursor: hand;
`;
const HeaderContainer = styled.div`
  width: 100%;
  top: 0px;
  background: white;
  margin-top: 5px;
`;
const HeaderRightSection = styled.div`
  width: 26%;
  height: 100%;
  text-align: right;
  color: mainColor;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function mapStateToProps(state: UserState) {
  return {
    user: state.data.user,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    loadUser: () => dispatch(fetchUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(HeaderWrapper));
