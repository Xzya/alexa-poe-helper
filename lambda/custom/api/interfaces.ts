import { LeagueSlotTypes } from "../lib/constants";

export enum LeagueTypes {
    Challenge = "Incursion", // "tmpstandard",
    HardcoreChallenge = "Hardcore Incursion", // "tmphardcore",
    Standard = "Standard",
    Hardcore = "Hardcore",
    IncursionEvent = "Incursion Event (IRE001)",
    HarcoreIncursionEvent = "Incursion Event HC (IRE002)",
}

export const LeagueTypeSlotToAPIMap: { [key: string]: LeagueTypes } = {
    [LeagueSlotTypes.Challenge]: LeagueTypes.Challenge,
    [LeagueSlotTypes.HardcoreChallenge]: LeagueTypes.HardcoreChallenge,
    [LeagueSlotTypes.Standard]: LeagueTypes.Standard,
    [LeagueSlotTypes.Hardcore]: LeagueTypes.Hardcore,
    [LeagueSlotTypes.IncursionEvent]: LeagueTypes.IncursionEvent,
    [LeagueSlotTypes.HarcoreIncursionEvent]: LeagueTypes.HarcoreIncursionEvent,
};

export enum CurrencyRequestTypes {
    Currency = "Currency",
    Fragment = "Fragment",
}

export interface CurrencyRequest {
    league: LeagueTypes,
    type: CurrencyRequestTypes,
    date: string;
}

export interface CurrencyResponse {
    lines: CurrencyEntity[];
    currencyDetails: CurrencyDetailsEntity[];
}

export interface CurrencyEntity {
    currencyTypeName: string;
    pay?: ReceiveOrPay;
    receive?: ReceiveOrPay;
    paySparkLine: SparkLine;
    receiveSparkLine: SparkLine;
    chaosEquivalent: number;
    lowConfidencePaySparkLine: SparkLine;
    lowConfidenceReceiveSparkLine: SparkLine;
}

export interface ReceiveOrPay {
    id: number;
    league_id: number;
    pay_currency_id: number;
    get_currency_id: number;
    sample_time_utc: string;
    count: number;
    value: number;
    data_point_count: number;
    includes_secondary: boolean;
}

export interface SparkLine {
    data: number[];
    totalChange: number;
}

export interface CurrencyDetailsEntity {
    id: number;
    icon: string;
    name: string;
    poeTradeId: number;
}

export enum ItemRequestTypes {
    Essence = "Essence",
    DivinationCard = "DivinationCard",
    UniqueMap = "UniqueMap",
    Prophecy = "Prophecy",
    SkillGem = "SkillGem",
    HelmetEnchant = "HelmetEnchant",
    Map = "Map",
    UniqueJewel = "UniqueJewel",
    UniqueFlask = "UniqueFlask",
    UniqueWeapon = "UniqueWeapon",
    UniqueArmour = "UniqueArmour",
    UniqueAccessory = "UniqueAccessory",
}

export interface ItemRequest {
    league: LeagueTypes,
    type: ItemRequestTypes,
    date: string;
}

export interface ItemResponse {
    lines: ItemEntity[];
}

export interface ItemEntity {
    id: number;
    name: string;
    icon: string;
    mapTier: number;
    levelRequired: number;
    baseType?: string;
    stackSize: number;
    variant?: string;
    prophecyText?: string;
    artFilename?: string;
    links: number;
    itemClass: number;
    sparkline: SparkLine;
    lowConfidenceSparkline: SparkLine;
    implicitModifiers: ModifierEntity[];
    explicitModifiers: ModifierEntity[];
    flavourText: string;
    corrupted: boolean;
    gemLevel: number;
    gemQuality: number;
    itemType: string;
    chaosValue: number;
    exaltedValue: number;
    count: number;
}

export interface ModifierEntity {
    text: string;
    optional: boolean;
}

/**
 * APIClient
 */

export interface IPOENinjaClientSettings {
    baseUrl: string;
}

export declare class IPOENinjaClient {
    constructor(settings?: IPOENinjaClientSettings);
    currencies(req: CurrencyRequest): Promise<CurrencyResponse>;
    items(req: ItemRequest): Promise<ItemResponse>;
}
