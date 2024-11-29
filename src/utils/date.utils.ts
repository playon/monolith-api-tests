export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Checks if the given date is within the last hour from the current time.
 *
 * @param dateStr - The date string in ISO format.
 * @returns True if the date is within the last hour, otherwise false.
 */
export function isDateWithinLastHour(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

  return now.getTime() - date.getTime() <= oneHour;
}

/**
 * Adds a specified number of days to the current date and returns the resulting date in ISO 8601 format.
 * @param days Number of days to add.
 * @returns A string representing the new date in ISO 8601 format.
 */
export function addDaysToDate(days: number): string {
  const currentDate = new Date();
  
  // Add the specified number of days to the current date
  currentDate.setDate(currentDate.getDate() + days);
  
  // Get the timezone offset in minutes (negative value for UTC-5, for example)
  const timeZoneOffset = currentDate.getTimezoneOffset(); // in minutes

  // Adjust the date to the desired timezone (-5 hours for EST)
  currentDate.setMinutes(currentDate.getMinutes() - timeZoneOffset); // Adjust to local timezone

  // Format the date in 'YYYY-MM-DDTHH:mm:ss-0500' format
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');
  const offsetHours = String(-Math.floor(timeZoneOffset / 60)).padStart(2, '0');
  const offsetMinutes = String(Math.abs(timeZoneOffset) % 60).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}-${offsetHours}${offsetMinutes}`;
  
  return formattedDate;
}


/**
 * Returns the current date in ISO 8601 format.
 * @returns A string representing the current date in ISO 8601 format.
 */
export function getCurrentDate(): string {
  return new Date().toISOString();
}

/* Example usage
  const newDate = addDaysToDate(10);
  console.log(`Current date plus 10 days: ${newDate}`);
  
  const currentDate = getCurrentDate();
  console.log(`Current date: ${currentDate}`);
  */
