import { RequestHandler } from "ask-sdk-core";
import { ItemRequestTypes, apiClient, LeagueTypeSlotToAPIMap } from "../../api";
import { IsIntentWithCompleteDialog, GetRequestAttributes, GetLeagueSlot, CurrentDate, IsHighConfidenceItemPrice, CreateError, FormatPrice } from "../../lib/helpers";
import { Strings, ErrorTypes } from "../../lib/constants";

/**
 * Creates an item Dialog handler with complete state.
 *
 * @param options
 */
export function CreateNormalItemCompletedHandler(options: {
    intentName: string;
    slotName: string;
    requestType: ItemRequestTypes;
}): RequestHandler {
    return {
        canHandle(handlerInput) {
            return IsIntentWithCompleteDialog(handlerInput, options.intentName);
        },
        async handle(handlerInput) {
            const { t, slots } = GetRequestAttributes(handlerInput);

            const item = slots[options.slotName];

            if (item && item.isMatch && !item.isAmbiguous) {
                try {
                    const league = GetLeagueSlot(slots);

                    // get the item prices
                    const res = await apiClient.items({
                        league: LeagueTypeSlotToAPIMap[league],
                        type: options.requestType,
                        date: CurrentDate(),
                    });

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
                                    .speak(t(Strings.PRICE_OF_IS_EXALTED_MSG, 1, item.resolved, league, FormatPrice(exaltedValue).toString(), FormatPrice(chaosValue).toString())) // .toString() removes the trailing zeros
                                    .getResponse();
                            }

                            // chaos only price
                            return handlerInput.responseBuilder
                                // TODO: - add plurals
                                .speak(t(Strings.PRICE_OF_IS_MSG, 1, item.resolved, league, FormatPrice(itemDetails.chaosValue).toString())) // .toString() removes the trailing zeros
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
