import styles from "./CitySelect.module.scss";

interface CitySelectProps {
  city: string;
  handleCityChange: (city: string) => void;
}

const CitySelect = ({ handleCityChange, city }: CitySelectProps) => {
  return (
    <>
      <select
        value={city}
        onChange={(e) => handleCityChange(e.target.value)}
        className={styles.select}
      >
        <option value="Sydney">Sydney</option>
        <option value="Melbourne">Melbourne</option>
        <option value="Adelaide">Adelaide</option>
        <option value="Brisbane">Brisbane</option>
        <option value="Perth">Perth</option>
      </select>
    </>
  );
};

export default CitySelect;
