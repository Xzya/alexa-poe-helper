import { CurrencyItemTest } from "../generic";
import { IntentTypes, SlotTypes } from "../../lambda/custom/lib/constants";

describe("Currencies", () => {
    CurrencyItemTest({
        intentName: IntentTypes.CurrencyPriceCheck,
        slotName: SlotTypes.Currency,
    });
});
