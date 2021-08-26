export default function transformIntoBrl(value?: number) {
  return value?.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
  });
}
