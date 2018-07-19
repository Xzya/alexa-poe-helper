import { RequestHandler } from "ask-sdk-core";
import { SlotTypes, IntentTypes } from "../../lib/constants";
import { CreateInProgressHandler } from "../../lib/helpers";

export const InProgress: RequestHandler = CreateInProgressHandler({
    intentName: IntentTypes.MapPriceCheck,
    slotName: SlotTypes.Map,
});
