import styles from "./HomePage.module.scss";
import ResultsGraphLoader from "../../components/GraphLoader/GraphLoader";
import DisplaySelect from "../../components/DisplaySelect/DisplaySelect";
import { useState } from "react";
import CitySelect from "../../components/CitySelect/CitySelect";


const HomePage = () => {
  const [dataType, setDataType] = useState<string>("cityComparison")
  const [city, setCity] = useState<string>("Sydney")
  const handleDataTypeChange = (value: string) => {
    setDataType(value)
  }
  const handleCityChange = (city: string) => {
    setCity(city)
  }
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <p>Home Page</p>
        <DisplaySelect handleDataTypeChange={handleDataTypeChange} dataType={dataType}/>
        {dataType === "individualCity" && 
          <CitySelect handleCityChange={handleCityChange} city={city}/>
        }
      </div>
      {dataType === "cityComparison" && 
        <ResultsGraphLoader />}
      <p className={styles.copyright}>&copy; / 2024</p>
    </div>
  );
};
export default HomePage;
