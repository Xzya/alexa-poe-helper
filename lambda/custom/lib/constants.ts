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
}

export enum SlotTypes {
    Quest = "quest",
}

export enum ErrorTypes {
    Unknown = "UnknownError",
}

export enum Strings {
    SKILL_NAME = "SKILL_NAME",
    WELCOME_MSG = "WELCOME_MSG",
    GOODBYE_MSG = "GOODBYE_MSG",
    HELP_MSG = "HELP_MSG",
    ERROR_MSG = "ERROR_MSG",
    SELECT_ONE_MSG = "SELECT_ONE_MSG",
    OR_MSG = "OR_MSG",
    QUEST_REWARD_MSG = "QUEST_REWARD_MSG",
    QUEST_REWARDS = "QUEST_REWARDS",
}
