import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'react-intl';

type Props = any;

class TotalAmountRow extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    const { totalAmount, intlId } = this.props;
    return (
      <tr style={{ background: '#DDDDDD' }}>
        <TableData>
          <FormattedMessage id={intlId} defaultMessage=" " />
        </TableData>
        <TableData />
        <TableData>{totalAmount.toLocaleString()}</TableData>
      </tr>
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

export default injectIntl(TotalAmountRow);
