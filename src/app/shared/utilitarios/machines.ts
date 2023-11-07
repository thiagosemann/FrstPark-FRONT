export interface Machine {
    id: number;
    name:string;
    type: string;
    total_usage_time: number;
    is_in_use: boolean;
    building_id: number;
    idNodemcu: string;
    isConnected?:boolean;
    apt_in_use?:string;
}