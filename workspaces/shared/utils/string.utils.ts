export const hideCardNumber = (cardNumber: string): string => {
  const firstFourDigits = cardNumber.slice(0, 4);
  const lastFourDigits = cardNumber.slice(-4);
  return `${firstFourDigits} **** **** ${lastFourDigits}`;
};

export const emailValidator = (email: string): boolean => {
  const reg = /^\w+([+|.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email?.trim());
};

export const cardNumberValidator = (cardNumber: string): boolean => {
  const cardNumberRegex = new RegExp('^[0-9]{16}$');
  return cardNumberRegex.test(cardNumber);
};

export const expDateValidator = (expDate: string): boolean => {
  const expDateRegex = new RegExp('^[0-1][0-9]/[0-9]{2}$');
  const match = expDate.match(expDateRegex);
  if (!match) return false;
  const [Month, Year] = match[0].split('/');
  const month = +Month;
  const year = +Year;

  const currentYear = new Date().getFullYear().toString().slice(-2);
  const currentMonth = new Date().getMonth() + 1;
  if (year < Number(currentYear)) return false;
  if (year === Number(currentYear) && month < currentMonth) return false;
  if (month > 12 || month <= 0) return false;
  return expDateRegex.test(expDate);
};
