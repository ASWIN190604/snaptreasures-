/**
 * Format numeric value to Indian Rupee (INR) currency representation
 * @param {number} amount
 * @returns {string} e.g. "₹99" or "₹1,499"
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
