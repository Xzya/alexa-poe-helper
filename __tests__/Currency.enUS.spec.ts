import { skill, ssml, CreateIntentRequest, inProgressDelegate } from "./helpers";
import { IntentTypes, LocaleTypes, SlotTypes } from "../lambda/custom/lib/constants";
import { LeagueTypes } from "../lambda/custom/api";

// mock the poe.ninja api client
jest.mock("../lambda/custom/api/POENinjaClient");

describe("Currency", () => {
    const name = IntentTypes.CurrencyPriceCheck;
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
                [SlotTypes.Currency]: {
                    value: "exalted",
                    resolutions: {
                        status: "ER_SUCCESS_MATCH",
                        values: [{
                            name: "Exalted Orb",
                            id: "exa"
                        },
                        {
                            name: "Exalted Shard",
                            id: "exalted-shard"
                        }]
                    }
                }
            }
        });
        const response = await skill(request);
        expect(response).toMatchObject(ssml(/Which would you like: Exalted Orb or Exalted Shard\?/gi));
    });

    it("Completed, just currency", async () => {
        const request = CreateIntentRequest({
            name: name,
            locale: locale,
            dialogState: "COMPLETED",
            slots: {
                [SlotTypes.Currency]: {
                    resolutions: {
                        status: "ER_SUCCESS_MATCH",
                        values: [{
                            name: "Exalted Orb",
                            id: "exa"
                        }]
                    }
                }
            }
        });
        const response = await skill(request);
        expect(response).toMatchObject(ssml(/The price of 1 Exalted Orb in Incursion league is 123.5 Chaos Orbs/gi));
    });

    it("Completed, currency with quantity and league", async () => {
        const request = CreateIntentRequest({
            name: name,
            locale: locale,
            dialogState: "COMPLETED",
            slots: {
                [SlotTypes.Currency]: {
                    resolutions: {
                        status: "ER_SUCCESS_MATCH",
                        values: [{
                            name: "Exalted Orb",
                            id: "exa"
                        }]
                    }
                },
                [SlotTypes.Quantity]: {
                    value: "25",
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
        // 123.45 * 25 = 3086.25 => rounds to 3086.3
        expect(response).toMatchObject(ssml(/The price of 25 Exalted Orb in Standard league is 3086.3 Chaos Orbs/gi));
    });

    it("Completed, fragment with quantity and league", async () => {
        const request = CreateIntentRequest({
            name: name,
            locale: locale,
            dialogState: "COMPLETED",
            slots: {
                [SlotTypes.Currency]: {
                    resolutions: {
                        status: "ER_SUCCESS_MATCH",
                        values: [{
                            name: "Chayula's Breachstone",
                            id: "chayulas-breachstone"
                        }]
                    }
                },
                [SlotTypes.Quantity]: {
                    value: "25",
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
        // 123.45 * 25 = 3086.25 => rounds to 3086.3
        expect(response).toMatchObject(ssml(/The price of 25 Chayula's Breachstone in Standard league is 3086.3 Chaos Orbs/gi));
    });

    it("Completed, invalid currency", async () => {
        const request = CreateIntentRequest({
            name: name,
            locale: locale,
            dialogState: "COMPLETED",
            slots: {
                [SlotTypes.Currency]: {
                    value: "a"
                }
            }
        });
        const response = await skill(request);
        expect(response).toMatchObject(ssml(/unexpected error/gi));
    });
});
