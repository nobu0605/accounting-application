export type CompanyInitialState = {
  id?: string;
  name?: string;
  industry_class?: string;
  number_of_employees?: number;
  founded_date?: string;
  fiscal_start_date?: string;
  fiscal_end_date?: string;
  accounting_term?: number;
};

export type CompanyState = {
  id: string;
  name: string;
  industry_class: string;
  number_of_employees: number;
  founded_date: string;
  fiscal_start_date: string;
  fiscal_end_date: string;
  accounting_term: number;
};
