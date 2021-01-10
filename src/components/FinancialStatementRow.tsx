import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';

type Account = {
  account_key: string;
  amount: number;
  classification: string;
};

type OwnProps = {
  accounts: Array<any>;
  intlId: string;
};

type Props = WrappedComponentProps & OwnProps;

class FinancialStatementRow extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    const { accounts, intlId } = this.props;
    return (
      <>
        <tr>
          <TableData>
            <FormattedMessage id={intlId} defaultMessage="" />
          </TableData>
          <TableData></TableData>
          <TableData></TableData>
        </tr>
        {accounts &&
          accounts.map((account: Account, Index: number) => {
            return (
              <tr key={Index}>
                <TableData key={Index}></TableData>
                <TableData>
                  <FormattedMessage id={`general.${account.account_key}`} defaultMessage={' '} />
                </TableData>
                <TableData>{account.amount.toLocaleString()}</TableData>
              </tr>
            );
          })}
      </>
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

export default injectIntl(FinancialStatementRow);
