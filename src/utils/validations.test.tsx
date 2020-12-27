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
    const blankValue = '';
    expect(isEmpty(blankValue)).toEqual(true);

    const nullValue = null;
    expect(isEmpty(nullValue)).toEqual(true);
  });
  test('false', () => {
    const value = 'hoge';
    expect(isValidPassword(value)).toEqual(false);
  });
});
