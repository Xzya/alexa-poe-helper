export enum LeagueTypes {
    Challenge = "Incursion", // "tmpstandard",
    HardcoreChallenge = "Hardcore Incursion", // "tmphardcore",
    Standard = "Standard",
    Hardcore = "Hardcore",
}

export enum CurrencyRequestTypes {
    Currency = "Currency",
    Fragment = "Fragment",
}

export interface CurrencyRequest {
    league: LeagueTypes,
    type: CurrencyRequestTypes,
    date?: string;
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
