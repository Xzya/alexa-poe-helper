import { Resource } from "i18next";
import { Strings, LocaleTypes } from "./constants";

interface IStrings {
    [Strings.SKILL_NAME]: string;
    [Strings.WELCOME_MSG]: string;
    [Strings.GOODBYE_MSG]: string[];
    [Strings.HELP_MSG]: string;
    [Strings.ERROR_MSG]: string;
    [Strings.ERROR_UNEXPECTED_MSG]: string;
    [Strings.SELECT_ONE_MSG]: string;
    [Strings.OR_MSG]: string;
    [Strings.CHECKING_PRICE_OF_MSG]: string;
    [Strings.PRICE_OF_IS_MSG]: string;
    [Strings.PRICE_OF_IS_EXALTED_MSG]: string;
    [Strings.LINKED]: string;
    [Strings.LEVEL]: string;
    [Strings.QUALITY]: string;
    [Strings.ERROR_NOT_ENOUGH_DATA_MSG]: string;
    [Strings.ERROR_CURRENCY_NOT_FOUND_MSG]: string;
    [Strings.ERROR_ITEM_NOT_FOUND_MSG]: string;
    [Strings.ERROR_API_MSG]: string;
    [Strings.QUEST_REWARD_MSG]: string;
    [Strings.QUEST_REWARDS]: any;
}

export const strings: Resource = {
    [LocaleTypes.enUS]: {
        translation: {
            SKILL_NAME: "Path of Exile Helper",
            WELCOME_MSG: "Welcome to P.O.E. Helper. How can I help?",
            GOODBYE_MSG: [
                "May your maps be merciful.",
                "Good luck with your maps exile.",
                "Stay sane.",
            ],
            HELP_MSG: `You can ask for the price of an item, or the reward of a quest. Here are some things you can try: "What is the price of an Exalted Orb?", or, "What is the price of one hundred fusings in Standard league?", or, "What is the price of a six linked Loreweave?", or, "What is the price of a twenty one twenty three Kinetic Blast?", or "What is the quest reward for The Dweller of the Deep?". How can I help?`,
            ERROR_MSG: "Sorry, I can't understand the command. Please say again.",
            ERROR_UNEXPECTED_MSG: "Sorry, an unexpected error has occured. Please try again later.",
            SELECT_ONE_MSG: "Which would you like: %s?",
            OR_MSG: " or ",
            CHECKING_PRICE_OF_MSG: "Checking the price of %s in %s league...",
            PRICE_OF_IS_MSG: "The price of %s '%s' in %s league is %s Chaos Orbs",
            PRICE_OF_IS_EXALTED_MSG: "The price of %s '%s' in %s league is %s Exalted Orbs or %s Chaos Orbs",
            LINKED: "a %s linked",
            LEVEL: "a level %s",
            QUALITY: " %s quality",
            ERROR_NOT_ENOUGH_DATA_MSG: "Sorry, there is not enough exchange data for the item you requested. Please try again later.",
            ERROR_CURRENCY_NOT_FOUND_MSG: "Sorry, I couldn't find the exchange for the currency you requested.",
            ERROR_ITEM_NOT_FOUND_MSG: "Sorry, I couldn't find the price of the item you requested.",
            ERROR_API_MSG: "Sorry, there was a problem while getting the data. Please try again later.",
            QUEST_REWARD_MSG: "The reward for '%s' is: %s",
            QUEST_REWARDS: {
                "Einhar's Hunt": "Reinforced Rope Net",
                "Einhar's Bestiary": "Simple Rope Net",
                "Einhar's Menagerie": "Simple Rope Net",
                "The Caged Brute": "Gem",
                "Mercy Mission": "Flask",
                "Breaking Some Eggs": "Gem",
                "The Siren's Cadence": "Gem",
                "Enemy at the Gate": "Gem",
                "A Dirty Job": "Book of Regrets",
                "The Dweller of the Deep": "Book of Skill",
                "The Marooned Mariner": "Book of Skill",
                "The Way Forward": "Book of Skill",
                "Intruders in Black": "Herald gem",
                "Through Sacred Ground": "Book of Regrets and Survival jewel",
                "The Great White Beast": "Flask or rare belt",
                "Sharp and Cruel": "Support gem",
                "Deal with the Bandits": "The Apex",
                "The Ribbon Spool": "Rare amulet",
                "Sever the Right Hand": "Gem with level 28 requirement",
                "Lost in Love": "Sewer Keys",
                "A Fixture of Fate": "Support gem with level 31 requirement such as Blasphemy Support",
                "Piety's Pets": "Book of Skill",
                "Victario's Secrets": "Book of Skill",
                "A Swig of Hope": "Rare ring",
                "Fiery Dust": "Infernal Talc",
                "Breaking the Seal": "Golem gem",
                "An Indomitable Spirit": "Book of Skill",
                "The Eternal Nightmare": "Support gem with level 38 requirement such as Greater Multiple Projectiles Support",
                "The King's Feast": "Assassin's Haste, Poacher's Aim or Warlord's Reach unique jewel",
                "In Service to Science": "Book of Skill",
                "Kitava's Torments": "Book of Skill",
                "Death to Purity": "Threshold jewel",
                "The Key to Freedom": "Flask",
                "Return to Oriath": "Rare ring",
                "Bestel's Epic": "Rare amulet or belt",
                "Fallen from Grace": "Book of Regrets",
                "The Cloven One": "Book of Skill",
                "The Father of War": "Book of Skill",
                "The Puppet Mistress": "Book of Skill",
                "Essence of Umbra": "Rare helmet",
                "In Memory of Greust": "Rare amulet",
                "The Silver Locket": "Flask",
                "Kishara's Star": "Book of Skill",
                "Queen of Despair": "Book of Skill",
                "The Master of a Million Faces": "Book of Skill",
                "Essence of the Artist": "Rare boots",
                "Web of Secrets": "Obsidian Key",
                "Love is Dead": "Book of Skill",
                "Reflection of Terror": "Book of Skill",
                "The Gemling Legion": "Book of Skill",
                "The Wings of Vastiri": "Conqueror's unique jewel",
                "Essence of the Hag": "Rare ring",
                "The Storm Blade": "Rare weapon, shield or quiver",
                "Fastis Fortuna": "Book of Regrets",
                "Queen of the Sands": "Book of Skill",
                "The Ruler of Highgate": "Book of Skill",
                "Safe Passage": "Flask",
                "Death and Rebirth": "Rare chest",
                "No Love for Old Ghosts": "Book of Regrets",
                "An End to Hunger": "Book of Skill",
                "Vilenta's Vengeance": "Book of Skill",
                "Map to Tsoatha": "Rare belt",
                "From Nightmare into Dream": "Map",
            },
        } as IStrings,
    },
};
