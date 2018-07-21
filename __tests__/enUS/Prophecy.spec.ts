import { GenericTest } from "../generic";
import { IntentTypes, SlotTypes } from "../../lambda/custom/lib/constants";

describe("Prophecies", () => {
    GenericTest({
        intentName: IntentTypes.ProphecyPriceCheck,
        slotName: SlotTypes.Prophecy,
    });
});
