import { RequestHandler } from "ask-sdk-core";
import { GetRequestAttributes, IsIntentWithCompleteDialog, CreateError, VoicePlayerSpeakDirective, GetDirectiveServiceClient, FormatPrice, CurrentDate } from "../../lib/helpers";
import { SlotTypes, IntentTypes, ErrorTypes, Strings } from "../../lib/constants";
import { ItemEntity, LeagueTypes, ItemRequestTypes } from "../../api";

const showLowConfidence = false;

function filterLowConfidence(value: ItemEntity) {
    return value.count >= 5;
}

export const Completed: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntentWithCompleteDialog(handlerInput, IntentTypes.UniqueArmourPriceCheck);
    },
    async handle(handlerInput) {
        const directiveServiceClient = GetDirectiveServiceClient(handlerInput);
        const { t, slots, apiClient } = GetRequestAttributes(handlerInput);

        const item = slots[SlotTypes.UniqueArmour];

        if (item && item.isMatch && !item.isAmbiguous) {
            // get the league
            let league: LeagueTypes;

            const leagueSlot = slots[SlotTypes.League];
            if (leagueSlot && leagueSlot.isMatch) {
                league = leagueSlot.resolved as LeagueTypes;
            } else {
                // default temp challenge league
                league = LeagueTypes.Challenge;
            }

            // get the links
            let links = 0;

            const linksSlot = slots[SlotTypes.Links];
            if (linksSlot && linksSlot.isMatch) {
                links = parseFloat(linksSlot.value);
                if (links < 5 || links > 6 || isNaN(links)) {
                    links = 0;
                }
            }

            try {
                const [, res] = await Promise.all([
                    // send progressive response
                    directiveServiceClient.enqueue(VoicePlayerSpeakDirective(handlerInput, t(Strings.CHECKING_PRICE_OF_MSG, item.resolved, league))),

                    // get the item prices
                    apiClient.items({
                        league: league,
                        type: ItemRequestTypes.UniqueArmour,
                        date: CurrentDate(),
                    }),
                ]);

                // filter out low confidence elements
                if (!showLowConfidence) {
                    res.lines = res.lines.filter(filterLowConfidence);
                }

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
                                .speak(t(Strings.PRICE_OF_IS_EXALTED_MSG, linkedString, item.resolved, FormatPrice(exaltedValue).toString(), FormatPrice(chaosValue).toString())) // .toString() removes the trailing zeros
                                .getResponse();
                        }

                        // chaos only price
                        return handlerInput.responseBuilder
                            // TODO: - add plurals
                            .speak(t(Strings.PRICE_OF_IS_MSG, linkedString, item.resolved, FormatPrice(itemDetails.chaosValue).toString())) // .toString() removes the trailing zeros
                            .getResponse();
                    }
                }

                // item not found
                return handlerInput.responseBuilder
                    .speak(t(Strings.ERROR_ITEM_NOT_FOUND_MSG))
                    .getResponse();

            } catch (err) {
                throw CreateError(`Got error while getting unique armour prices: ${err}`, ErrorTypes.API)
            }
        }

        throw CreateError(`Got to the COMPLETED state of ${IntentTypes.UniqueArmourPriceCheck} without a slot.`, ErrorTypes.Unexpected);
    }
};
