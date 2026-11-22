import { format, parseISO, formatDistanceToNow } from "date-fns";

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

export const getFormattedDate = (date) => {
  const parsedDate = parseISO(date);

  // 1. Standard readable date
  // console.log(format(parsedDate, "MMM d, yyyy"));
  // Output: "Nov 20, 2026"

  // 2. Full date with time
  // console.log(format(parsedDate, "MMMM d, yyyy • h:mm a"));
  const formattedDate = format(parsedDate, "MMMM d, yyyy • h:mm a");
  // Output: "November 20, 2026 • 2:24 PM"

  // 3. Relative / "Modern" UI style (e.g., "42 minutes ago")
  // console.log(formatDistanceToNow(parsedDate, { addSuffix: true }));

  return formattedDate;
};
