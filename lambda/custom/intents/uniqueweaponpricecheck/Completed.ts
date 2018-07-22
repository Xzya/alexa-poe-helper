import { RequestHandler } from "ask-sdk-core";
import { SlotTypes, IntentTypes } from "../../lib/constants";
import { CreateLinkedItemCompletedHandler } from "../linkeditempricecheck";
import { ItemRequestTypes } from "../../api";

export const Completed: RequestHandler = CreateLinkedItemCompletedHandler({
    intentName: IntentTypes.UniqueWeaponPriceCheck,
    slotName: SlotTypes.UniqueWeapon,
    requestType: ItemRequestTypes.UniqueWeapon,
});
