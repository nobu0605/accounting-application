import React from 'react';
import styled from 'styled-components';

type Props = any;

export default class AccountCard extends React.Component<Props> {
  render() {
    const { title, amount } = this.props;
    return (
      <div>
        <AccountCards>
          <AccountTitle>{title}</AccountTitle>
          <Amount>{amount}円</Amount>
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
