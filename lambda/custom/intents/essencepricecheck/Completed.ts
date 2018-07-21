import { RequestHandler } from "ask-sdk-core";
import { SlotTypes, IntentTypes } from "../../lib/constants";
import { ItemRequestTypes } from "../../api";
import { CreateDefaultCompletedItemHandler } from "../../lib/helpers";

export const Completed: RequestHandler = CreateDefaultCompletedItemHandler({
    intentName: IntentTypes.EssencePriceCheck,
    slotName: SlotTypes.Essence,
    requestType: ItemRequestTypes.Essence,
});