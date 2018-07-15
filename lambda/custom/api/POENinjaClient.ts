import { JSONRequest } from "./HttpHelpers";
import { CurrencyRequest, CurrencyResponse } from "./interfaces";

export interface IPOENinjaClientSettings {
    baseUrl: string;
}

const defaultSettings: IPOENinjaClientSettings = {
    baseUrl: "https://poe.ninja",
};

export class POENinjaClient {
    protected settings: IPOENinjaClientSettings;

    constructor(settings?: IPOENinjaClientSettings) {
        if (!settings) {
            settings = defaultSettings;
        }
        this.settings = defaultSettings;
    }

    currency(req: CurrencyRequest) {
        return JSONRequest<CurrencyResponse>({
            method: "GET",
            baseUrl: this.settings.baseUrl,
            uri: "/api/data/currencyoverview",
            qs: req,
            gzip: true,
        });
    }

}
