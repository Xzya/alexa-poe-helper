import { RequestHandler } from "ask-sdk-core";
import { SlotTypes, IntentTypes } from "../../lib/constants";
import { ItemRequestTypes } from "../../api";
import { CreateNormalItemCompletedHandler } from "../normalitempricecheck";

export const Completed: RequestHandler = CreateNormalItemCompletedHandler({
    intentName: IntentTypes.UniqueJewelPriceCheck,
    slotName: SlotTypes.UniqueJewel,
    requestType: ItemRequestTypes.UniqueJewel,
});
