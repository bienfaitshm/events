import * as React from "react";
import renderer from "react-test-renderer";

import { keyExtractor } from "../func";

describe("sum module", () => {
    it(`keyExtractor Test with ID in item`, () => {
        const key = keyExtractor({ id: 23 }, 0);
        expect(key).toBe("23");
    });

    it(`renders correctly RootLayoutNav`, () => {
        const key = keyExtractor({}, 0);
        expect(key).toBe("0");
    });
});
