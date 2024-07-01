import { useEffect, useState } from "react"
import { BarChart, Bar, YAxis, XAxis, Tooltip, CartesianGrid, Legend } from "recharts"
import { getAllResults, getLatestResults, getResultsByCity } from "../../services/traffic-data"
import { TrafficResultsResponse } from "../../services/api-responses.interface"

interface ResultsGraphLoaderProps {
    dataType: 'allResults' | "latestResults" | "Sydney"
}

const ResultsGraphLoader = ({ dataType }: ResultsGraphLoaderProps) => {
    const [data, setData] = useState<TrafficResultsResponse[]>([]);
     const [fetchStatus, setFetchStatus] = useState("");

    useEffect(() => {
       setFetchStatus("LOADING")
       fetchData()
    }, [dataType])

    const fetchData = async () => {
        if(dataType === "latestResults") {
            getLatestResults()
                .then((data) => {
                    setFetchStatus("SUCCESS")
                    setData(data)
                })
                .catch((e) => {
                    setFetchStatus("FAILED")
                    console.warn(e)
                })
        } else if (dataType === "Sydney") {
            getResultsByCity(dataType)
                .then((data) => {
                    setFetchStatus("SUCCESS")
                    setData(data)
                })
                .catch((e) => {
                    setFetchStatus("FAILED")
                    console.warn(e)
                })
        } else {
            console.error("Fetch Failed")
        }
    }

    return (
        <>
            {fetchStatus === "LOADING" && <h2>...LOADING...</h2>}
            {fetchStatus === "FAILED" && <h2>...FAILED TO LOAD...</h2>}
            {fetchStatus === "SUCCESS" &&
                <BarChart width={1000} height={600} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend iconType="square"/>
                    <Bar dataKey="speed_ratio" fill="#82ca9d" />
                </BarChart>
            }
        </>
    )
}

export default ResultsGraphLoader