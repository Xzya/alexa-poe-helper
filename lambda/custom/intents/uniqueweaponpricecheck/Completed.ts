import { RequestHandler } from "ask-sdk-core";
import { GetRequestAttributes, IsIntentWithCompleteDialog, CreateError, FormatPrice, CurrentDate, GetLeagueSlot, IsHighConfidenceItemPrice, GetLinksSlot } from "../../lib/helpers";
import { SlotTypes, IntentTypes, ErrorTypes, Strings } from "../../lib/constants";
import { ItemRequestTypes, apiClient } from "../../api";

export const Completed: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntentWithCompleteDialog(handlerInput, IntentTypes.UniqueWeaponPriceCheck);
    },
    async handle(handlerInput) {
        const { t, slots } = GetRequestAttributes(handlerInput);

        const item = slots[SlotTypes.UniqueWeapon];

        if (item && item.isMatch && !item.isAmbiguous) {
            // get the league
            const league = GetLeagueSlot(slots);

            // get the links
            const links = GetLinksSlot(slots);

            try {
                // get the item prices
                const res = await apiClient.items({
                    league: league,
                    type: ItemRequestTypes.UniqueWeapon,
                    date: CurrentDate(),
                });

                // filter out low confidence elements
                res.lines = res.lines.filter(IsHighConfidenceItemPrice);

                // find all items with a matching name
                res.lines = res.lines.filter((i) => i.name === item.resolved);

                // sort the item by price, cheaper first
                res.lines = res.lines.sort((a, b) => a.chaosValue - b.chaosValue);

                // search for the item that the user requested
                for (let itemDetails of res.lines) {
                    // if the user didn't mention the links, we take the first item
                    // if he did mention the links, then we need to check and make sure it matches
                    if (links === 0 || links === itemDetails.links) {
                        const exaltedValue = itemDetails.exaltedValue;
                        const chaosValue = itemDetails.chaosValue;
                        const linkedString = links !== 0 ? t(Strings.LINKED, links) : 1;

                        // only include the exalted price equivalent if it's higher than 1
                        if (exaltedValue >= 1) {
                            return handlerInput.responseBuilder
                                // TODO: - add plurals
                                .speak(t(Strings.PRICE_OF_IS_EXALTED_MSG, linkedString, item.resolved, league, FormatPrice(exaltedValue).toString(), FormatPrice(chaosValue).toString())) // .toString() removes the trailing zeros
                                .getResponse();
                        }

                        // chaos only price
                        return handlerInput.responseBuilder
                            // TODO: - add plurals
                            .speak(t(Strings.PRICE_OF_IS_MSG, linkedString, item.resolved, league, FormatPrice(itemDetails.chaosValue).toString())) // .toString() removes the trailing zeros
                            .getResponse();
                    }
                }

                // item not found
                return handlerInput.responseBuilder
                    .speak(t(Strings.ERROR_ITEM_NOT_FOUND_MSG))
                    .getResponse();

            } catch (err) {
                throw CreateError(`Got error while getting unique weapon prices: ${err}`, ErrorTypes.API)
            }
        }

        throw CreateError(`Got to the COMPLETED state of ${IntentTypes.UniqueWeaponPriceCheck} without a slot.`, ErrorTypes.Unexpected);
    }
};
