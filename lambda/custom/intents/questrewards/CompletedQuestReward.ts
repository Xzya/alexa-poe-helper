import { RequestHandler } from "ask-sdk-core";
import { IntentRequest } from "ask-sdk-model";
import { GetRequestAttributes, IsIntentWithCompleteDialog, GetSlotValues, CreateError } from "../../lib/helpers";
import { SlotTypes, IntentTypes, ErrorTypes, Strings } from "../../lib/constants";

export const CompletedPlayRadio: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntentWithCompleteDialog(handlerInput, IntentTypes.QuestReward);
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request as IntentRequest;

        const { t } = GetRequestAttributes(handlerInput);
        const slots = GetSlotValues(request.intent.slots);

        const quest = slots[SlotTypes.Quest];

        if (quest && quest.isMatch && !quest.isAmbiguous) {
            const rewards = t(Strings.QUEST_REWARDS)
            const reward = rewards[quest.resolved];

            const speechText = t(Strings.QUEST_REWARD_MSG, quest.resolved, reward);

            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard(t(Strings.SKILL_NAME), speechText)
                .getResponse();
        }

        throw CreateError(`Got to the COMPLETED state of ${IntentTypes.QuestReward} without a slot.`, ErrorTypes.Unknown);
    }
};
