import { skill, ssml, CreateIntentRequest, inProgressDelegate } from "./helpers";
import { IntentTypes, LocaleTypes, SlotTypes } from "../lambda/custom/lib/constants";
import { LeagueTypes } from "../lambda/custom/api";

// mock the poe.ninja api client
jest.mock("../lambda/custom/api/POENinjaClient");

describe("Prophecies", () => {
    const name = IntentTypes.ProphecyPriceCheck;
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
                [SlotTypes.Prophecy]: {
                    resolutions: {
                        status: "ER_SUCCESS_MATCH",
                        values: [{
                            name: "Unbearable Whispers I",
                        },
                        {
                            name: "Unbearable Whispers II",
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
                [SlotTypes.Prophecy]: {
                    resolutions: {
                        status: "ER_SUCCESS_MATCH",
                        values: [{
                            name: "Fated Connections",
                        }]
                    }
                }
            }
        });
        const response = await skill(request);
        expect(response).toMatchObject(ssml(/The price of 1 '.+' in Incursion league is 123.5 Chaos Orbs/gi));
    });

    it("Completed, chaos and exalt price and league", async () => {
        const request = CreateIntentRequest({
            name: name,
            locale: locale,
            dialogState: "COMPLETED",
            slots: {
                [SlotTypes.Prophecy]: {
                    resolutions: {
                        status: "ER_SUCCESS_MATCH",
                        values: [{
                            name: "The Queen's Sacrifice",
                        }]
                    }
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
        expect(response).toMatchObject(ssml(/The price of 1 '.+' in Standard league is 12.3 Exalted Orbs or 123.5 Chaos Orbs/gi));
    });

    it("Completed, not found", async () => {
        const request = CreateIntentRequest({
            name: name,
            locale: locale,
            dialogState: "COMPLETED",
            slots: {
                [SlotTypes.Prophecy]: {
                    resolutions: {
                        status: "ER_SUCCESS_MATCH",
                        values: [{
                            name: "A Vision of Ice and Fire",
                        }]
                    }
                },
            }
        });
        const response = await skill(request);
        expect(response).toMatchObject(ssml(/Sorry, I couldn't find the price of the item you requested/gi));
    });
});
