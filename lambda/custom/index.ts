import * as Alexa from "ask-sdk-core";
import * as Intents from "./intents";
import * as Errors from "./errors";
import * as Interceptors from "./interceptors";
import * as QuestRewardIntents from "./intents/questrewards";
import * as CurrencyPriceCheckIntents from "./intents/currencypricecheck";
import * as ItemPriceCheckIntents from "./intents/itempricecheck";

export const handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        // Intents.Debug,

        // Default intents
        Intents.Launch,
        Intents.Help,
        Intents.Stop,
        Intents.SessionEnded,
        Intents.SystemExceptionEncountered,
        Intents.Fallback,

        // Quest reward intents
        QuestRewardIntents.InProgress,
        QuestRewardIntents.Completed,

        // Currency price check intents
        CurrencyPriceCheckIntents.InProgress,
        CurrencyPriceCheckIntents.Completed,

        // Item price check
        ItemPriceCheckIntents.InProgress,
        ItemPriceCheckIntents.Completed
    )
    .addErrorHandlers(
        Errors.Unknown,
        Errors.Unexpected,
        Errors.API
    )
    .addRequestInterceptors(
        Interceptors.Localization,
        Interceptors.APIClient,
        Interceptors.Slots
    )
    .withApiClient(new Alexa.DefaultApiClient())
    .lambda();
