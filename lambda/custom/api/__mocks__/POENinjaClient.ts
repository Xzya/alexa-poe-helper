import { IPOENinjaClient, IPOENinjaClientSettings, CurrencyRequest, CurrencyResponse, ItemResponse, ItemRequest, SparkLine, CurrencyRequestTypes, ItemRequestTypes } from "../interfaces";

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
                case CurrencyRequestTypes.Fragment:
                    return fulfill({
                        lines: [
                            {
                                "currencyTypeName": "Value 1",
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
            const empty: SparkLine = {
                data: [],
                totalChange: 0,
            };

            switch (req.type) {
                case ItemRequestTypes.DivinationCard:
                case ItemRequestTypes.Essence:
                case ItemRequestTypes.Map:
                case ItemRequestTypes.Prophecy:
                case ItemRequestTypes.UniqueAccessory:
                case ItemRequestTypes.UniqueFlask:
                case ItemRequestTypes.UniqueJewel:
                case ItemRequestTypes.UniqueMap:
                    return fulfill({
                        lines: [
                            {
                                "id": -1,
                                "name": "Value 1",
                                "icon": "",
                                "mapTier": -1,
                                "levelRequired": -1,
                                "stackSize": -1,
                                "links": -1,
                                "itemClass": -1,
                                "sparkline": empty,
                                "lowConfidenceSparkline": empty,
                                "implicitModifiers": [],
                                "explicitModifiers": [],
                                "flavourText": "",
                                "corrupted": false,
                                "gemLevel": -1,
                                "gemQuality": -1,
                                "itemType": "",
                                "chaosValue": 123.45,
                                "exaltedValue": 12.34,
                                "count": 5
                            },
                            {
                                "id": -1,
                                "name": "Value 2",
                                "icon": "",
                                "mapTier": -1,
                                "levelRequired": -1,
                                "stackSize": -1,
                                "links": -1,
                                "itemClass": -1,
                                "sparkline": empty,
                                "lowConfidenceSparkline": empty,
                                "implicitModifiers": [],
                                "explicitModifiers": [],
                                "flavourText": "",
                                "corrupted": false,
                                "gemLevel": -1,
                                "gemQuality": -1,
                                "itemType": "",
                                "chaosValue": 123.45,
                                "exaltedValue": 0.5,
                                "count": 5
                            }
                        ]
                    });

                case ItemRequestTypes.UniqueWeapon:
                case ItemRequestTypes.UniqueArmour:
                    return fulfill({
                        lines: [
                            {
                                "id": -1,
                                "name": "Value 1",
                                "icon": "",
                                "mapTier": -1,
                                "levelRequired": -1,
                                "stackSize": -1,
                                "links": 6,
                                "itemClass": -1,
                                "sparkline": empty,
                                "lowConfidenceSparkline": empty,
                                "implicitModifiers": [],
                                "explicitModifiers": [],
                                "flavourText": "",
                                "corrupted": false,
                                "gemLevel": -1,
                                "gemQuality": -1,
                                "itemType": "",
                                "chaosValue": 123.45,
                                "exaltedValue": 12.34,
                                "count": 5
                            },
                            {
                                "id": -1,
                                "name": "Value 2",
                                "icon": "",
                                "mapTier": -1,
                                "levelRequired": -1,
                                "stackSize": -1,
                                "links": 5,
                                "itemClass": -1,
                                "sparkline": empty,
                                "lowConfidenceSparkline": empty,
                                "implicitModifiers": [],
                                "explicitModifiers": [],
                                "flavourText": "",
                                "corrupted": false,
                                "gemLevel": -1,
                                "gemQuality": -1,
                                "itemType": "",
                                "chaosValue": 123.45,
                                "exaltedValue": 0.5,
                                "count": 5
                            }
                        ]
                    });

                case ItemRequestTypes.SkillGem:
                    return fulfill({
                        lines: [
                            {
                                "id": -1,
                                "name": "Value 1",
                                "icon": "",
                                "mapTier": -1,
                                "levelRequired": -1,
                                "stackSize": -1,
                                "links": -1,
                                "itemClass": -1,
                                "sparkline": empty,
                                "lowConfidenceSparkline": empty,
                                "implicitModifiers": [],
                                "explicitModifiers": [],
                                "flavourText": "",
                                "corrupted": true,
                                "gemLevel": 21,
                                "gemQuality": 23,
                                "itemType": "",
                                "chaosValue": 123.45,
                                "exaltedValue": 12.34,
                                "count": 5
                            },
                            {
                                "id": -1,
                                "name": "Value 2",
                                "icon": "",
                                "mapTier": -1,
                                "levelRequired": -1,
                                "stackSize": -1,
                                "links": -1,
                                "itemClass": -1,
                                "sparkline": empty,
                                "lowConfidenceSparkline": empty,
                                "implicitModifiers": [],
                                "explicitModifiers": [],
                                "flavourText": "",
                                "corrupted": true,
                                "gemLevel": 21,
                                "gemQuality": 23,
                                "itemType": "",
                                "chaosValue": 123.45,
                                "exaltedValue": 0.5,
                                "count": 5
                            }
                        ]
                    });
            }
        });
    }
}

export const apiClient = new DummyClient();
