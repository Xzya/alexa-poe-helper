import { RequestHandler } from "ask-sdk-core";
import { IntentRequest } from "ask-sdk-model";
import { GetRequestAttributes, IsIntentWithIncompleteDialog, GetSlotValues, ResetSlotValue } from "../../lib/helpers";
import { SlotTypes, IntentTypes, Strings } from "../../lib/constants";

export const InProgressPlayRadio: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntentWithIncompleteDialog(handlerInput, IntentTypes.QuestReward);
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request as IntentRequest;
        const currentIntent = request.intent;

        const { t } = GetRequestAttributes(handlerInput);
        const slots = GetSlotValues(currentIntent.slots);

        const quest = slots[SlotTypes.Quest];

        // if we have a match but it's ambiguous
        // ask for clarification
        if (quest && quest.isMatch && quest.isAmbiguous) {
            let prompt = "";
            const size = quest.values.length;

            quest.values
                .forEach((element, index) => {
                    prompt += `${(index === size - 1) ? t(Strings.OR_MSG) : " "} ${element.name}`;
                });

            return handlerInput.responseBuilder
                .speak(t(Strings.SELECT_ONE_MSG, prompt))
                .reprompt(t(Strings.SELECT_ONE_MSG, prompt))
                .addElicitSlotDirective(quest.name)
                .getResponse();
        }

        // if we have a quest, but it is not matched against any of our values
        // (e.g. if user said "asdf")
        // make sure to reset the value so that Alexa reprompts the user
        if (quest && !quest.isMatch) {
            ResetSlotValue(request, SlotTypes.Quest);
        }

        // otherwise let Alexa reprompt the user
        // or switch to the completed handler if it's done

        return handlerInput.responseBuilder
            .addDelegateDirective(currentIntent)
            .getResponse();
    }
};
