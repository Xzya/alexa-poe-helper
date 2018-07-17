import * as Alexa from "ask-sdk-core";
import * as Intents from "./intents";
import * as Errors from "./errors";
import * as Interceptors from "./interceptors";
import * as QuestRewardIntents from "./intents/questrewards";
import * as CurrencyPriceCheckIntents from "./intents/currencypricecheck";
import * as UniqueAccessoryPriceCheckIntents from "./intents/uniqueaccessorypricecheck";
import * as UniqueArmourPriceCheckIntents from "./intents/uniquearmourpricecheck";
import * as UniqueWeaponPriceCheckIntents from "./intents/uniqueweaponpricecheck";
import * as UniqueFlaskPriceCheckIntents from "./intents/uniqueflaskpricecheck";
import * as UniqueJewelPriceCheckIntents from "./intents/uniquejewelpricecheck";
import * as MapPriceCheckIntents from "./intents/mappricecheck";

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

        // Unique accessory price check
        UniqueAccessoryPriceCheckIntents.InProgress,
        UniqueAccessoryPriceCheckIntents.Completed,

        // Unique armour price check
        UniqueArmourPriceCheckIntents.InProgress,
        UniqueArmourPriceCheckIntents.Completed,

        // Unique weapon price check
        UniqueWeaponPriceCheckIntents.InProgress,
        UniqueWeaponPriceCheckIntents.Completed,

        // Unique flask price check
        UniqueFlaskPriceCheckIntents.InProgress,
        UniqueFlaskPriceCheckIntents.Completed,

        // Unique jewel price check
        UniqueJewelPriceCheckIntents.InProgress,
        UniqueJewelPriceCheckIntents.Completed,

        // Map price check
        MapPriceCheckIntents.InProgress,
        MapPriceCheckIntents.Completed
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
