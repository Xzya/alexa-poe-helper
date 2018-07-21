import { LinkedItemTest, GenericTest } from "../generic";
import { IntentTypes, SlotTypes } from "../../lambda/custom/lib/constants";

describe("Unique Weapons", () => {
    GenericTest({
        intentName: IntentTypes.UniqueWeaponPriceCheck,
        slotName: SlotTypes.UniqueWeapon,
    });

    LinkedItemTest({
        intentName: IntentTypes.UniqueWeaponPriceCheck,
        slotName: SlotTypes.UniqueWeapon,
    });
});
