export default (num = 0, hideCurrency, fixDecimal = false) => {
  let curreny = hideCurrency ? "" : "$ ";
  let number =
    parseFloat(num) % 1 !== 0
      ? parseFloat(num).toFixed(2)
      : fixDecimal
      ? parseFloat(num).toFixed(2)
      : num;
  return curreny + number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
