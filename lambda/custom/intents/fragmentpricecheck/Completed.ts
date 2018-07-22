import { RequestHandler } from "ask-sdk-core";
import { SlotTypes, IntentTypes } from "../../lib/constants";
import { CurrencyRequestTypes } from "../../api";
import { CreateCurrencyItemCompletedHandler } from "../currencyitempricecheck";

export const Completed: RequestHandler = CreateCurrencyItemCompletedHandler({
    intentName: IntentTypes.FragmentPriceCheck,
    slotName: SlotTypes.Fragment,
    requestType: CurrencyRequestTypes.Fragment,
});
