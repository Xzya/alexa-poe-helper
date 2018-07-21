import { GenericTest } from "../generic";
import { IntentTypes, SlotTypes } from "../../lambda/custom/lib/constants";

describe("Unique Maps", () => {
    GenericTest({
        intentName: IntentTypes.UniqueMapPriceCheck,
        slotName: SlotTypes.UniqueMap,
    });
});
