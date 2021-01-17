import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';

type OwnProps = {
  title: string;
  amount: number;
};

type Props = OwnProps & WrappedComponentProps;

class AccountCard extends React.Component<Props> {
  render(): React.ReactNode {
    const { title, amount } = this.props;

    return (
      <div>
        <AccountCards>
          <AccountTitle>{title}</AccountTitle>
          <Amount>
            {amount.toLocaleString()}
            &nbsp;
            <FormattedMessage id={'common.yen'} defaultMessage="円" />
          </Amount>
        </AccountCards>
      </div>
    );
  }
}
const AccountCards = styled.div`
  width: 200px;
  height: 130px;
  margin: 20px;
  padding: 10px;
  background: white;
`;
const AccountTitle = styled.h5`
  margin: 10px;
  font-size: 16px;
`;
const Amount = styled.span`
  margin: 10px;
  font-size: 16px;
`;
export default injectIntl(AccountCard);
