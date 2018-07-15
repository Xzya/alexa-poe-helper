import { ErrorHandler } from "ask-sdk-core";
import { GetRequestAttributes } from "../lib/helpers";
import { Strings, ErrorTypes } from "../lib/constants";

/**
 * Handles ErrorTypes.API errors which should be thrown whenever there is
 * an API error.
 */
export const API: ErrorHandler = {
    canHandle(_, error) {
        return error.name === ErrorTypes.API;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        const { t } = GetRequestAttributes(handlerInput);

        return handlerInput.responseBuilder
            .speak(t(Strings.ERROR_API_MSG))
            .getResponse();
    },
};
