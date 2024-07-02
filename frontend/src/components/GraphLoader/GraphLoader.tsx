import { useEffect, useState } from "react"
import { BarChart, Bar, YAxis, XAxis, Tooltip, CartesianGrid, Legend } from "recharts"
import {  getLatestResults } from "../../services/traffic-data"
import { TrafficResultsResponse } from "../../services/api-responses.interface"



const ResultsGraphLoader = () => {
    const [data, setData] = useState<TrafficResultsResponse[]>([]);
     const [fetchStatus, setFetchStatus] = useState("");

    useEffect(() => {
       setFetchStatus("LOADING")
       fetchData()
    }, [])

    const fetchData = async () => {
            getLatestResults()
                .then((data) => {
                    setFetchStatus("SUCCESS")
                    setData(data)
                })
                .catch((e) => {
                    setFetchStatus("FAILED")
                    console.warn(e)
                })
        }
    return (
        <>
            {fetchStatus === "LOADING" && <h2>...LOADING...</h2>}
            {fetchStatus === "FAILED" && <h2>...FAILED TO LOAD...</h2>}
            {fetchStatus === "SUCCESS" &&
                <BarChart width={1000} height={600} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="city" />
                    <YAxis />
                    <Tooltip />
                    <Legend iconType="square"/>
                    <Bar dataKey="avg_current_speed" fill="#82ca9d" name="Average Current Speed"/>
                    <Bar dataKey="avg_free_flow_speed" fill="#8884d8" name="Average Free Flow Speed"/>
                </BarChart>
            }
        </>
    )
}

export default ResultsGraphLoader