import { JSONRequest } from "./HttpHelpers";
import { CurrencyRequest, CurrencyResponse, ItemRequest, ItemResponse, IPOENinjaClientSettings, IPOENinjaClient } from "./interfaces";

const defaultSettings: IPOENinjaClientSettings = {
    baseUrl: "https://poe.ninja",
};

export class POENinjaClient implements IPOENinjaClient {
    protected settings: IPOENinjaClientSettings;

    constructor(settings?: IPOENinjaClientSettings) {
        if (!settings) {
            settings = defaultSettings;
        }
        this.settings = defaultSettings;
    }

    currencies(req: CurrencyRequest) {
        return JSONRequest<CurrencyResponse>({
            method: "GET",
            baseUrl: this.settings.baseUrl,
            uri: "/api/data/currencyoverview",
            qs: req,
            gzip: true,
        });
    }

    items(req: ItemRequest) {
        return JSONRequest<ItemResponse>({
            method: "GET",
            baseUrl: this.settings.baseUrl,
            uri: "/api/data/itemoverview",
            qs: req,
            gzip: true,
        });
    }

}

export const apiClient = new POENinjaClient();
