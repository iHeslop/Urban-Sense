import styles from "./TrafficPage.module.scss";
import ComparisonGraphLoader from "../../components/ComparisonGraphLoader/ComparisonGraphLoader";
import CityGraphLoader from "../../components/CityGraphLoader/CityGraphLoader";
import DisplaySelect from "../../components/DisplaySelect/DisplaySelect";
import ComparisonSelect from "../../components/ComparisonSelect/ComparisonSelect";
import { useState } from "react";
import CitySelect from "../../components/CitySelect/CitySelect";

const TrafficPage = () => {
  const [dataType, setDataType] = useState<string>("cityComparison");
  const [city, setCity] = useState<string>("Sydney");
  const [comparison, setComparison] = useState<string>("trafficLevels");

  const handleDataTypeChange = (value: string) => {
    setDataType(value);
  };
  const handleCityChange = (city: string) => {
    setCity(city);
  };
  const handleComparisonChange = (value: string) => {
    setComparison(value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.section}>
          <p className={styles.title}>
            <span className={styles.bold}>Traffic</span>Data
          </p>
          <p className={styles.text}>
            Use this tool to gain insights into traffic levels, compare trends
            between cities, and make informed decisions based on real-time data.
            Whether you're planning your daily commute or conducting research,
            Urban Sense provides the information you need to stay ahead of the
            traffic.
          </p>
        </div>
        <div className={styles.select}>
          <p className={styles.label}>Select Data:</p>
          <DisplaySelect
            handleDataTypeChange={handleDataTypeChange}
            dataType={dataType}
          />
        </div>
        {dataType === "cityComparison" && (
          <div className={styles.select}>
            <p className={styles.label}>Select Level Display:</p>
            <ComparisonSelect
              handleComparisonChange={handleComparisonChange}
              comparison={comparison}
            />
          </div>
        )}
        {dataType === "individualCity" && (
          <>
            <div className={styles.select}>
              <p className={styles.label}>Select City:</p>
              <CitySelect handleCityChange={handleCityChange} city={city} />
            </div>
          </>
        )}
        <div className={styles.section}>
          <p className={styles.info}>
            Free Flow Speed: The traffic free flow speed expected under ideal
            conditions.
          </p>
          <p className={styles.info}>
            Current Speed: The current average traffic flow speed.
          </p>
          <p className={styles.info}>
            Traffic Flow: The percentage of the current speed against the free
            flow speed.
          </p>
        </div>
      </div>
      {dataType === "cityComparison" && (
        <div className={styles.graph}>
          <ComparisonGraphLoader comparison={comparison} />
        </div>
      )}
      {dataType === "individualCity" && (
        <div className={styles.graph}>
          <CityGraphLoader city={city} />
        </div>
      )}
      <p className={styles.copyright}>&copy; / 2024</p>
    </div>
  );
};
export default TrafficPage;
