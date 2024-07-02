import { useEffect, useState } from "react"
import { LineChart, Line, YAxis, XAxis, Tooltip, CartesianGrid, Legend } from "recharts"
import {  getResultsByCity } from "../../services/traffic-data"
import { TrafficResultsResponse} from "../../services/api-responses.interface"

interface CityGraphLoaderProps {
    city: string;
}

const CityGraphLoader = ({city}: CityGraphLoaderProps ) => {
    const [data, setData] = useState<TrafficResultsResponse[]>([]);
    const [fetchStatus, setFetchStatus] = useState("");

    useEffect(() => {
       setFetchStatus("LOADING")
       fetchData()
    }, [city])

    const fetchData = async () => {
        getResultsByCity(city)
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
                <div>  
                    <LineChart width={1000} height={600} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" />
                        <YAxis ticks={[0, 10, 20, 30, 40, 50]}/>
                        <Tooltip />
                        <Legend iconType="square"/>
                        <Line type="monotone" dataKey="avg_free_flow_speed" stroke="#8884d8" name="Average Free Flow Speed"/>
                        <Line type="monotone" dataKey="avg_current_speed" stroke="#82ca9d" name="Average Current Speed"/>
                    </LineChart>
                    <h1>{city}</h1>
                </div>
            }   
        </>
    )
}

export default CityGraphLoader