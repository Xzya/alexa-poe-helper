import { RequestInterceptor } from "ask-sdk-core";
import { RequestAttributes } from "../interfaces";
import { POENinjaClient } from "../api/POENinjaClient";

export const APIClient: RequestInterceptor = {
    process(handlerInput) {
        const attributes = handlerInput.attributesManager.getRequestAttributes() as RequestAttributes;

        attributes.apiClient = new POENinjaClient();
    },
};
