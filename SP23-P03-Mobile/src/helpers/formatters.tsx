import { format } from "date-fns";

export const formatTripDate = (date: string | Date) => {
    if(typeof date === "string") date = new Date(date);
    return format(date, "MMM d h:mm a");
};