export interface TrafficResultsResponse {
  id: number;
  city: string;
  speed_ratio: number;
  timestamp: string;
  avg_current_speed: number;
  avg_free_flow_speed: number;
}

export interface AirDataResponse {
  id: number;
  city: string;
  aqius: number;
  mainus: string;
  timestamp: string;
}
