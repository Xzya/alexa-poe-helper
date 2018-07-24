import { RequestHandler } from "ask-sdk-core";
import { IntentTypes, Strings } from "../lib/constants";
import { IsIntent, GetRequestAttributes } from "../lib/helpers";

export const Stop: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, IntentTypes.Stop, IntentTypes.Cancel);
    },
    handle(handlerInput) {
        const { tr } = GetRequestAttributes(handlerInput);

        const speechText = tr(Strings.GOODBYE_MSG);

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
