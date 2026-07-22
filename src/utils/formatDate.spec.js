import { formatDateToDDMMYY } from './formatDate.js';

describe('formatDateToDDMMYY', () => {
  it('formats YYYY-MM-DD to dd.mm.yy', () => {
    expect(formatDateToDDMMYY('2026-07-22')).toBe('22.07.26');
    expect(formatDateToDDMMYY('2024-12-05')).toBe('05.12.24');
  });

  it('handles empty or invalid inputs gracefully', () => {
    expect(formatDateToDDMMYY('')).toBe('');
    expect(formatDateToDDMMYY(null)).toBe('');
    expect(formatDateToDDMMYY(undefined)).toBe('');
  });
});
