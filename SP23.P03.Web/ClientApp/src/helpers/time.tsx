export const toSimpleISO = (date: string | Date) => {
    if(typeof date === "string") date = new Date(date);
    return date.toISOString().substring(0, 10);
};