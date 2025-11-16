export const today = new Date();

const convertToISO = (dateStr) => {
  if (!dateStr) return;
  const [dd, mm, yyyy] = dateStr.split("/");
  return `${yyyy}-${mm}-${dd}`; // ISO format
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
