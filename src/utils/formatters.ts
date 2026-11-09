export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY';

export const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number; prefix: boolean }> = {
  USD: { symbol: '$', rate: 1.0, prefix: true },
  EUR: { symbol: '€', rate: 0.92, prefix: true },
  GBP: { symbol: '£', rate: 0.78, prefix: true },
  JPY: { symbol: '¥', rate: 154.0, prefix: true },
};

export function formatPrice(amount: number, currency: Currency = 'USD'): string {
  const { symbol, rate, prefix } = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const converted = Math.round(amount * rate);
  
  if (currency === 'JPY') {
    return prefix ? `${symbol}${converted.toLocaleString()}` : `${converted.toLocaleString()} ${symbol}`;
  }
  
  return prefix ? `${symbol}${converted.toLocaleString()}` : `${converted.toLocaleString()} ${symbol}`;
}
