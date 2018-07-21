import { GenericTest } from "../generic";
import { IntentTypes, SlotTypes } from "../../lambda/custom/lib/constants";

describe("Essences", () => {
    GenericTest({
        intentName: IntentTypes.EssencePriceCheck,
        slotName: SlotTypes.Essence,
    });
});
