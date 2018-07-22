import { POENinjaClient, LeagueTypes, CurrencyRequestTypes, ItemRequestTypes } from "../../lambda/custom/api";
import { CurrentDate } from "../../lambda/custom/lib/helpers";

describe("API Client", () => {
    const apiClient = new POENinjaClient();

    it("Currencies", async () => {
        const res = await apiClient.currencies({
            league: LeagueTypes.Challenge,
            type: CurrencyRequestTypes.Currency,
            date: CurrentDate(),
        });

        expect(res).not.toBeNull();
        expect(res.lines.length).not.toBe(0);
    });

    it("Items", async () => {
        const res = await apiClient.items({
            league: LeagueTypes.Challenge,
            type: ItemRequestTypes.Essence,
            date: CurrentDate(),
        });

        expect(res).not.toBeNull();
        expect(res.lines.length).not.toBe(0);
    });
});
