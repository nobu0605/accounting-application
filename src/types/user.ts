import { CompanyState } from './company';

export type UserState = {
  data: {
    user: {
      id: string;
      name: string;
      company: CompanyState;
    };
  };
};
