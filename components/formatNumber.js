export default (num = 0, hideCurrency) => {
  let curreny = hideCurrency ? "" : "$ ";
  let number = parseFloat(num) % 1 !== 0 ? parseFloat(num).toFixed(2) : num;
  return curreny + number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
