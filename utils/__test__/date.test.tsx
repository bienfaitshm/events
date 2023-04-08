import {
    getIsoFormatDateTime,
    getParsedTime,
    DATE_FORMAT,
    DATE_FORMAT_ISO,
    TIME_FORMAT,
} from "../date";
import dayjs from "dayjs";
describe("Utils Date Test", () => {
    it("getParsedTime with string", () => {
        const _dayjs = getParsedTime("12-02-2023", DATE_FORMAT);
        expect(_dayjs.day).toBe(12);
        expect(_dayjs.month).toBe(2);
        expect(_dayjs.year).toBe(2023);
    });
});
