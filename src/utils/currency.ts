const formatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0
});

export function formatPrice(value: number): string {
  return formatter.format(value);
}

export function formatInstallments(value: number, count = 12): string {
  return `${count} cuotas sin interés de ${formatter.format(
    Math.round(value / count)
  )}`;
}