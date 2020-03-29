export default (start_date, end_date) =>
  Math.round(
    Math.abs(
      (new Date(start_date).setHours(0, 0, 0, 0) -
        new Date(end_date).setHours(0, 0, 0, 0)) /
        86400000
    )
  );
