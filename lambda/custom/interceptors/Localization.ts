import { RequestInterceptor } from "ask-sdk-core";
import * as i18n from "i18next";
import * as sprintf from "i18next-sprintf-postprocessor";
import { strings } from "../lib/strings";
import { Random } from "../lib/helpers";
import { RequestAttributes } from "../interfaces";

type TranslationFunction = (...args: any[]) => string;

export const Localization: RequestInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: strings,
            returnObjects: true,
        });

        const attributes = handlerInput.attributesManager.getRequestAttributes() as RequestAttributes;
        attributes.t = function (...args: any[]) {
            return (localizationClient.t as TranslationFunction)(...args);
        };
        attributes.tr = function (key: any) {
            const result = localizationClient.t(key) as string[];

            return Random(result);
        };
    },
};
