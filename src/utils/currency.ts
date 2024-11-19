export const formatInputCurrency = (
  value: string,
  prefix: string,
  isBack?: boolean
) => {
  // Split the value by the decimal point
  const parts = value.toString().split('.');

  // Format the integer part with commas
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // If there's no decimal part and the value ends with a '.', retain it
  let formattedValue =
    parts.length === 1 && value.toString().endsWith('.')
      ? `${parts[0]}.`
      : parts.join('.');

  // Add the prefix either at the back or front based on the isBack flag
  return isBack ? `${formattedValue}${prefix}` : `${prefix}${formattedValue}`;
};
