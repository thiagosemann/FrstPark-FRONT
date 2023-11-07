export interface Transaction {
    id?: number;
    user_id:number;
    usage_history_id: number;
    transaction_time:string;
    amount:number;
}