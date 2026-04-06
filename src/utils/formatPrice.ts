import { TFormattedPrice } from '@/types/formatPrice';

export const formatPrice = (value: number): TFormattedPrice => {
  const formatter = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedString = formatter.format(value);

  const [whole, rest] = formattedString.split(',');

  return {
    whole: whole.replace(/\u00A0/g, ' '),
    rest: rest || '00',
  };
};
