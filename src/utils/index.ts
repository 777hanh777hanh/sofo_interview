export const formatNumber = (number: number) => {
  return number.toLocaleString("en-US");
};

export const formatNumberWithCommas = (number: number) => {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const formatNumberToPrice = (
  number: number,
  currency: string,
  prefix: boolean = true,
) => {
  return `<span className='underline'>${prefix ? currency : ""}</span>${formatNumber(
    number,
  )} <span className='underline'>${prefix ? "" : currency}</span>`;
};
