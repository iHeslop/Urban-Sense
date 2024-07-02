import styles from "./HomePage.module.scss";
import ComparisonGraphLoader from "../../components/ComparisonGraphLoader/ComparisonGraphLoader";
import CityGraphLoader from "../../components/CityGraphLoader/CityGraphLoader";
import DisplaySelect from "../../components/DisplaySelect/DisplaySelect";
import ComparisonSelect from "../../components/ComparisonSelect/ComparisonSelect";
import { useState } from "react";
import CitySelect from "../../components/CitySelect/CitySelect";


const HomePage = () => {
  const [dataType, setDataType] = useState<string>("cityComparison")
  const [city, setCity] = useState<string>("Sydney")
  const [comparison, setComparison] = useState<string>("trafficLevels")

  const handleDataTypeChange = (value: string) => {
    setDataType(value)
  }
  const handleCityChange = (city: string) => {
    setCity(city)
  }
  const handleComparisonChange = (value: string) => {
    setComparison(value)
  }
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <p>Home Page</p>
        <DisplaySelect handleDataTypeChange={handleDataTypeChange} dataType={dataType}/>
        {dataType === "cityComparison" && 
          <ComparisonSelect handleComparisonChange={handleComparisonChange} comparison={comparison}/>
        }
        {dataType === "individualCity" && 
          <CitySelect handleCityChange={handleCityChange} city={city}/>
        }
      </div>
      {dataType === "cityComparison" && 
        <ComparisonGraphLoader comparison={comparison}/>}
      {dataType === "individualCity" && 
        <CityGraphLoader city={city}/>
      }
      <p className={styles.copyright}>&copy; / 2024</p>
    </div>
  );
};
export default HomePage;
