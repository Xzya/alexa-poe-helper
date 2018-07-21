import { GenericTest } from "../generic";
import { IntentTypes, SlotTypes } from "../../lambda/custom/lib/constants";

describe("Unique Jewels", () => {
    GenericTest({
        intentName: IntentTypes.UniqueJewelPriceCheck,
        slotName: SlotTypes.UniqueJewel,
    });
});
