export default (start_date, end_date) =>
  Math.round(
    Math.abs(
      (new Date(start_date).getTime() - new Date(end_date).getTime()) / 86400000
    )
  );
