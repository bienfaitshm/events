import dayjs from "dayjs";

// date getter process
export const DATE_FORMAT = "DD-MM-YYYY";
export const DATE_FORMAT_ISO = "YYYY-MM-DD";
export const TIME_FORMAT = "HH:mm";

export const getMounthName = (date: dayjs.Dayjs): string => {
    return date.format("MMMM");
};

export const getDayName = (date: dayjs.Dayjs): string => {
    return date.format("dddd");
};

export const getDayNumber = (date: dayjs.Dayjs): string => {
    return date.format("DD");
};

export const getParsedTime = (
    value: string | Date | undefined,
    format: string = TIME_FORMAT
) => {
    const datejs: dayjs.Dayjs =
        typeof value === "string" ? dayjs(value, format, true) : dayjs(value);
    return datejs.isValid() ? datejs : dayjs();
};

export const getIsoFormatDateTime = (
    datetime?: Date | string,
    type: "TIME" | "DATE" = "TIME"
) => {
    return getParsedTime(datetime).format(
        type === "TIME" ? TIME_FORMAT : DATE_FORMAT_ISO
    );
};
