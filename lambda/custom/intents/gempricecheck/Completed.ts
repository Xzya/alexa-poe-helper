import { RequestHandler } from "ask-sdk-core";
import { GetRequestAttributes, IsIntentWithCompleteDialog, CreateError, VoicePlayerSpeakDirective, GetDirectiveServiceClient, FormatPrice, CurrentDate, GetLeagueSlot, IsHighConfidenceItemPrice } from "../../lib/helpers";
import { SlotTypes, IntentTypes, ErrorTypes, Strings } from "../../lib/constants";
import { ItemRequestTypes } from "../../api";

export const Completed: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntentWithCompleteDialog(handlerInput, IntentTypes.GemPriceCheck);
    },
    async handle(handlerInput) {
        const directiveServiceClient = GetDirectiveServiceClient(handlerInput);
        const { t, slots, apiClient } = GetRequestAttributes(handlerInput);

        const item = slots[SlotTypes.Gem];
        const levelSlot = slots[SlotTypes.Level];
        const qualitySlot = slots[SlotTypes.Quality];

        if ((item && item.isMatch && !item.isAmbiguous) &&
            (levelSlot && levelSlot.isMatch)) {
            // get the league
            const league = GetLeagueSlot(slots);

            // get the level
            const level = parseInt(levelSlot.value);

            // get the quality
            let quality: number | null = null;
            if (qualitySlot && qualitySlot.isMatch) {
                quality = parseInt(qualitySlot.value);
            }

            try {
                const [res] = await Promise.all([
                    // get the item prices
                    apiClient.items({
                        league: league,
                        type: ItemRequestTypes.SkillGem,
                        date: CurrentDate(),
                    }),

                    // send progressive response
                    directiveServiceClient.enqueue(VoicePlayerSpeakDirective(handlerInput, t(Strings.CHECKING_PRICE_OF_MSG, item.resolved, league))),
                ]);

                // filter out low confidence elements
                res.lines = res.lines.filter(IsHighConfidenceItemPrice);

                // find all items with a matching name
                res.lines = res.lines.filter((i) => i.name === item.resolved);

                // filter by level
                res.lines = res.lines.filter((i) => i.gemLevel === level);

                // filter by quality
                if (quality) {
                    res.lines = res.lines.filter((i) => i.gemQuality === quality);
                }

                // sort the item by price, cheaper first
                res.lines = res.lines.sort((a, b) => a.chaosValue - b.chaosValue);

                // search for the item that the user requested
                for (let itemDetails of res.lines) {
                    const exaltedValue = itemDetails.exaltedValue;
                    const chaosValue = itemDetails.chaosValue;
                    let propsString = t(Strings.LEVEL, level);
                    if (quality) {
                        propsString += t(Strings.QUALITY, quality);
                    }

                    // only include the exalted price equivalent if it's higher than 1
                    if (exaltedValue >= 1) {
                        return handlerInput.responseBuilder
                            // TODO: - add plurals
                            .speak(t(Strings.PRICE_OF_IS_EXALTED_MSG, propsString, item.resolved, FormatPrice(exaltedValue).toString(), FormatPrice(chaosValue).toString())) // .toString() removes the trailing zeros
                            .getResponse();
                    }

                    // chaos only price
                    return handlerInput.responseBuilder
                        // TODO: - add plurals
                        .speak(t(Strings.PRICE_OF_IS_MSG, propsString, item.resolved, FormatPrice(itemDetails.chaosValue).toString())) // .toString() removes the trailing zeros
                        .getResponse();
                }

                // item not found
                return handlerInput.responseBuilder
                    .speak(t(Strings.ERROR_ITEM_NOT_FOUND_MSG))
                    .getResponse();

            } catch (err) {
                throw CreateError(`Got error while getting skill gem prices: ${err}`, ErrorTypes.API)
            }
        }

        throw CreateError(`Got to the COMPLETED state of ${IntentTypes.GemPriceCheck} without a slot.`, ErrorTypes.Unexpected);
    }
};
