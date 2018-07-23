import { RequestHandler } from "ask-sdk-core";
import { IntentRequest } from "ask-sdk-model";
import { IsIntentWithIncompleteDialog, GetRequestAttributes, DisambiguateSlot, ResetUnmatchedSlotValues, TryToResolveValue } from "../../lib/helpers";

/**
 * Creates a Dialog handler with incomplete state.
 * 
 * @param options 
 */
export function CreateNormalItemInProgressHandler(options: {
    intentName: string;
    slotName: string;
}): RequestHandler {
    return {
        canHandle(handlerInput) {
            return IsIntentWithIncompleteDialog(handlerInput, options.intentName);
        },
        handle(handlerInput) {
            const request = handlerInput.requestEnvelope.request as IntentRequest;
            const currentIntent = request.intent;

            const { slots } = GetRequestAttributes(handlerInput);

            const slot = slots[options.slotName];

            // if we have a match but it's ambiguous
            // ask for clarification
            if (slot && slot.isMatch && slot.isAmbiguous) {
                // try to resolve the value
                if (!TryToResolveValue(currentIntent, slot)) {
                    // otherwise try to disambiguate it
                    return DisambiguateSlot(handlerInput, slot);
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
}
