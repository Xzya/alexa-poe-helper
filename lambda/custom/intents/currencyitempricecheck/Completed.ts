import { RequestHandler } from "ask-sdk-core";
import { apiClient, CurrencyEntity, CurrencyRequestTypes, LeagueTypeSlotToAPIMap } from "../../api";
import { IsIntentWithCompleteDialog, GetRequestAttributes, GetLeagueSlot, CurrentDate, CreateError, FormatPrice } from "../../lib/helpers";
import { Strings, ErrorTypes, SlotTypes } from "../../lib/constants";

function filterLowConfidence(value: CurrencyEntity) {
    return value.receive && value.receive.count >= 5 || value.pay && value.pay.count >= 5;
}

/**
 * Creates a currency item Dialog handler with complete state.
 *
 * @param options
 */
export function CreateCurrencyItemCompletedHandler(options: {
    intentName: string;
    slotName: string;
    requestType: CurrencyRequestTypes;
}): RequestHandler {
    return {
        canHandle(handlerInput) {
            return IsIntentWithCompleteDialog(handlerInput, options.intentName);
        },
        async handle(handlerInput) {
            const { t, slots } = GetRequestAttributes(handlerInput);

            const currency = slots[options.slotName];

            if (currency && currency.isMatch && !currency.isAmbiguous) {
                // get the league
                const league = GetLeagueSlot(slots);

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
                        league: LeagueTypeSlotToAPIMap[league],
                        type: options.requestType,
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

            throw CreateError(`Got to the COMPLETED state of ${options.intentName} without a slot.`, ErrorTypes.Unexpected);
        }
    };
}
