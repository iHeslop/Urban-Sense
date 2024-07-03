import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  YAxis,
  XAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { getLatestResults } from "../../services/air-data";
import { AirDataResponse } from "../../services/api-responses.interface";
import Loader from "../Loader/Loader";
import styles from "./AirGraphLoader.module.scss";

const AirGraphLoader = () => {
  const [data, setData] = useState<AirDataResponse[]>([]);
  const [fetchStatus, setFetchStatus] = useState("");
  const [latestTimestamp, setLatestTimestamp] = useState<string>("");

  useEffect(() => {
    setFetchStatus("LOADING");
    fetchData();
  }, []);

  const fetchData = async () => {
    getLatestResults()
      .then((data) => {
        setFetchStatus("SUCCESS");
        setData(data);
        setLatestTimestamp(data[0].timestamp);
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
      {fetchStatus === "SUCCESS" && (
        <div className={styles.container}>
          <BarChart width={1200} height={600} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" tickMargin={10} fontSize={13} />
            <Tooltip />
            <Legend iconType="square" wrapperStyle={{ position: "relative" }} />
            <YAxis
              label={{ value: "AIR QUALITY INDEX", angle: -90, dx: -20 }}
              fontSize={13}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            <Bar
              dataKey="aqius"
              fill="#7CB9E8"
              name="Current AQUIS"
              barSize={100}
            />
          </BarChart>
          <p className={styles.title}>{latestTimestamp}</p>
        </div>
      )}
    </>
  );
};

export default AirGraphLoader;
