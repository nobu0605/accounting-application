import { isValidPassword, isValidAccountKey, isEmpty, checkInvalidDealDate } from './validations';

describe('check password strength', () => {
  test('success', () => {
    const passwordWithNumber = 'password1';
    expect(isValidPassword(passwordWithNumber)).toEqual(true);
  });
  test('failure', () => {
    const passwordWithoutNumber = 'password';
    expect(isValidPassword(passwordWithoutNumber)).toEqual(false);

    const shortPasswordWithNumber = 'pass1';
    expect(isValidPassword(shortPasswordWithNumber)).toEqual(false);
  });
});

describe('check valid account key', () => {
  test('success: Long account name with underscore', () => {
    const accountName = 'loss_on_disposal_of_fixed_assets';
    expect(isValidAccountKey(accountName)).toEqual(true);
  });
  test('success: Two words account name with underscore', () => {
    const accountName = 'interest_income';
    expect(isValidAccountKey(accountName)).toEqual(true);
  });
  test('success: Short account name', () => {
    const accountName = 'sales';
    expect(isValidAccountKey(accountName)).toEqual(true);
  });
  test('failure: Two words account name with hyphen', () => {
    const accountName = 'interest-income';
    expect(isValidAccountKey(accountName)).toEqual(false);
  });
  test('failure: Japanese account name', () => {
    const accountName = '受取利息';
    expect(isValidAccountKey(accountName)).toEqual(false);
  });
});

describe('isEmpty', () => {
  test('true', () => {
    const blankValue = '';
    expect(isEmpty(blankValue)).toEqual(true);

    const nullValue = null;
    expect(isEmpty(nullValue)).toEqual(true);
  });
  test('false', () => {
    const value = 'hoge';
    expect(isEmpty(value)).toEqual(false);
  });
});

describe('checkInvalidDealDate', () => {
  test('true', () => {
    const dealDate = '2020-04-02';
    const fiscal_start_date = '2020-04-01';
    const fiscal_end_date = '2021-03-31';
    expect(checkInvalidDealDate(dealDate, fiscal_start_date, fiscal_end_date)).toEqual(false);
  });
  test('false', () => {
    const dealDate = '2019-08-02';
    const fiscal_start_date = '2020-04-01';
    const fiscal_end_date = '2021-03-31';
    expect(checkInvalidDealDate(dealDate, fiscal_start_date, fiscal_end_date)).toEqual(true);
  });
});
