import { baseUrl } from "./api-config";
import { AirDataResponse } from "./api-responses.interface";

export const getLatestResults = async (): Promise<AirDataResponse[]> => {
  const response = await fetch(baseUrl + "/latest-air-results");
  if (!response.ok) {
    throw new Error("Failed to fetch latest air quality results");
  }
  return await response.json();
};

export const getResultsByCity = async (
  city: string
): Promise<AirDataResponse[]> => {
  const response = await fetch(`${baseUrl}/air-results/${city}`);
  if (!response.ok) {
    throw new Error("Failed to fetch latest city entry");
  }
  const data = await response.json();
  data.sort((a: AirDataResponse, b: AirDataResponse) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
  let slicedData = data.slice(0, 8);
  return slicedData.reverse();
};
