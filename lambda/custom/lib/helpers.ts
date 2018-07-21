import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { IntentRequest, services } from "ask-sdk-model";
import { RequestAttributes, Slots, SlotValues, SessionAttributes, MatchedSlotValue } from "../interfaces";
import { RequestTypes, ErrorTypes, Orbs, Fragments, Strings, SlotTypes } from "./constants";
import { UniqueAccessories, UniqueArmours, UniqueWeapons } from "./items";
import { LeagueTypes, ItemEntity, ItemRequestTypes, apiClient } from "../api";

/**
 * Checks if the request matches any of the given intents.
 * 
 * @param handlerInput 
 * @param intents 
 */
export function IsIntent(handlerInput: HandlerInput, ...intents: string[]): boolean {
    if (handlerInput.requestEnvelope.request.type === RequestTypes.Intent) {
        for (let i = 0; i < intents.length; i++) {
            if (handlerInput.requestEnvelope.request.intent.name === intents[i]) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Checks if the request matches any of the given types.
 * 
 * @param handlerInput 
 * @param types 
 */
export function IsType(handlerInput: HandlerInput, ...types: string[]): boolean {
    for (let i = 0; i < types.length; i++) {
        if (handlerInput.requestEnvelope.request.type === types[i]) {
            return true;
        }
    }
    return false;
}

/**
 * Checks if the request matches the given intent and dialogState.
 * 
 * @param handlerInput 
 * @param intent 
 * @param state 
 */
export function IsIntentWithDialogState(handlerInput: HandlerInput, intent: string, state: string): boolean {
    return handlerInput.requestEnvelope.request.type === RequestTypes.Intent
        && handlerInput.requestEnvelope.request.intent.name === intent
        && handlerInput.requestEnvelope.request.dialogState === state;
}

/**
 * Checks if the request matches the given intent with a non COMPLETED dialogState.
 * 
 * @param handlerInput 
 * @param intent 
 */
export function IsIntentWithIncompleteDialog(handlerInput: HandlerInput, intent: string): boolean {
    return handlerInput.requestEnvelope.request.type === RequestTypes.Intent
        && handlerInput.requestEnvelope.request.intent.name === intent
        && handlerInput.requestEnvelope.request.dialogState !== "COMPLETED";
}

/**
 * Checks if the request matches the given intent with the COMPLETED dialogState.
 * 
 * @param handlerInput 
 * @param intent 
 */
export function IsIntentWithCompleteDialog(handlerInput: HandlerInput, intent: string): boolean {
    return IsIntentWithDialogState(handlerInput, intent, "COMPLETED");
}

/**
 * Gets the request attributes and casts it to our custom RequestAttributes type.
 * 
 * @param handlerInput 
 */
export function GetRequestAttributes(handlerInput: HandlerInput): RequestAttributes {
    return handlerInput.attributesManager.getRequestAttributes() as RequestAttributes;
}

/**
 * Gets the session attributes and casts it to our custom SessionAttributes type.
 * 
 * @param handlerInput 
 */
export function GetSessionAttributes(handlerInput: HandlerInput): SessionAttributes {
    return handlerInput.attributesManager.getSessionAttributes() as SessionAttributes;
}

/**
 * Gets the directive service client.
 * 
 * @param handlerInput 
 */
export function GetDirectiveServiceClient(handlerInput: HandlerInput): services.directive.DirectiveServiceClient {
    return handlerInput.serviceClientFactory!.getDirectiveServiceClient();
}

/**
 * Resets the given slot value by setting it to an empty string.
 * If the intent is using the Dialog Directive, this will cause Alexa
 * to reprompt the user for that slot.
 * 
 * @param request 
 * @param slotName 
 */
export function ResetSlotValue(request: IntentRequest, slotName: string) {
    if (request.intent.slots) {
        const slot = request.intent.slots[slotName];
        if (slot) {
            slot.value = "";
        }
    }
}

/**
 * Resets all unmatched slot values by setting them to an empty string.
 * If the intent is using the Dialog Directive, this will cause Alexa
 * to reprompt the user for those slots.
 * 
 * @param request 
 */
export function ResetUnmatchedSlotValues(handlerInput: HandlerInput, slots: SlotValues) {
    if (handlerInput.requestEnvelope.request.type === RequestTypes.Intent) {
        const request = handlerInput.requestEnvelope.request;

        // reset invalid slots
        Object.keys(slots).forEach((key) => {
            const slot = slots[key];

            if (slot && !slot.isMatch) {
                ResetSlotValue(request, slot.name);
            }
        });
    }
}

/**
 * Parses the slot values and returns a new object with additional information,
 * e.g. if the value was matched, or if it is ambiguous etc.
 * 
 * Example:
 *   If we have the following Drink Slot Type:
 *   {
 *     "types": [{
 *       "values": [{
 *           "id": "cocacola",
 *           "name": {
 *             "value": "Coca Cola"
 *           }
 *         },
 *         {
 *           "id": "cocacolazero",
 *           "name": {
 *             "value": "Coca Cola Zero"
 *           }
 *         }
 *       ]
 *     }]
 *   }
 * 
 *   If the user said "Cola", the following value should be generated:
 *   {
 *     "name": "drink", // slot name
 *     "value": "Cola", // what the user said
 *     "isMatch": true, // was successfuly matched with our slot type
 *     "resolved": "Coca Cola", // the first resolved value
 *     "id": "cocacola", // the first resolved id
 *     "isAmbiguous": true, // true because we matched multiple possible values
 *     "values": [{
 *         "name": "Coca Cola",
 *         "id": "cocacola"
 *       },
 *       {
 *         "name": "Coca Cola Zero",
 *         "id": "cocacolazero"
 *       }
 *     ],
 *     "confirmationStatus": "NONE"
 *   }
 * 
 * @param filledSlots 
 */
export function GetSlotValues(filledSlots?: Slots): SlotValues {
    const slotValues: SlotValues = {};

    if (filledSlots) {
        Object.keys(filledSlots).forEach((item) => {
            const name = filledSlots[item].name;
            const value = filledSlots[item].value;
            const confirmationStatus = filledSlots[item].confirmationStatus;

            if (filledSlots[item] &&
                filledSlots[item].resolutions &&
                filledSlots[item].resolutions!.resolutionsPerAuthority &&
                filledSlots[item].resolutions!.resolutionsPerAuthority![0] &&
                filledSlots[item].resolutions!.resolutionsPerAuthority![0].status &&
                filledSlots[item].resolutions!.resolutionsPerAuthority![0].status.code) {
                switch (filledSlots[item].resolutions!.resolutionsPerAuthority![0].status.code) {
                    case "ER_SUCCESS_MATCH":
                        const valueWrappers = filledSlots[item].resolutions!.resolutionsPerAuthority![0].values;

                        if (valueWrappers.length > 1) {
                            slotValues[name] = {
                                name: name,
                                value: value,
                                isMatch: true,
                                resolved: valueWrappers[0].value.name,
                                id: valueWrappers[0].value.id,
                                isAmbiguous: true,
                                values: valueWrappers.map((valueWrapper) => valueWrapper.value),
                                confirmationStatus: confirmationStatus,
                            };
                            break;
                        }

                        slotValues[name] = {
                            name: name,
                            value: value,
                            isMatch: true,
                            resolved: valueWrappers[0].value.name,
                            id: valueWrappers[0].value.id,
                            isAmbiguous: false,
                            values: [],
                            confirmationStatus: confirmationStatus,
                        };
                        break;
                    case "ER_SUCCESS_NO_MATCH":
                        slotValues[name] = {
                            name: name,
                            value: value,
                            isMatch: false,
                            confirmationStatus: confirmationStatus,
                        };
                        break;
                    default:
                        break;
                }
            }
            // slots which do not have any resolutions but have a value
            // e.g. for AMAZON.NUMBER
            else if (filledSlots[item] &&
                !filledSlots[item].resolutions &&
                filledSlots[item].value) {
                slotValues[name] = {
                    name: name,
                    value: value,
                    isMatch: true,
                    resolved: value,
                    id: "",
                    isAmbiguous: false,
                    values: [],
                    confirmationStatus: confirmationStatus,
                };
            } else {
                slotValues[name] = {
                    name: name,
                    value: value,
                    isMatch: false,
                    confirmationStatus: confirmationStatus,
                };
            }
        });
    }

    return slotValues;
}

/**
 * Wraps the given string as an interjection.
 * 
 * @param str 
 */
export function Interject(str: string): string {
    return `<say-as interpret-as="interjection">${str}</say-as>`;
}

/**
 * Creates an error with the given message and type.
 * 
 * @param msg 
 * @param type 
 */
export function CreateError(
    msg: string = "Something unexpected happened.",
    type: string = ErrorTypes.Unknown
): Error {
    const error = new Error(msg);
    error.name = type;

    return error;
}

/**
 * Selects a random element from the array;
 * 
 * @param arr 
 */
export function Random<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Returns a VoicePlayer.Speak directive with the given speech. Useful for sending progressive responses.
 * 
 * @param handlerInput 
 * @param speech 
 */
export function VoicePlayerSpeakDirective(handlerInput: HandlerInput, speech?: string): services.directive.SendDirectiveRequest {
    const requestId = handlerInput.requestEnvelope.request.requestId;

    return {
        directive: {
            type: "VoicePlayer.Speak",
            speech: speech,
        },
        header: {
            requestId,
        },
    };
}

/**
 * Rounds the number to one decimal place.
 * 
 * @param n 
 */
export function FormatPrice(n: number): number {
    return Math.round(n * 10) / 10;
}

/**
 * Checks if the given string matches an orb id.
 * 
 * @param str 
 */
export function IsOrb(str: string): boolean {
    return Orbs.indexOf(str) !== -1;
}

/**
 * Checks if the given string matches a fragment id.
 * 
 * @param str 
 */
export function IsFragment(str: string): boolean {
    return Fragments.indexOf(str) !== -1;
}

/**
 * Checks if the given string matches a unique accessory.
 * 
 * @param str 
 */
export function IsUniqueAccessory(str: string): boolean {
    return UniqueAccessories.indexOf(str) !== -1;
}

/**
 * Checks if the given string matches a unique armour.
 * 
 * @param str 
 */
export function IsUniqueArmour(str: string): boolean {
    return UniqueArmours.indexOf(str) !== -1;
}

/**
 * Checks if the given string matches a unique weapon.
 * 
 * @param str 
 */
export function IsUniqueWeapon(str: string): boolean {
    return UniqueWeapons.indexOf(str) !== -1;
}

/**
 * Returns today's date in the format YYYY-MM-DD used by poe.ninja
 */
export function CurrentDate() {
    return (new Date).toISOString().substring(0, 10);
}

/**
 * Repropts the user to say a slot if it is ambiguous.
 * 
 * @param handlerInput 
 * @param slot 
 */
export function DisambiguateSlot(handlerInput: HandlerInput, slot: MatchedSlotValue) {
    const { t } = GetRequestAttributes(handlerInput);

    let prompt = "";
    const size = slot.values.length;

    slot.values
        .forEach((element, index) => {
            if (index === size - 1) {
                prompt += t(Strings.OR_MSG);
            } else if (index !== 0) {
                prompt += ", ";
            }
            prompt += element.name;
        });

    return handlerInput.responseBuilder
        .speak(t(Strings.SELECT_ONE_MSG, prompt))
        .reprompt(t(Strings.SELECT_ONE_MSG, prompt))
        .addElicitSlotDirective(slot.name)
        .getResponse();
}

/**
 * Returns the LeagueType if it was found in the slots.
 * Defaults to LeagueTypes.Challenge.
 * 
 * @param slots 
 */
export function GetLeagueSlot(slots: SlotValues): LeagueTypes {
    const leagueSlot = slots[SlotTypes.League];
    if (leagueSlot && leagueSlot.isMatch) {
        return leagueSlot.resolved as LeagueTypes
    }

    return LeagueTypes.Challenge;
}

/**
 * Returns the links slot. Defaults to 0.
 * 
 * @param slots 
 */
export function GetLinksSlot(slots: SlotValues): number {
    let links = 0;

    const linksSlot = slots[SlotTypes.Links];
    if (linksSlot && linksSlot.isMatch) {
        links = parseFloat(linksSlot.value);
        if (links < 5 || links > 6 || isNaN(links)) {
            links = 0;
        }
    }

    return links;
}

/**
 * Checks the count of the ItemEntity. Returns true if the count >= 5.
 * 
 * @param value 
 */
export function IsHighConfidenceItemPrice(value: ItemEntity) {
    return value.count >= 5;
}

/**
 * Creates a Dialog handler with incomplete state.
 * 
 * @param options 
 */
export function CreateDefaultInProgressHandler(options: {
    intentName: string;
    slotName: string;
}): RequestHandler {
    return {
        canHandle(handlerInput) {
            return IsIntentWithIncompleteDialog(handlerInput, options.intentName);
        },
        handle(handlerInput) {
            const request = handlerInput.requestEnvelope.request as IntentRequest;
            const currentIntent = request.intent;

            const { slots } = GetRequestAttributes(handlerInput);

            const slot = slots[options.slotName];

            // if we have a match but it's ambiguous
            // ask for clarification
            if (slot && slot.isMatch && slot.isAmbiguous) {
                return DisambiguateSlot(handlerInput, slot);
            }

            // reset any unmatched slots
            ResetUnmatchedSlotValues(handlerInput, slots);

            // let Alexa reprompt the user
            // or switch to the completed handler if it's done
            return handlerInput.responseBuilder
                .addDelegateDirective(currentIntent)
                .getResponse();
        }
    };
}

/**
 * Creates an item Dialog handler with complete state.
 * 
 * @param options 
 */
export function CreateDefaultCompletedItemHandler(options: {
    intentName: string;
    slotName: string;
    requestType: ItemRequestTypes;
}): RequestHandler {
    return {
        canHandle(handlerInput) {
            return IsIntentWithCompleteDialog(handlerInput, options.intentName);
        },
        async handle(handlerInput) {
            const directiveServiceClient = GetDirectiveServiceClient(handlerInput);
            const { t, slots } = GetRequestAttributes(handlerInput);

            const item = slots[options.slotName];

            if (item && item.isMatch && !item.isAmbiguous) {
                try {
                    const league = GetLeagueSlot(slots);

                    const [res] = await Promise.all([
                        // get the item prices
                        apiClient.items({
                            league: league,
                            type: options.requestType,
                            date: CurrentDate(),
                        }),

                        // send progressive response
                        directiveServiceClient.enqueue(VoicePlayerSpeakDirective(handlerInput, t(Strings.CHECKING_PRICE_OF_MSG, item.resolved, league))),
                    ]);

                    // filter out low confidence elements
                    res.lines = res.lines.filter(IsHighConfidenceItemPrice);

                    // search for the item that the user requested
                    for (let itemDetails of res.lines) {
                        if (itemDetails.name === item.resolved) {
                            const exaltedValue = itemDetails.exaltedValue;
                            const chaosValue = itemDetails.chaosValue;

                            // only include the exalted price equivalent if it's higher than 1
                            if (exaltedValue >= 1) {
                                return handlerInput.responseBuilder
                                    // TODO: - add plurals
                                    .speak(t(Strings.PRICE_OF_IS_EXALTED_MSG, 1, item.resolved, FormatPrice(exaltedValue).toString(), FormatPrice(chaosValue).toString())) // .toString() removes the trailing zeros
                                    .getResponse();
                            }

                            // chaos only price
                            return handlerInput.responseBuilder
                                // TODO: - add plurals
                                .speak(t(Strings.PRICE_OF_IS_MSG, 1, item.resolved, FormatPrice(itemDetails.chaosValue).toString())) // .toString() removes the trailing zeros
                                .getResponse();
                        }
                    }

                    // item not found
                    return handlerInput.responseBuilder
                        .speak(t(Strings.ERROR_ITEM_NOT_FOUND_MSG))
                        .getResponse();

                } catch (err) {
                    throw CreateError(`Got error while getting ${options.requestType} prices: ${err}`, ErrorTypes.API)
                }
            }

            throw CreateError(`Got to the COMPLETED state of ${options.intentName} without a slot.`, ErrorTypes.Unexpected);
        }
    };
}
