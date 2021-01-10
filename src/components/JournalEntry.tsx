import React from 'react';
import styled from 'styled-components';
import { mainColor } from '../constants/style';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import { AccountType } from '../types/account';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus);
import { Button } from 'semantic-ui-react';

type OwnPros = {
  accounts: Array<any>;
  isMultipleJournal: boolean;
  multipleJournalIndex?: number | null;
  isMismatchTotal: boolean;
  isFilledRequiredFields: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    isRequired: boolean,
    multipleJournalIndex?: number | null
  ) => void;
};
type Props = OwnPros & WrappedComponentProps;

class JournalEntry extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    const {
      accounts,
      isMultipleJournal,
      multipleJournalIndex = null,
      isMismatchTotal,
      isFilledRequiredFields,
    } = this.props;

    return (
      <tr>
        <TableData style={{ borderTop: isMultipleJournal ? 'none' : '1px solid #ddd' }}>
          {!isMultipleJournal && (
            <input
              name="deal_date"
              style={{
                fontSize: 12,
                marginLeft: 10,
                width: 150,
              }}
              type="date"
              onChange={(e) => this.props.handleChange(e, true)}
            />
          )}
        </TableData>
        <TableData>
          <SelectBox
            name="debit_account_key"
            onChange={(e: any) =>
              this.props.handleChange(
                e,
                isMultipleJournal ? false : true,
                isMultipleJournal ? multipleJournalIndex : null
              )
            }
          >
            <option value="">
              {this.props.intl.formatMessage({
                id: 'common.select',
                defaultMessage: '選択してください',
              })}
            </option>
            {accounts.map((account: AccountType, Index: number) => {
              return (
                <option key={Index} value={account.account_key}>
                  {account.is_default_account
                    ? this.props.intl.formatMessage({
                        id: `general.${account.account_key}`,
                        defaultMessage: account.name,
                      })
                    : account.name}
                </option>
              );
            })}
          </SelectBox>
        </TableData>
        <TableData>
          <JournalInput
            name="debit_sub_account_key"
            type="text"
            onChange={(e) =>
              this.props.handleChange(e, false, isMultipleJournal ? multipleJournalIndex : null)
            }
          />
        </TableData>
        <TableData>
          <JournalInput
            name="debit_amount"
            type="number"
            min="0"
            onChange={(e) =>
              this.props.handleChange(
                e,
                isMultipleJournal ? false : true,
                isMultipleJournal ? multipleJournalIndex : null
              )
            }
          />
        </TableData>
        <TableData>
          <SelectBox
            name="credit_account_key"
            onChange={(e: any) =>
              this.props.handleChange(
                e,
                isMultipleJournal ? false : true,
                isMultipleJournal ? multipleJournalIndex : null
              )
            }
          >
            <option value="">
              {this.props.intl.formatMessage({
                id: 'common.select',
                defaultMessage: '選択してください',
              })}
            </option>
            {accounts.map((account: AccountType, Index: number) => {
              return (
                <option key={Index} value={account.account_key}>
                  {account.is_default_account
                    ? this.props.intl.formatMessage({
                        id: `general.${account.account_key}`,
                        defaultMessage: account.name,
                      })
                    : account.name}
                </option>
              );
            })}
          </SelectBox>
        </TableData>
        <TableData>
          <JournalInput
            name="credit_sub_account_key"
            type="text"
            onChange={(e) =>
              this.props.handleChange(e, false, isMultipleJournal ? multipleJournalIndex : null)
            }
          />
        </TableData>
        <TableData>
          <JournalInput
            name="credit_amount"
            type="number"
            min="0"
            onChange={(e) =>
              this.props.handleChange(
                e,
                isMultipleJournal ? false : true,
                isMultipleJournal ? multipleJournalIndex : null
              )
            }
          />
        </TableData>
        <TableData>
          <JournalInput
            name="remark"
            type="text"
            onChange={(e) =>
              this.props.handleChange(e, false, isMultipleJournal ? multipleJournalIndex : null)
            }
          />
        </TableData>
        <TableData style={{ borderTop: isMultipleJournal ? 'none' : '1px solid #ddd' }}>
          {!isMultipleJournal && (
            <Button
              type="submit"
              style={{ background: mainColor, color: 'white' }}
              disabled={isMismatchTotal || !isFilledRequiredFields}
            >
              <FormattedMessage id="common.register" defaultMessage="登録" />
            </Button>
          )}
        </TableData>
      </tr>
    );
  }
}

const TableData = styled.td`
  height: 40px;
  width: 150px;
  padding: 10px;
  text-align: center;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
`;
const JournalInput = styled.input`
  width: 100px;
  border: solid 1px #ddd;
  font-size: 18px;
  text-align: right;
`;
const SelectBox = styled.select`
  -webkit-appearance: none;
  font-size: 9px;
  margin-left: 10px;
  width: 160px;
  cursor: pointer;
  word-wrap: break-word;
  line-height: 1em;
  white-space: normal;
  outline: 0;
  transform: rotateZ(0);
  min-width: 14em;
  min-height: 3em;
  background: #fff;
  display: inline-block;
  padding: 0.78571429em 2.1em 0.78571429em 1em;
  color: rgba(0, 0, 0, 0.87);
  box-shadow: none;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.28571429rem;
  transition: box-shadow 0.1s ease, width 0.1s ease;
`;

export default injectIntl(JournalEntry);
