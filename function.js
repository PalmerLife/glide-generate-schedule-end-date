window.function = function(date, period) {
  // Validate input parameters
  if (!date || !date.value) {
    throw new Error("Invalid or missing date input. Please provide a valid date.");
  }
  if (!period || !period.value) {
    throw new Error("Invalid or missing period input. Please specify 'Week' or 'Month'.");
  }

  // Parse the input date
  const inputDate = new Date(date.value);
  if (isNaN(inputDate)) {
    throw new Error("Invalid date format. Please provide a valid date.");
  }

  // Get the period value
  const periodValue = period.value.toLowerCase();

  if (periodValue === "week") {
    // Calculate the first Friday after the input date
    const dayOfWeek = inputDate.getDay();
    const daysToFriday = (5 - dayOfWeek + 7) % 7 || 7; // Ensures Friday is after the date
    inputDate.setDate(inputDate.getDate() + daysToFriday);
    return inputDate.toISOString().split("T")[0];
  } else if (periodValue === "month") {
    // Calculate the last day of the month
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth() + 1; // Month after the input date
    const nextMonth = new Date(year, month, 0); // Day 0 of the next month gives the last day of this month
    return nextMonth.toISOString().split("T")[0];
  } else {
    throw new Error("Invalid period. Please specify either 'Week' or 'Month'.");
  }
};
