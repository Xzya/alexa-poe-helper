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
import * as UniqueMapPriceCheckIntents from "./intents/uniquemappricecheck";
import * as EssencePriceCheckIntents from "./intents/essencepricecheck";
import * as DivinationPriceCheckIntents from "./intents/divinationpricecheck";
import * as ProphecyPriceCheckIntents from "./intents/prophecypricecheck";
import * as GemPriceCheckIntents from "./intents/gempricecheck";

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
        MapPriceCheckIntents.Completed,

        // Unique map price check
        UniqueMapPriceCheckIntents.InProgress,
        UniqueMapPriceCheckIntents.Completed,

        // Essence price check
        EssencePriceCheckIntents.InProgress,
        EssencePriceCheckIntents.Completed,

        // Divination price check
        DivinationPriceCheckIntents.InProgress,
        DivinationPriceCheckIntents.Completed,

        // Prophecy price check
        ProphecyPriceCheckIntents.InProgress,
        ProphecyPriceCheckIntents.Completed,

        // Skill gem price check
        GemPriceCheckIntents.InProgress,
        GemPriceCheckIntents.Completed
    )
    .addErrorHandlers(
        Errors.Unexpected,
        Errors.API,
        Errors.Unknown
    )
    .addRequestInterceptors(
        Interceptors.Localization,
        Interceptors.Slots
    )
    // TODO: - remove
    .withApiClient(new Alexa.DefaultApiClient())
    .lambda();
