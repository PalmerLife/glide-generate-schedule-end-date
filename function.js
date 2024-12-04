window.function = async function(date, workDays, country) {
  const inputDate = new Date(date.value);
  const workDaysArray = workDays.value;
  const countryCode = country.value;

  if (!inputDate || !Array.isArray(workDaysArray) || !countryCode) {
    throw new Error("Invalid inputs. Ensure you provide a valid date, an array of work days, and a country code.");
  }

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
      return nextDate.toDateString();
    }

    nextDate.setDate(nextDate.getDate() + 1);
  }
};
