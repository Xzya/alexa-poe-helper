export enum RequestTypes {
    Launch = "LaunchRequest",
    Intent = "IntentRequest",
    SessionEnded = "SessionEndedRequest",
    SystemExceptionEncountered = "System.ExceptionEncountered",
}

export enum IntentTypes {
    Help = "AMAZON.HelpIntent",
    Stop = "AMAZON.StopIntent",
    Cancel = "AMAZON.CancelIntent",
    Fallback = "AMAZON.FallbackIntent",

    QuestReward = "QuestRewardIntent",
    CurrencyPriceCheck = "CurrencyPriceCheckIntent",
    FragmentPriceCheck = "FragmentPriceCheckIntent",
    UniqueAccessoryPriceCheck = "UniqueAccessoryPriceCheckIntent",
    UniqueArmourPriceCheck = "UniqueArmourPriceCheckIntent",
    UniqueWeaponPriceCheck = "UniqueWeaponPriceCheckIntent",
    UniqueFlaskPriceCheck = "UniqueFlaskPriceCheckIntent",
    UniqueJewelPriceCheck = "UniqueJewelPriceCheckIntent",
    MapPriceCheck = "MapPriceCheckIntent",
    UniqueMapPriceCheck = "UniqueMapPriceCheckIntent",
    EssencePriceCheck = "EssencePriceCheckIntent",
    DivinationPriceCheck = "DivinationPriceCheckIntent",
    ProphecyPriceCheck = "ProphecyPriceCheckIntent",
    GemPriceCheck = "GemPriceCheckIntent",
}

export enum SlotTypes {
    Quest = "quest",
    Quantity = "quantity",
    Currency = "currency",
    Fragment = "fragment",
    League = "league",
    UniqueAccessory = "uniqueaccessory",
    UniqueArmour = "uniquearmour",
    Links = "links",
    UniqueWeapon = "uniqueweapon",
    UniqueFlask = "uniqueflask",
    UniqueJewel = "uniquejewel",
    Map = "map",
    UniqueMap = "uniquemap",
    Essence = "essence",
    Divination = "divination",
    Prophecy = "prophecy",
    Gem = "gem",
    Level = "level",
    Quality = "quality",
}

export enum ErrorTypes {
    Unknown = "UnknownError",
    Unexpected = "UnexpectedError",
    API = "APIError",
}

export enum LocaleTypes {
    deDE = "de-DE",
    enAU = "en-AU",
    enCA = "en-CA",
    enGB = "en-GB",
    enIN = "en-IN",
    enUS = "en-US",
    esES = "es-ES",
    frFR = "fr-FR",
    itIT = "it-IT",
    jaJP = "ja-JP",
}

export enum Strings {
    SKILL_NAME = "SKILL_NAME",
    WELCOME_MSG = "WELCOME_MSG",
    GOODBYE_MSG = "GOODBYE_MSG",
    HELP_MSG = "HELP_MSG",
    ERROR_MSG = "ERROR_MSG",
    ERROR_UNEXPECTED_MSG = "ERROR_UNEXPECTED_MSG",
    SELECT_ONE_MSG = "SELECT_ONE_MSG",
    OR_MSG = "OR_MSG",
    CHECKING_PRICE_OF_MSG = "CHECKING_PRICE_OF_MSG",
    PRICE_OF_IS_MSG = "PRICE_OF_IS_MSG",
    PRICE_OF_IS_EXALTED_MSG = "PRICE_OF_IS_EXALTED_MSG",
    LINKED = "LINKED",
    LEVEL = "LEVEL",
    QUALITY = "QUALITY",
    ERROR_NOT_ENOUGH_DATA_MSG = "ERROR_NOT_ENOUGH_DATA_MSG",
    ERROR_CURRENCY_NOT_FOUND_MSG = "ERROR_CURRENCY_NOT_FOUND_MSG",
    ERROR_ITEM_NOT_FOUND_MSG = "ERROR_ITEM_NOT_FOUND_MSG",
    ERROR_API_MSG = "ERROR_API_MSG",
    QUEST_REWARD_MSG = "QUEST_REWARD_MSG",
    QUEST_REWARDS = "QUEST_REWARDS",
}

export enum LeagueSlotTypes {
    Challenge = "Incursion",
    HardcoreChallenge = "Hardcore Incursion",
    Standard = "Standard",
    Hardcore = "Hardcore",
    IncursionEvent = "Flashback Event",
    HarcoreIncursionEvent = "Hardcore Flashback Event",
}
