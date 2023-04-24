import { format } from "date-fns";

export const toSimpleISO = (date: string | Date) => {
    if(typeof date === "string") date = new Date(date);
    return format(date, "yyyy-MM-dd");
};