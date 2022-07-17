export interface IStock {
    id: number;
    stock: string;
}

export interface IStockResponse {
    timestamp: number[];
    symbol: string;
    close: number[];
}