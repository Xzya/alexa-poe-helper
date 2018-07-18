import { RequestHandler } from "ask-sdk-core";
import { IntentRequest } from "ask-sdk-model";
import { GetRequestAttributes, IsIntentWithIncompleteDialog, ResetUnmatchedSlotValues } from "../../lib/helpers";
import { SlotTypes, IntentTypes, Strings } from "../../lib/constants";

export const InProgress: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntentWithIncompleteDialog(handlerInput, IntentTypes.EssencePriceCheck);
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request as IntentRequest;
        const currentIntent = request.intent;

        const { t, slots } = GetRequestAttributes(handlerInput);

        const slot = slots[SlotTypes.Essence];

        // if we have a match but it's ambiguous
        // ask for clarification
        if (slot && slot.isMatch && slot.isAmbiguous) {
            let prompt = "";
            const size = slot.values.length;

            slot.values
                .forEach((element, index) => {
                    prompt += `${(index === size - 1) ? t(Strings.OR_MSG) : " "} ${element.name}`;
                });

            return handlerInput.responseBuilder
                .speak(t(Strings.SELECT_ONE_MSG, prompt))
                .reprompt(t(Strings.SELECT_ONE_MSG, prompt))
                .addElicitSlotDirective(slot.name)
                .getResponse();
        }

        // reset any unmatched slots
        ResetUnmatchedSlotValues(handlerInput, slots);

        // let Alexa reprompt the user
        // or switch to the completed handler if it's done
        return handlerInput.responseBuilder
            .addDelegateDirective(currentIntent)
            .getResponse();
    }
};
