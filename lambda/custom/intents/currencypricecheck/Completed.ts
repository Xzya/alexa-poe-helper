import { RequestHandler } from "ask-sdk-core";
import { GetRequestAttributes, IsIntentWithCompleteDialog, CreateError, FormatPrice, IsOrb, IsFragment, CurrentDate, GetLeagueSlot } from "../../lib/helpers";
import { SlotTypes, IntentTypes, ErrorTypes, Strings } from "../../lib/constants";
import { CurrencyEntity, CurrencyRequestTypes, apiClient } from "../../api";

function filterLowConfidence(value: CurrencyEntity) {
    return value.receive && value.receive.count >= 5 || value.pay && value.pay.count >= 5;
}

export const Completed: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntentWithCompleteDialog(handlerInput, IntentTypes.CurrencyPriceCheck);
    },
    async handle(handlerInput) {
        const { t, slots } = GetRequestAttributes(handlerInput);

        const currency = slots[SlotTypes.Currency];

        if (currency && currency.isMatch && !currency.isAmbiguous) {
            // get the league
            const league = GetLeagueSlot(slots);

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
                // get the currency exchange details
                const res = await apiClient.currencies({
                    league: league,
                    type: type,
                    date: CurrentDate(),
                });

                // filter out low confidence elements
                res.lines = res.lines.filter(filterLowConfidence);

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
                            .speak(t(Strings.PRICE_OF_IS_MSG, quantity, currency.resolved, league, FormatPrice(totalPrice).toString())) // .toString() removes the trailing zeros
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

        throw CreateError(`Got to the COMPLETED state of ${IntentTypes.CurrencyPriceCheck} without a slot.`, ErrorTypes.Unexpected);
    }
};
