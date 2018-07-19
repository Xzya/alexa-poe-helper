import { RequestHandler } from "ask-sdk-core";
import { SlotTypes, IntentTypes } from "../../lib/constants";
import { CreateDefaultInProgressHandler } from "../../lib/helpers";

export const InProgress: RequestHandler = CreateDefaultInProgressHandler({
    intentName: IntentTypes.UniqueArmourPriceCheck,
    slotName: SlotTypes.UniqueArmour,
});
