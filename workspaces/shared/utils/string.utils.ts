export const hideCardNumber = (cardNumber: string): string => {
  const firstFourDigits = cardNumber.slice(0, 4);
  const lastFourDigits = cardNumber.slice(-4);
  return `${firstFourDigits} **** **** ${lastFourDigits}`;
};
