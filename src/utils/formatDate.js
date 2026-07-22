export function formatDateToDDMMYY(dateString) {
  if (!dateString || typeof dateString !== 'string') return '';
  const trimmed = dateString.trim();
  if (!trimmed) return '';

  const parts = trimmed.split('-');
  if (parts.length === 3 && parts[0].length === 4) {
    const year = parts[0].slice(-2);
    const month = parts[1];
    const day = parts[2];
    return `${day}.${month}.${year}`;
  }

  const d = new Date(trimmed);
  if (isNaN(d.getTime())) return dateString;
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
}
