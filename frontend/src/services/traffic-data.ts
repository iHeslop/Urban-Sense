import { baseUrl } from "./api-config";
import { TrafficDataResponse, TrafficResultsResponse } from "./api-responses.interface";

export const getAllData = async (): Promise<TrafficDataResponse[]> => {
    const response = await fetch(baseUrl + "/city-traffic-data");
    if(!response.ok) {
        throw new Error("Failed to fetch city traffic data")
    } 
    return await response.json();
}

export const getAllResults = async (): Promise<TrafficResultsResponse[]> => {
    const response = await fetch(baseUrl + "/results");
    if(!response.ok) {
        throw new Error("Failed to fetch city traffic results")
    } 
    return await response.json();
}

export const getLatestResults = async (): Promise<TrafficResultsResponse[]> => {
    const response = await fetch(baseUrl + "/latest-results");
    if(!response.ok) {
        throw new Error("Failed to fetch latest city traffic results")
    } 
    return await response.json();
}

export const getResultsByCity = async (city: string): Promise<TrafficResultsResponse[]> => {
    const response = await fetch(`${baseUrl}/results/${city}`);
    if(!response.ok) {
        throw new Error("Failed to fetch latest city entry")
    } 
    return await response.json();
}