import { RequestHandler } from "ask-sdk-core";
import { GetRequestAttributes, IsIntentWithCompleteDialog, CreateError } from "../../lib/helpers";
import { SlotTypes, IntentTypes, ErrorTypes, Strings } from "../../lib/constants";

export const Completed: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntentWithCompleteDialog(handlerInput, IntentTypes.QuestReward);
    },
    handle(handlerInput) {
        const { t, slots } = GetRequestAttributes(handlerInput);

        const slot = slots[SlotTypes.Quest];

        if (slot && slot.isMatch && !slot.isAmbiguous) {
            const rewards = t(Strings.QUEST_REWARDS)
            const reward = rewards[slot.resolved];

            const speechText = t(Strings.QUEST_REWARD_MSG, slot.resolved, reward);

            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard(t(Strings.SKILL_NAME), speechText)
                .getResponse();
        }

        throw CreateError(`Got to the COMPLETED state of ${IntentTypes.QuestReward} without a slot.`, ErrorTypes.Unexpected);
    }
};
