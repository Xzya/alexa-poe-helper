import { CurrencyRequest, CurrencyResponse, ItemRequest, ItemResponse, IPOENinjaClientSettings, IPOENinjaClient } from "./interfaces";
import * as request from "request";

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

    request<T>(options: (request.UriOptions & request.CoreOptions)): Promise<T> {
        return new Promise((fulfill, reject) => {
            return request(options, (err, res, body) => {
                if (err) return reject(err);
                if (res.statusCode !== 200) {
                    return reject(new Error(`Unexpected status code ${res.statusCode}`));
                }
                return fulfill(body as T);
            });
        });
    }

    currencies(req: CurrencyRequest) {
        return this.request<CurrencyResponse>({
            method: "GET",
            baseUrl: this.settings.baseUrl,
            uri: "/api/data/currencyoverview",
            qs: req,
            gzip: true,
            json: true,
        });
    }

    items(req: ItemRequest) {
        return this.request<ItemResponse>({
            method: "GET",
            baseUrl: this.settings.baseUrl,
            uri: "/api/data/itemoverview",
            qs: req,
            gzip: true,
            json: true,
        });
    }

}

export const apiClient = new POENinjaClient();
