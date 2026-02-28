export function maskInputMoney(value: string) {
  if (!value) return "R$ 0,00";
  const numericValue = value.replace(/\D/g, '');
  const maskedValue = maskMoney(parseInt(numericValue));
  return maskedValue;
}

export function maskMoney(value: number) {
  if (isNaN(value)) return "R$ 0,00";
  return (value / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function removeMask(value: string) {
  return value.replace(/\D/g, '')
}