import { CurrencyItemTest } from "../generic";
import { IntentTypes, SlotTypes } from "../../lambda/custom/lib/constants";

describe("Fragments", () => {
    CurrencyItemTest({
        intentName: IntentTypes.FragmentPriceCheck,
        slotName: SlotTypes.Fragment,
    });
});
