export function generateDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export function generateTime() {
  const date = new Date();
  const options = { hour: "numeric", minute: "numeric", hour12: false };
  return date.toLocaleTimeString("en-US", options);
}

export function generateTimeFromString(dateString) {
  const date = new Date(dateString);
  const options = { hour: "numeric", minute: "numeric", hour12: false };
  return date.toLocaleTimeString("en-US", options);
}

export function getDateString() {
  const date = new Date(); // replace with your date if needed
  const options = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}
