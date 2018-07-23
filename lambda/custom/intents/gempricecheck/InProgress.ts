import { RequestHandler } from "ask-sdk-core";
import { IntentRequest } from "ask-sdk-model";
import { IsIntentWithIncompleteDialog, ResetUnmatchedSlotValues, ResetSlotValue, DisambiguateSlot, SetSlotValue, GetSlotValues, TryToResolveValue } from "../../lib/helpers";
import { SlotTypes, IntentTypes } from "../../lib/constants";

/**
 * Checks if the given value is in the form "2123". This happens if you say something
 * like "twenty one twenty three", Alexa will interpret it as a single number, so we
 * need to manually split it. If it detects this case, it will manually set the slot values.
 * 
 * @param request 
 * @param value 
 */
function ParseLevelAndQualityInSingleSlot(request: IntentRequest, value?: string) {
    if (value && value.length === 4) {
        const first = value.substr(0, 2);
        const second = value.substr(2, 2);

        const firstValue = parseInt(first);
        const secondValue = parseInt(second);

        if (!isNaN(firstValue) && !isNaN(secondValue)) {
            SetSlotValue(request, SlotTypes.Level, first);
            SetSlotValue(request, SlotTypes.Quality, second);
        }
    }
}

export const InProgress: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntentWithIncompleteDialog(handlerInput, IntentTypes.GemPriceCheck);
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request as IntentRequest;
        const currentIntent = request.intent;

        if (currentIntent.slots) {
            const levelSlot = currentIntent.slots[SlotTypes.Level];
            const qualitySlot = currentIntent.slots[SlotTypes.Quality];

            if (levelSlot) {
                ParseLevelAndQualityInSingleSlot(request, levelSlot.value);
            }
            if (qualitySlot) {
                ParseLevelAndQualityInSingleSlot(request, qualitySlot.value);
            }
        }

        const slots = GetSlotValues(currentIntent.slots);

        const slot = slots[SlotTypes.Gem];

        // if we have a match but it's ambiguous
        // ask for clarification
        if (slot && slot.isMatch && slot.isAmbiguous) {
            // try to resolve the value
            if (!TryToResolveValue(currentIntent, slot)) {
                // otherwise try to disambiguate it
                return DisambiguateSlot(handlerInput, slot);
            }
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
