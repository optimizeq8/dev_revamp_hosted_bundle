export default (start_date, end_date) =>
  Math.round(
    Math.abs(
      (new Date(start_date).setUTCHours(0, 0, 0, 0) -
        new Date(end_date).setUTCHours(0, 0, 0, 0)) /
        86400000
    )
  );
