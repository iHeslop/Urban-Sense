export interface TrafficDataResponse {
  id: number;
  city: string;
  location: string;
  current_travel_time: number;
  free_flow_travel_time: number;
  free_flow_speed: number;
  current_speed: number;
  timestamp: string;
}


export interface TrafficResultsResponse {
  id: number;
  city: string;
  speed_ratio: number;
  timestamp: string;
  avg_current_speed: number;
  avg_free_flow_speed: number;
}