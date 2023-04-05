import dayjs from "dayjs";

export const getMounthName = (date: dayjs.Dayjs): string => {
    return date.format("MMMM");
};

export const getDayName = (date: dayjs.Dayjs): string => {
    return date.format("dddd");
};

export const getDayNumber = (date: dayjs.Dayjs): string => {
    return date.format("DD");
};
