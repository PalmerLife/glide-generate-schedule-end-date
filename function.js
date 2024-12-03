window.function = function(inputDate, weeksAhead) {
  if (!inputDate.value || !weeksAhead.value) {
    throw new Error("Both inputDate and weeksAhead are required.");
  }

  const date = new Date(inputDate.value);
  if (isNaN(date)) {
    throw new Error("Invalid date format. Use 'January 6, 2025'.");
  }

  const weeks = weeksAhead.value.trim();
  let resultDate;

  switch (weeks) {
    case "1":
      resultDate = getNextFriday(date, 1);
      break;
    case "2":
      resultDate = getNextFriday(date, 2);
      break;
    case "3":
      resultDate = getNextFriday(date, 3);
      break;
    case "4":
      resultDate = getLastDayOfNextMonth(date);
      break;
    default:
      throw new Error("Invalid input for weeksAhead. Use '1', '2', '3', or '4'.");
  }

  return formatDate(resultDate);
};

function getNextFriday(startDate, weekOffset) {
  const startDay = startDate.getDay();
  const daysToFriday = (5 - startDay + 7) % 7 || 7;
  const targetDate = new Date(startDate);
  targetDate.setDate(targetDate.getDate() + daysToFriday + (weekOffset - 1) * 7);
  return targetDate;
}

function getLastDayOfNextMonth(startDate) {
  const year = startDate.getFullYear();
  const month = startDate.getMonth() + 2; // Next month (1-based)
  return new Date(year, month, 0); // Day 0 gives the last day of the previous month
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
