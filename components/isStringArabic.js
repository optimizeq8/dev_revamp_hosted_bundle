export default isStringArabic = stringToBeTested => {
  var arabic = /[\u0600-\u06FF]/;
  return arabic.test(stringToBeTested);
};
