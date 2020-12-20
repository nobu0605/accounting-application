import { isValidPassword, isEmpty } from './validations';

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

describe('isEmpty', () => {
  test('true', () => {
    const value = '';
    expect(isEmpty(value)).toEqual(true);

    const value2 = null;
    expect(isEmpty(value2)).toEqual(true);
  });
  test('false', () => {
    const isEmpty = 'hoge';
    expect(isValidPassword(isEmpty)).toEqual(false);
  });
});
