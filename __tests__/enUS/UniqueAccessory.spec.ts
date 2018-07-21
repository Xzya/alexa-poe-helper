import { GenericTest } from "../generic";
import { IntentTypes, SlotTypes } from "../../lambda/custom/lib/constants";

describe("Unique Accessories", () => {
    GenericTest({
        intentName: IntentTypes.UniqueAccessoryPriceCheck,
        slotName: SlotTypes.UniqueAccessory,
    });
});
