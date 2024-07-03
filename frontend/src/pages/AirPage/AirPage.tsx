import styles from "./AirPage.module.scss";
import AirGraphLoader from "../../components/AirGraphLoader/AirGraphLoader";
import CityAirGraphLoader from "../../components/CityAirGraphLoader/CityAirGraphLoader";
import DisplaySelect from "../../components/DisplaySelect/DisplaySelect";
import { useState } from "react";
import CitySelect from "../../components/CitySelect/CitySelect";

const AirPage = () => {
  const [dataType, setDataType] = useState<string>("cityComparison");
  const [city, setCity] = useState<string>("Sydney");

  const handleDataTypeChange = (value: string) => {
    setDataType(value);
  };
  const handleCityChange = (city: string) => {
    setCity(city);
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.section}>
          <p className={styles.title}>
            <span className={styles.bold}>Air</span>Quality
          </p>
          <p className={styles.text}>
            Gain valuable insights into air quality metrics across cities with
            Urban Sense. Compare pollution trends, monitor real-time data on
            various pollutants, and make informed decisions to safeguard your
            health and well-being. Whether you're concerned about pollution
            levels or seeking to improve air quality, Urban Sense provides the
            data you need for informed actions.
          </p>
        </div>
        <div className={styles.select}>
          <p className={styles.label}>Select Data:</p>
          <DisplaySelect
            handleDataTypeChange={handleDataTypeChange}
            dataType={dataType}
          />
        </div>
        {dataType === "individualCity" && (
          <div className={styles.select}>
            <p className={styles.label}>Select City:</p>
            <CitySelect handleCityChange={handleCityChange} city={city} />
          </div>
        )}
        <div className={styles.section}>
          <p className={styles.info}>
            AQUIS: AQI value based on US EPA standard.
          </p>
          <div className={styles.info_list}>
            <p className={styles.info}>p2: pm2.5 (particulate matter)</p>
            <p className={styles.info}>p1: pm10 (particulate matter)</p>
            <p className={styles.info}>o3: Ozone O3</p>
            <p className={styles.info}>n2: Nitrogen dioxide NO2</p>
            <p className={styles.info}>s2: Sulfur dioxide SO2 </p>
            <p className={styles.info}>co: Carbon monoxide CO </p>
          </div>
        </div>
      </div>
      {dataType === "cityComparison" && (
        <div className={styles.graph}>
          <AirGraphLoader />
        </div>
      )}
      {dataType === "individualCity" && (
        <div className={styles.graph}>
          <CityAirGraphLoader city={city} />
        </div>
      )}
      <p className={styles.copyright}>&copy; / 2024</p>
    </div>
  );
};
export default AirPage;
