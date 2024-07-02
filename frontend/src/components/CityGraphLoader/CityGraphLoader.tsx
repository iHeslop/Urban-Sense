import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { getResultsByCity } from "../../services/traffic-data";
import { TrafficResultsResponse } from "../../services/api-responses.interface";
import Loader from "../Loader/Loader";
import styles from "./CityGraphLoader.module.scss";

interface CityGraphLoaderProps {
  city: string;
}

const CityGraphLoader = ({ city }: CityGraphLoaderProps) => {
  const [data, setData] = useState<TrafficResultsResponse[]>([]);
  const [fetchStatus, setFetchStatus] = useState("");

  useEffect(() => {
    setFetchStatus("LOADING");
    fetchData();
  }, [city]);

  const fetchData = async () => {
    getResultsByCity(city)
      .then((data) => {
        setFetchStatus("SUCCESS");
        setData(data);
      })
      .catch((e) => {
        setFetchStatus("FAILED");
        console.warn(e);
      });
  };

  return (
    <>
      {fetchStatus === "LOADING" && <Loader fetchStatus={fetchStatus} />}
      {fetchStatus === "FAILED" && <Loader fetchStatus={fetchStatus} />}
      {fetchStatus === "SUCCESS" && data.length === 0 && (
        <Loader fetchStatus={fetchStatus} />
      )}
      {fetchStatus === "SUCCESS" && data.length > 0 && (
        <div className={styles.container}>
          <LineChart width={1000} height={600} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis
              ticks={[0, 10, 20, 30, 40, 50]}
              label={{ value: "Kilometres / Hour", angle: -90, dx: -20 }}
            />
            <Tooltip />
            <Legend iconType="square" />
            <Line
              type="monotone"
              dataKey="avg_free_flow_speed"
              stroke="rebeccapurple"
              name="Average Free Flow Speed"
              dot={{ strokeWidth: 2 }}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="avg_current_speed"
              stroke="green"
              name="Average Current Speed"
              dot={{ strokeWidth: 2 }}
              strokeWidth={2}
            />
          </LineChart>
          <p className={styles.title}>{city}</p>
        </div>
      )}
    </>
  );
};

export default CityGraphLoader;
