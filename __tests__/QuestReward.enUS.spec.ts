import * as _ from "lodash";
import { skill, RequestInProgressMatch, ResponseInProgressMatch, RequestInProgressAmbiguous, ResponseInProgressAmbiguous, RequestCompleted, ssml } from "./helpers";
import { IntentTypes, SlotTypes, LocaleTypes } from "../lambda/custom/lib/constants";

describe("Quest reward", () => {
    const _data = {
        intentName: IntentTypes.QuestReward,
        locale: LocaleTypes.enUS,
        slotName: SlotTypes.Quest,
    };

    let data = _.cloneDeep(_data);

    beforeEach(() => {
        // reset the values
        data = _.cloneDeep(_data);
    });

    it("InProgress match", async () => {
        const options = Object.assign(data, {
            slotValue: "Vilenta's Vengeance",
        });

        const response = await skill(RequestInProgressMatch(options));
        expect(response).toMatchObject(ResponseInProgressMatch(options));
    });

    it("InProgress ambiguous", async () => {
        const options = Object.assign(data, {
            slotResolutionValues: [
                "Einhar's Hunt",
                "Einhar's Bestiary",
                "Einhar's Menagerie",
            ],
            pattern: /Which would you like: Einhar's Hunt, Einhar's Bestiary or Einhar's Menagerie\?/gi,
        });

        const response = await skill(RequestInProgressAmbiguous(options));
        expect(response).toMatchObject(ResponseInProgressAmbiguous(options));
    });

    it("Completed", async () => {
        const options = Object.assign(data, {
            slotValue: "Vilenta's Vengeance",
        });

        const response = await skill(RequestCompleted(options));
        expect(response).toMatchObject(ssml(/The reward for 'Vilenta's Vengeance' is: Book of Skill/gi));
    });
});
