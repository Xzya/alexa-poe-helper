import { GenericTest } from "../generic";
import { IntentTypes, SlotTypes } from "../../lambda/custom/lib/constants";

describe("Maps", () => {
    GenericTest({
        intentName: IntentTypes.MapPriceCheck,
        slotName: SlotTypes.Map,
    });
});
