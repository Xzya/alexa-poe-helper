import { CurrentDate } from "../custom/lib/helpers";
import { writeFileSync } from "fs";
import { POENinjaClient, ItemResponse, ItemEntity, ItemRequestTypes, LeagueTypes } from "../custom/api";

const client = new POENinjaClient();

function getUnique(res: ItemResponse[]) {
    const data = res
        // reduce it to an ItemEntity[]
        .reduce((acc, current) => {
            return current.lines.concat(acc);
        }, [] as ItemEntity[])
        // take only the names
        .map((item) => item.name)
        // sanitize the names
        .map((item) => sanitize(item))

    // extract unique
    return Array.from(new Set(data).keys())
        // sort alphabetically
        .sort();
}

function getRequestsForType(type: ItemRequestTypes) {
    return Promise.all([
        client.items({
            league: LeagueTypes.Challenge,
            type: type,
            date: CurrentDate(),
        }),
        client.items({
            league: LeagueTypes.HardcoreChallenge,
            type: type,
            date: CurrentDate(),
        }),
        client.items({
            league: LeagueTypes.Standard,
            type: type,
            date: CurrentDate(),
        }),
        client.items({
            league: LeagueTypes.Hardcore,
            type: type,
            date: CurrentDate(),
        }),
    ]);
}

async function getUniqueForType(type: ItemRequestTypes) {
    const res = await getRequestsForType(type);

    return getUnique(res);
}

// async function printType(type: ItemRequestTypes) {
//     const unique = await getUniqueForType(type);
//     console.log(type, JSON.stringify(unique, null, 2));
// }

async function stringForType(type: ItemRequestTypes, name: string) {
    const unique = await getUniqueForType(type);
    return `\nexport const ${name} = ${JSON.stringify(unique, null, 4)};\n`;
    console.log(type, JSON.stringify(unique, null, 2));
}

function sanitize(str: string) {
    return str.replace(/,/g, "");
}

async function main() {
    let finalString = `/**
 * THIS IS AN AUTOGENERATED FILE, DO NOT EDIT
 */\n`;

    // finalString += await stringForType(ItemRequestTypes.Essence, "Essences");
    // finalString += await stringForType(ItemRequestTypes.DivinationCard, "Divinations");
    // finalString += await stringForType(ItemRequestTypes.UniqueMap, "UniqueMaps");
    // finalString += await stringForType(ItemRequestTypes.Prophecy, "Prophecies");
    // finalString += await stringForType(ItemRequestTypes.SkillGem, "SkillGems");
    // finalString += await stringForType(ItemRequestTypes.HelmetEnchant, "HelmetEnchants");
    finalString += await stringForType(ItemRequestTypes.Map, "Maps");
    finalString += await stringForType(ItemRequestTypes.UniqueJewel, "UniqueJewels");
    finalString += await stringForType(ItemRequestTypes.UniqueFlask, "UniqueFlasks");
    finalString += await stringForType(ItemRequestTypes.UniqueWeapon, "UniqueWeapons");
    finalString += await stringForType(ItemRequestTypes.UniqueArmour, "UniqueArmours");
    finalString += await stringForType(ItemRequestTypes.UniqueAccessory, "UniqueAccessories");

    console.log(finalString);

    const path = `${__dirname}/../custom/lib/items.ts`;

    writeFileSync(path, finalString);

    console.log(`Written to ${path}.`);
}

main();
