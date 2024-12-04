window.function = async function(date, workDays, country) {
  const inputDate = new Date(date.value);
  const workDaysString = workDays.value;
  const countryCode = country.value;

  if (!inputDate || !workDaysString || !countryCode) {
    throw new Error("Invalid inputs. Ensure you provide a valid date, a string of workdays, and a country code.");
  }

  // Parse workdays string into an array
  const workDaysArray = workDaysString.split(',').map(day => day.trim());

  const holidaysApiUrl = `https://date.nager.at/Api/v2/PublicHolidays/${inputDate.getFullYear()}/${countryCode}`;

  // Fetch national holidays for the given country
  const holidaysResponse = await fetch(holidaysApiUrl);
  if (!holidaysResponse.ok) {
    throw new Error(`Failed to fetch holidays for ${countryCode}`);
  }
  const holidays = await holidaysResponse.json();
  const holidayDates = holidays.map(holiday => new Date(holiday.date).toISOString().split('T')[0]);

  let nextDate = new Date(inputDate);
  nextDate.setDate(nextDate.getDate() + 1);

  while (true) {
    const dayOfWeek = nextDate.toLocaleDateString('en-US', { weekday: 'long' });
    const dateString = nextDate.toISOString().split('T')[0];

    if (
      workDaysArray.includes(dayOfWeek) &&
      !holidayDates.includes(dateString)
    ) {
      return dateString; // Return the date as a string (e.g., "2024-12-09")
    }

    nextDate.setDate(nextDate.getDate() + 1);
  }
};
