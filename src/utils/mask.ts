export function maskMoney(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function removeMask(value: string) {
  return value.replace(/\D/g, '')
}