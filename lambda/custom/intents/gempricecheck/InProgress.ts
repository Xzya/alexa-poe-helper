import { RequestHandler } from "ask-sdk-core";
import { IntentRequest } from "ask-sdk-model";
import { GetRequestAttributes, IsIntentWithIncompleteDialog, ResetUnmatchedSlotValues, ResetSlotValue } from "../../lib/helpers";
import { SlotTypes, IntentTypes, Strings } from "../../lib/constants";

export const InProgress: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntentWithIncompleteDialog(handlerInput, IntentTypes.GemPriceCheck);
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request as IntentRequest;
        const currentIntent = request.intent;

        const { t, slots } = GetRequestAttributes(handlerInput);

        const slot = slots[SlotTypes.Gem];

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

        // validate the level and quality
        const levelSlot = slots[SlotTypes.Level];
        const qualitySlot = slots[SlotTypes.Quality];

        if (levelSlot && levelSlot.isMatch && !levelSlot.isAmbiguous) {
            const level = parseInt(levelSlot.value);
            if (level != 4 && (level < 20 || level > 21 || isNaN(level))) {
                ResetSlotValue(request, SlotTypes.Level);
            }
        }

        if (qualitySlot && qualitySlot.isMatch && !qualitySlot.isAmbiguous) {
            const quality = parseInt(qualitySlot.value);
            if (quality < 20 || quality > 23 || isNaN(quality)) {
                ResetSlotValue(request, SlotTypes.Quality);
            }
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
