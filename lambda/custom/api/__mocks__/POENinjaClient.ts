import { IPOENinjaClient, IPOENinjaClientSettings, CurrencyRequest, CurrencyResponse, ItemResponse, ItemRequest, SparkLine, CurrencyRequestTypes } from "../interfaces";

class DummyClient implements IPOENinjaClient {
    constructor(settings?: IPOENinjaClientSettings) {
    }

    currencies(req: CurrencyRequest) {
        return new Promise<CurrencyResponse>((fulfill, reject) => {
            const empty: SparkLine = {
                data: [],
                totalChange: 0,
            };

            switch (req.type) {
                case CurrencyRequestTypes.Currency:
                    return fulfill({
                        lines: [
                            {
                                "currencyTypeName": "Exalted Orb",
                                "pay": {
                                    "id": -1,
                                    "league_id": -1,
                                    "pay_currency_id": -1,
                                    "get_currency_id": -1,
                                    "sample_time_utc": "2018-07-15T12:12:24.9206511Z",
                                    "count": -1,
                                    "value": -1,
                                    "data_point_count": -1,
                                    "includes_secondary": false
                                },
                                "receive": {
                                    "id": -1,
                                    "league_id": -1,
                                    "pay_currency_id": -1,
                                    "get_currency_id": -1,
                                    "sample_time_utc": "2018-07-15T12:12:24.9206511Z",
                                    "count": 100,
                                    "value": 123.45,
                                    "data_point_count": -1,
                                    "includes_secondary": false
                                },
                                "paySparkLine": empty,
                                "receiveSparkLine": empty,
                                "chaosEquivalent": -1,
                                "lowConfidencePaySparkLine": empty,
                                "lowConfidenceReceiveSparkLine": empty,
                            }
                        ],
                        currencyDetails: [],
                    });

                case CurrencyRequestTypes.Fragment:
                    return fulfill({
                        lines: [
                            {
                                "currencyTypeName": "Chayula's Breachstone",
                                "pay": {
                                    "id": -1,
                                    "league_id": -1,
                                    "pay_currency_id": -1,
                                    "get_currency_id": -1,
                                    "sample_time_utc": "2018-07-15T12:12:24.9206511Z",
                                    "count": -1,
                                    "value": -1,
                                    "data_point_count": -1,
                                    "includes_secondary": false
                                },
                                "receive": {
                                    "id": -1,
                                    "league_id": -1,
                                    "pay_currency_id": -1,
                                    "get_currency_id": -1,
                                    "sample_time_utc": "2018-07-15T12:12:24.9206511Z",
                                    "count": 100,
                                    "value": 123.45,
                                    "data_point_count": -1,
                                    "includes_secondary": false
                                },
                                "paySparkLine": empty,
                                "receiveSparkLine": empty,
                                "chaosEquivalent": -1,
                                "lowConfidencePaySparkLine": empty,
                                "lowConfidenceReceiveSparkLine": empty,
                            }
                        ],
                        currencyDetails: [],
                    });
            }
        });
    }

    items(req: ItemRequest) {
        return new Promise<ItemResponse>((fulfill, reject) => {
            const res: ItemResponse = {
                lines: [],
            };
            fulfill(res);
        });
    }
}

export const apiClient = new DummyClient();
