export function isValidPassword(password: string): boolean {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{6,}$/i;
  return regex.test(password);
}

export function isValidAccountKey(accountKey: string): boolean {
  const regex = /^[a-z_]*$/;
  return regex.test(accountKey);
}

export function isEmpty(value: string | number): boolean {
  return value === '' || typeof value === 'undefined' || value === null;
}
