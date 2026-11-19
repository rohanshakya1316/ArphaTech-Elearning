import { format } from "date-fns";

export const getCurrentDate = () => {
  const now = new Date();

  // Standard YYYY-MM-DD format (e.g., "2026-11-18")
  // const formattedDate = format(now, "yyyy-MM-dd");

  // Readable format (e.g., "November 18, 2026")
  const readableDate = format(now, "MMMM dd, yyyy");

  // Date and time (e.g., "2026-11-18 11:24:00")
  // const dateTime = format(now, "yyyy-MM-dd HH:mm:ss");

  return readableDate;
};
