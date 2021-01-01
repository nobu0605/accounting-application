export type JournalType = {
  id: number;
  company_id: number;
  deal_date: string;
  debit_account_key: string;
  is_default_account_debit: boolean;
  debit_account_name: string;
  debit_amount: number;
  debit_sub_account_key: string;
  credit_account_key: string;
  credit_account_name: string;
  credit_amount: number;
  credit_sub_account_key: string;
  is_default_account_credit: boolean;
  is_multiple_journal: boolean;
  remark: string;
};
export type MultipleJournalType = {
  company_id: number;
  multiple_journal_index: number;
  debit_account_key: string;
  debit_sub_account_key: string;
  debit_amount: number;
  credit_account_key: string;
  credit_sub_account_key: string;
  credit_amount: number;
  remark: string;
  [key: string]: any;
};
