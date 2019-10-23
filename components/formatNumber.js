export default (num = 0, hideCurrency) => {
  let curreny = hideCurrency ? "" : "$ ";
  return curreny + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
