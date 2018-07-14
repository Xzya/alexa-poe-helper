import * as Alexa from "ask-sdk-core";
import * as Intents from "./intents";
import * as Errors from "./errors";
import * as Interceptors from "./interceptors";
import * as QuestRewardIntents from "./intents/questrewards";

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
        QuestRewardIntents.InProgressPlayRadio,
        QuestRewardIntents.CompletedPlayRadio
    )
    .addErrorHandlers(Errors.Unknown)
    .addRequestInterceptors(Interceptors.Localization)
    .lambda();
