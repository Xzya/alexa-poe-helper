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
    ItemPriceCheck = "ItemPriceCheckIntent",
    UniqueArmourPriceCheck = "UniqueArmourPriceCheckIntent",
}

export enum SlotTypes {
    Quest = "quest",
    Quantity = "quantity",
    Currency = "currency",
    League = "league",
    Item = "item",
    UniqueArmour = "uniquearmour",
    Links = "links",
}

export enum ErrorTypes {
    Unknown = "UnknownError",
    Unexpected = "UnexpectedError",
    API = "APIError",
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
    ERROR_NOT_ENOUGH_DATA_MSG = "ERROR_NOT_ENOUGH_DATA_MSG",
    ERROR_CURRENCY_NOT_FOUND_MSG = "ERROR_CURRENCY_NOT_FOUND_MSG",
    ERROR_ITEM_NOT_FOUND_MSG = "ERROR_ITEM_NOT_FOUND_MSG",
    ERROR_API_MSG = "ERROR_API_MSG",
    QUEST_REWARD_MSG = "QUEST_REWARD_MSG",
    QUEST_REWARDS = "QUEST_REWARDS",
}

export const Orbs = [
    "alt",
    "fuse",
    "alch",
    "chaos",
    "gcp",
    "exa",
    "chrom",
    "jew",
    "engineers-orb",
    "chance",
    "chisel",
    "scour",
    "blessed",
    "regret",
    "regal",
    "divine",
    "vaal",
    "orb-of-annulment",
    "orb-of-binding",
    "ancient-orb",
    "orb-of-horizons",
    "harbingers-orb",
    "wis",
    "port",
    "scr",
    "whe",
    "ba",
    "tra",
    "aug",
    "mir",
    "ete",
    "p",
    "silver",
    "annulment-shard",
    "mirror-shard",
    "exalted-shard",
    "binding-shard",
    "horizon-shard",
    "harbingers-shard",
    "engineers-shard",
    "ancient-shard",
    "chaos-shard",
    "regal-shard",
    "apprentice-sextant",
    "journeyman-sextant",
    "master-sextant",
    "blessing-xoph",
    "blessing-tul",
    "blessing-esh",
    "blessing-uul-netol",
    "blessing-chayula",
    "splinter-xoph",
    "splinter-tul",
    "splinter-esh",
    "splinter-uul",
    "splinter-chayula",
];

export const Fragments = [
    "dusk",
    "mid",
    "dawn",
    "noon",
    "grie",
    "rage",
    "hope",
    "ign",
    "eber",
    "yriel",
    "inya",
    "volkuur",
    "hydra",
    "phoenix",
    "minot",
    "chimer",
    "sacrifice-set",
    "mortal-set",
    "pale-court-set",
    "shaper-set",
    "xophs-breachstone",
    "tuls-breachstone",
    "eshs-breachstone",
    "uul-breachstone",
    "chayulas-breachstone",
    "offer",
    "divine-vessel",
    "ancient-reliquary-key",
];
