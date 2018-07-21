import { IntentTypes, LocaleTypes, SlotTypes } from "../../lambda/custom/lib/constants";
import { skill, ssml, CreateIntentRequest, inProgressDelegate } from "../helpers";

describe("Quest reward", () => {
    const name = IntentTypes.QuestReward;
    const locale = LocaleTypes.enUS;

    it("InProgress match", async () => {
        const request = CreateIntentRequest({
            name: name,
            locale: locale,
            dialogState: "IN_PROGRESS",
        });
        const response = await skill(request);
        expect(response).toMatchObject(inProgressDelegate(name));
    });

    it("InProgress ambiguous", async () => {
        const request = CreateIntentRequest({
            name: name,
            locale: locale,
            dialogState: "IN_PROGRESS",
            slots: {
                [SlotTypes.Quest]: {
                    resolutions: {
                        status: "ER_SUCCESS_MATCH",
                        values: [{
                            name: "Einhar's Hunt",
                        },
                        {
                            name: "Einhar's Bestiary",
                        },
                        {
                            name: "Einhar's Menagerie",
                        }]
                    }
                }
            }
        });
        const response = await skill(request);
        expect(response).toMatchObject(ssml(/Which would you like: Einhar's Hunt, Einhar's Bestiary or Einhar's Menagerie\?/gi));
    });

    it("Completed", async () => {
        const request = CreateIntentRequest({
            name: name,
            locale: locale,
            dialogState: "COMPLETED",
            slots: {
                [SlotTypes.Quest]: {
                    resolutions: {
                        status: "ER_SUCCESS_MATCH",
                        values: [{
                            name: "Vilenta's Vengeance",
                        }]
                    }
                }
            }
        });
        const response = await skill(request);
        expect(response).toMatchObject(ssml(/The reward for 'Vilenta's Vengeance' is: Book of Skill/gi));
    });
});
