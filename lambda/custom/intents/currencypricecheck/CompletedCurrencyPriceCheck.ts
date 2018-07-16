import { RequestHandler } from "ask-sdk-core";
import { GetRequestAttributes, IsIntentWithCompleteDialog, CreateError, VoicePlayerSpeakDirective, GetDirectiveServiceClient, FormatPrice, IsOrb, IsFragment } from "../../lib/helpers";
import { SlotTypes, IntentTypes, ErrorTypes, Strings } from "../../lib/constants";
import { CurrencyRequestTypes, LeagueTypes, CurrencyEntity } from "../../api/interfaces";

const showLowConfidence = false;

function filterLowConfidence(value: CurrencyEntity, index: number, array: CurrencyEntity[]) {
    return value.receive && value.receive.count >= 5 || value.pay && value.pay.count >= 5;
}

export const Completed: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntentWithCompleteDialog(handlerInput, IntentTypes.CurrencyPriceCheckIntent);
    },
    async handle(handlerInput) {
        const directiveServiceClient = GetDirectiveServiceClient(handlerInput);
        const { t, slots, apiClient } = GetRequestAttributes(handlerInput);

        const currency = slots[SlotTypes.Currency];

        if (currency && currency.isMatch && !currency.isAmbiguous) {
            // get the league
            let league: LeagueTypes;

            const leagueSlot = slots[SlotTypes.League];
            if (leagueSlot && leagueSlot.isMatch) {
                league = leagueSlot.resolved as LeagueTypes;
            } else {
                // default temp challenge league
                league = LeagueTypes.Challenge;
            }

            // get the currency type
            let type: CurrencyRequestTypes;

            if (IsOrb(currency.id)) {
                type = CurrencyRequestTypes.Currency;
            } else if (IsFragment(currency.id)) {
                type = CurrencyRequestTypes.Fragment;
            } else {
                throw CreateError(`Unexpected currency ${currency.resolved} with id ${currency.id}`, ErrorTypes.Unexpected);
            }

            // get the quantity
            let quantity = 1;

            const quantitySlot = slots[SlotTypes.Quantity];
            if (quantitySlot && quantitySlot.isMatch) {
                quantity = parseFloat(quantitySlot.value);
                if (quantity < 1 || isNaN(quantity)) {
                    quantity = 1;
                }
            }

            try {
                const [, res] = await Promise.all([
                    // send progressive response
                    directiveServiceClient.enqueue(VoicePlayerSpeakDirective(handlerInput, t(Strings.CHECKING_PRICE_OF_MSG, currency.resolved, league))),

                    // get the currency exchange details
                    apiClient.currency({
                        league: league,
                        type: type,
                        date: (new Date).toISOString().substring(0, 10),
                    }),
                ]);

                // filter out low confidence elements
                if (!showLowConfidence) {
                    res.lines = res.lines.filter(filterLowConfidence);
                }

                // search for the currency that the user requested
                for (let exchange of res.lines) {
                    if (exchange.currencyTypeName === currency.resolved) {
                        // if we don't have `receive`, it means there is not enough data for that currency
                        if (!exchange.receive) {
                            return handlerInput.responseBuilder
                                .speak(t(Strings.ERROR_NOT_ENOUGH_DATA_MSG))
                                .getResponse();
                        }

                        const totalPrice = quantity * exchange.receive.value;

                        // exchange found
                        return handlerInput.responseBuilder
                            // TODO: - add plurals
                            .speak(t(Strings.PRICE_OF_IS_MSG, quantity, currency.resolved, FormatPrice(totalPrice).toString())) // .toString() removes the trailing zeros
                            .getResponse();
                    }
                }

                // currency not found
                return handlerInput.responseBuilder
                    .speak(t(Strings.ERROR_CURRENCY_NOT_FOUND_MSG))
                    .getResponse();

            } catch (err) {
                throw CreateError(`Got error while getting currency exchange: ${err}`, ErrorTypes.API)
            }
        }

        throw CreateError(`Got to the COMPLETED state of ${IntentTypes.CurrencyPriceCheckIntent} without a slot.`, ErrorTypes.Unexpected);
    }
};
