import { baseUrl } from "./api-config";
import { TrafficResultsResponse } from "./api-responses.interface";

export const getLatestResults = async (): Promise<TrafficResultsResponse[]> => {
  const response = await fetch(baseUrl + "/latest-results");
  if (!response.ok) {
    throw new Error("Failed to fetch latest city traffic results");
  }
  return await response.json();
};

export const getResultsByCity = async (
  city: string
): Promise<TrafficResultsResponse[]> => {
  const response = await fetch(`${baseUrl}/results/${city}`);
  if (!response.ok) {
    throw new Error("Failed to fetch latest city entry");
  }
  const data = await response.json();
  data.sort((a: TrafficResultsResponse, b: TrafficResultsResponse) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
  let slicedData = data.slice(0, 8);
  return slicedData.reverse();
};
