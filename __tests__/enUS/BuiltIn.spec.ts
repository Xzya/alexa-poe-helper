import { skill, ssml, RequestWithIntent } from "../helpers";
import { IntentTypes, LocaleTypes } from "../../lambda/custom/lib/constants";

describe("BuiltIn Intents", () => {
    it("Help", async () => {
        const response = await skill(RequestWithIntent({
            name: IntentTypes.Help,
            locale: LocaleTypes.enUS,
        }));
        expect(response).toMatchObject(ssml(/You can ask for/gi));
    });

    it("Stop", async () => {
        const response = await skill(RequestWithIntent({
            name: IntentTypes.Stop,
            locale: LocaleTypes.enUS,
        }));
        expect(response).toMatchObject(ssml(/(May your maps be merciful|Good luck with your maps exile|Stay sane)/gi));
    });

    it("Cancel", async () => {
        const response = await skill(RequestWithIntent({
            name: IntentTypes.Cancel,
            locale: LocaleTypes.enUS,
        }));
        expect(response).toMatchObject(ssml(/(May your maps be merciful|Good luck with your maps exile|Stay sane)/gi));
    });

    it("Fallback", async () => {
        const response = await skill(RequestWithIntent({
            name: IntentTypes.Fallback,
            locale: LocaleTypes.enUS,
        }));
        expect(response).toMatchObject(ssml(/Sorry, I can't understand the command/gi));
    });
});
