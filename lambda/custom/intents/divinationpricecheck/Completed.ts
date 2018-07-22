import { RequestHandler } from "ask-sdk-core";
import { SlotTypes, IntentTypes } from "../../lib/constants";
import { ItemRequestTypes } from "../../api";
import { CreateNormalItemCompletedHandler } from "../normalitempricecheck";

export const Completed: RequestHandler = CreateNormalItemCompletedHandler({
    intentName: IntentTypes.DivinationPriceCheck,
    slotName: SlotTypes.Divination,
    requestType: ItemRequestTypes.DivinationCard,
});
