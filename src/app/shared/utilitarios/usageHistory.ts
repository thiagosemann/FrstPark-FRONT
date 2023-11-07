export interface UsageHistory {
    id?: number,
    user_id: number,
    machine_id: number,
    start_time?: string,
    end_time?: string,
    total_cost?: number,
  }