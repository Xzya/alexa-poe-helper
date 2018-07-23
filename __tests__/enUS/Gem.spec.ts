import { ResponseEnvelope } from "ask-sdk-model";
import { IntentTypes, SlotTypes, LocaleTypes } from "../../lambda/custom/lib/constants";
import { CreateIntentRequest, skill, inProgressDelegate, ssml, partial } from "../helpers";
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

    it("Completed, fix level or quality slot detecting 2023 instead of splitting it", async () => {
        const expectedResponse = partial<ResponseEnvelope>({
            response: {
                directives: [
                    {
                        type: "Dialog.Delegate",
                        updatedIntent: {
                            name: name,
                            slots: {
                                [SlotTypes.Level]: {
                                    name: SlotTypes.Level,
                                    value: "21"
                                },
                                [SlotTypes.Quality]: {
                                    name: SlotTypes.Quality,
                                    value: "23"
                                },
                            }
                        }
                    }
                ]
            }
        });
        let request = CreateIntentRequest({
            name: name,
            locale: locale,
            dialogState: "STARTED",
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
                    value: "2123"
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
        let response = await skill(request);
        expect(response).toMatchObject(expectedResponse);

        request = CreateIntentRequest({
            name: name,
            locale: locale,
            dialogState: "STARTED",
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
                    value: ""
                },
                [SlotTypes.Quality]: {
                    value: "2123"
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
        response = await skill(request);
        expect(response).toMatchObject(expectedResponse);
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
