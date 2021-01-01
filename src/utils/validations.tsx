export function isValidPassword(password: string): boolean {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{6,}$/i;
  return regex.test(password);
}

export function isEmpty(value: string | number): boolean {
  return value === '' || typeof value === 'undefined' || value === null;
}
