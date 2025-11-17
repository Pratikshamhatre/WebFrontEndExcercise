export const today = new Date();

export const formatToMMDDYYYY = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${month}/${day}/${year}`;
};

export const isTodayInRange = (startDate, endDate) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  today.setHours(0, 0, 0, 0);

  const isStartFuture = start > today;
  const isEndFuture = end > today;

  return isStartFuture && isEndFuture;
};
