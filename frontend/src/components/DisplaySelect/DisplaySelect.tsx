import styles from "./DisplaySelect.module.scss";

interface DisplaySelectProps {
  dataType: string;
  handleDataTypeChange: (value: string) => void;
}

const DisplaySelect = ({
  handleDataTypeChange,
  dataType,
}: DisplaySelectProps) => {
  return (
    <>
      <select
        value={dataType}
        onChange={(e) => handleDataTypeChange(e.target.value)}
        className={styles.select}
      >
        <option value="cityComparison" className={styles.option}>
          City Comparison
        </option>
        <option value="individualCity" className={styles.option}>
          Individual City
        </option>
      </select>
    </>
  );
};

export default DisplaySelect;
