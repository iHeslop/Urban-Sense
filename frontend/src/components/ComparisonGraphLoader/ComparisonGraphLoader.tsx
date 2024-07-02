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
import { getLatestResults } from "../../services/traffic-data";
import { TrafficResultsResponse } from "../../services/api-responses.interface";
import Loader from "../Loader/Loader";
import styles from "./ComparisonGraphLoader.module.scss";

interface ComparisonGraphLoaderProps {
  comparison: string;
}

const ComparisonGraphLoader = ({ comparison }: ComparisonGraphLoaderProps) => {
  const [data, setData] = useState<TrafficResultsResponse[]>([]);
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
        const formattedData = data.map((item) => ({
          ...item,
          speed_ratio: item.speed_ratio * 100,
        }));
        setData(formattedData);
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
            <XAxis dataKey="city" />
            <Tooltip />
            <Legend iconType="square" />
            {comparison === "speedLevels" && (
              <>
                <YAxis
                  ticks={[0, 10, 20, 30, 40, 50]}
                  label={{ value: "Kilometres / Hour", angle: -90, dx: -20 }}
                />
                <Bar
                  dataKey="avg_current_speed"
                  fill="green"
                  name="Average Current Speed"
                  barSize={50}
                />
                <Bar
                  dataKey="avg_free_flow_speed"
                  fill="rebeccapurple"
                  name="Average Free Flow Speed"
                  barSize={50}
                />
              </>
            )}
            {comparison === "trafficLevels" && (
              <>
                <YAxis
                  label={{ value: "Traffic Flow % ", angle: -90, dx: -20 }}
                />
                <Bar
                  dataKey="speed_ratio"
                  fill="green"
                  name="Current Traffic Flow Level"
                  barSize={100}
                />
              </>
            )}
          </BarChart>
          <p className={styles.title}>{latestTimestamp}</p>
        </div>
      )}
    </>
  );
};

export default ComparisonGraphLoader;
