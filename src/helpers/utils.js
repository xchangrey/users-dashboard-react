export const timestamp = () => {
  const date = new Date();
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
  const monthDayYear = date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  const timezone = date.toLocaleTimeString("en-US", { timeZoneName: "short" });
  
  
  return`${dayOfWeek}, ${monthDayYear} at ${timezone}`;
}
