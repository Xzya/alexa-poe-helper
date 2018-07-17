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
        return IsIntentWithCompleteDialog(handlerInput, IntentTypes.UniqueAccessoryPriceCheck);
    },
    async handle(handlerInput) {
        const directiveServiceClient = GetDirectiveServiceClient(handlerInput);
        const { t, slots, apiClient } = GetRequestAttributes(handlerInput);

        const item = slots[SlotTypes.UniqueAccessory];

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

            try {
                const [, res] = await Promise.all([
                    // send progressive response
                    directiveServiceClient.enqueue(VoicePlayerSpeakDirective(handlerInput, t(Strings.CHECKING_PRICE_OF_MSG, item.resolved, league))),

                    // get the item prices
                    apiClient.items({
                        league: league,
                        type: ItemRequestTypes.UniqueAccessory,
                        date: CurrentDate(),
                    }),
                ]);

                // filter out low confidence elements
                if (!showLowConfidence) {
                    res.lines = res.lines.filter(filterLowConfidence);
                }

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
                throw CreateError(`Got error while getting item prices: ${err}`, ErrorTypes.API)
            }
        }

        throw CreateError(`Got to the COMPLETED state of ${IntentTypes.UniqueAccessoryPriceCheck} without a slot.`, ErrorTypes.Unexpected);
    }
};
