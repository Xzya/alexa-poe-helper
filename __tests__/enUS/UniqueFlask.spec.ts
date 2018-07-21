import { GenericTest } from "../generic";
import { IntentTypes, SlotTypes } from "../../lambda/custom/lib/constants";

describe("Unique Flasks", () => {
    GenericTest({
        intentName: IntentTypes.UniqueFlaskPriceCheck,
        slotName: SlotTypes.UniqueFlask,
    });
});
