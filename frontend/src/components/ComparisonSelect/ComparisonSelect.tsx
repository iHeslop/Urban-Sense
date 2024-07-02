import styles from "./ComparisonSelect.module.scss";

interface ComparisonSelectProps {
  comparison: string;
  handleComparisonChange: (comparison: string) => void;
}

const ComparisonSelect = ({
  handleComparisonChange,
  comparison,
}: ComparisonSelectProps) => {
  return (
    <>
      <select
        value={comparison}
        onChange={(e) => handleComparisonChange(e.target.value)}
        className={styles.select}
      >
        <option value="trafficLevels">Traffic Levels</option>
        <option value="speedLevels">Speed Levels</option>
      </select>
    </>
  );
};

export default ComparisonSelect;
