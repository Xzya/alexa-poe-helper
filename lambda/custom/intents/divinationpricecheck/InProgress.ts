import { RequestHandler } from "ask-sdk-core";
import { SlotTypes, IntentTypes } from "../../lib/constants";
import { CreateNormalItemInProgressHandler } from "../normalitempricecheck";

export const InProgress: RequestHandler = CreateNormalItemInProgressHandler({
    intentName: IntentTypes.DivinationPriceCheck,
    slotName: SlotTypes.Divination,
});
