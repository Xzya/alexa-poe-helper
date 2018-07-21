import { LinkedItemTest, GenericTest } from "../generic";
import { IntentTypes, SlotTypes } from "../../lambda/custom/lib/constants";

describe("Unique Armours", () => {
    GenericTest({
        intentName: IntentTypes.UniqueArmourPriceCheck,
        slotName: SlotTypes.UniqueArmour,
    });

    LinkedItemTest({
        intentName: IntentTypes.UniqueArmourPriceCheck,
        slotName: SlotTypes.UniqueArmour,
    });
});
