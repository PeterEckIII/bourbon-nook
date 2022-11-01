const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const formatDateForReviewPage = (date: string): string => {
  const dateToFormat = new Date(date);
  const dayOfYear = dateToFormat.getDate();
  const year = dateToFormat.getFullYear();
  const monthName = months[dateToFormat.getMonth()];
  const dayName = days[dateToFormat.getDay()];

  return `${dayName}, ${monthName} ${dayOfYear} ${year}`;
};
