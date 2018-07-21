import { GenericTest } from "../generic";
import { IntentTypes, SlotTypes } from "../../lambda/custom/lib/constants";

describe("Divinations", () => {
    GenericTest({
        intentName: IntentTypes.DivinationPriceCheck,
        slotName: SlotTypes.Divination,
    });
});
