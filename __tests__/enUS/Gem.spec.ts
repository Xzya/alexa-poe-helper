import { GenericTest } from "../generic";
import { IntentTypes, SlotTypes, LocaleTypes } from "../../lambda/custom/lib/constants";
import { CreateIntentRequest, skill, inProgressDelegate, ssml } from "../helpers";
import { LeagueTypes } from "../../lambda/custom/api";

// mock the poe.ninja api client
jest.mock("../../lambda/custom/api/POENinjaClient");

describe("Skill Gems", () => {
    const name = IntentTypes.GemPriceCheck;
    const locale = LocaleTypes.enUS;

    it("InProgress", async () => {
        const request = CreateIntentRequest({
            name: name,
            locale: locale,
            dialogState: "IN_PROGRESS",
        });
        const response = await skill(request);
        expect(response).toMatchObject(inProgressDelegate(name));
    });

    it("InProgress ambiguous", async () => {
        const request = CreateIntentRequest({
            name: name,
            locale: locale,
            dialogState: "IN_PROGRESS",
            slots: {
                [SlotTypes.Gem]: {
                    resolutions: {
                        status: "ER_SUCCESS_MATCH",
                        values: [{
                            name: "Value 1",
                        },
                        {
                            name: "Value 2",
                        }]
                    }
                }
            }
        });
        const response = await skill(request);
        expect(response).toMatchObject(ssml(/Which would you like:/gi));
    });

    it("Completed, chaos only price", async () => {
        const request = CreateIntentRequest({
            name: name,
            locale: locale,
            dialogState: "COMPLETED",
            slots: {
                [SlotTypes.Gem]: {
                    resolutions: {
                        status: "ER_SUCCESS_MATCH",
                        values: [{
                            name: "Value 2",
                        }]
                    }
                },
                [SlotTypes.Level]: {
                    value: "21"
                }
            }
        });
        const response = await skill(request);
        expect(response).toMatchObject(ssml(/The price of a level 21 '.+' in Incursion league is 123.5 Chaos Orbs/gi));
    });

    it("Completed, chaos and exalt price and league", async () => {
        const request = CreateIntentRequest({
            name: name,
            locale: locale,
            dialogState: "COMPLETED",
            slots: {
                [SlotTypes.Gem]: {
                    resolutions: {
                        status: "ER_SUCCESS_MATCH",
                        values: [{
                            name: "Value 1",
                        }]
                    }
                },
                [SlotTypes.Level]: {
                    value: "21"
                },
                [SlotTypes.Quality]: {
                    value: "23"
                },
                [SlotTypes.League]: {
                    resolutions: {
                        status: "ER_SUCCESS_MATCH",
                        values: [{
                            name: "Standard",
                            id: LeagueTypes.Standard
                        }]
                    }
                },
            }
        });
        const response = await skill(request);
        expect(response).toMatchObject(ssml(/The price of a level 21 23 quality '.+' in Standard league is 12.3 Exalted Orbs or 123.5 Chaos Orbs/gi));
    });

    it("Completed, not found", async () => {
        const request = CreateIntentRequest({
            name: name,
            locale: locale,
            dialogState: "COMPLETED",
            slots: {
                [SlotTypes.Gem]: {
                    resolutions: {
                        status: "ER_SUCCESS_MATCH",
                        values: [{
                            name: "Value 3",
                        }]
                    }
                },
                [SlotTypes.Level]: {
                    value: "21"
                },
            }
        });
        const response = await skill(request);
        expect(response).toMatchObject(ssml(/Sorry, I couldn't find the price of the item you requested/gi));
    });
});
