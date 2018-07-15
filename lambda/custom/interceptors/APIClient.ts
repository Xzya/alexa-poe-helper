import { RequestInterceptor } from "ask-sdk-core";
import { RequestAttributes } from "../interfaces";
import { POENinjaClient } from "../api/POENinjaClient";

/**
 * Adds the poe.ninja api client to the RequestAttributes.
 */
export const APIClient: RequestInterceptor = {
    process(handlerInput) {
        const attributes = handlerInput.attributesManager.getRequestAttributes() as RequestAttributes;

        attributes.apiClient = new POENinjaClient();
    },
};
