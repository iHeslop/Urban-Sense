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
import { getResultsByCity } from "../../services/air-data";
import { AirDataResponse } from "../../services/api-responses.interface";
import Loader from "../Loader/Loader";
import styles from "./CityAirGraphLoader.module.scss";

interface CityAirGraphLoaderProps {
  city: string;
}

const CityAirGraphLoader = ({ city }: CityAirGraphLoaderProps) => {
  const [data, setData] = useState<AirDataResponse[]>([]);
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
          <LineChart
            width={1200}
            height={600}
            data={data}
            className={styles.chart}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickMargin={10} fontSize={13} />

            <Tooltip />
            <Legend
              iconType="circle"
              wrapperStyle={{ position: "relative" }}
              payload={[
                {
                  value: "Current AQUIS",
                  type: "circle",
                  id: "Current AQUIS",
                  color: "#7CB9E8",
                },
              ]}
            />
            <YAxis
              label={{ value: "AIR QUALITY INDEX", angle: -90, dx: -20 }}
              fontSize={13}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            <Line
              type="monotone"
              dataKey="aqius"
              name="Current AQUIS"
              stroke="#7CB9E8"
              dot={{ strokeWidth: 2 }}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="mainus"
              name="Main Pollutant:"
              stroke="#F4A261"
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

export default CityAirGraphLoader;
