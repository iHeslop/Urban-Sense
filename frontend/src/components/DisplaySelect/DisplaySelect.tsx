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
      >
        <option value="cityComparison">City Comparison</option>
        <option value="individualCity">Individual City</option>
      </select>
    </>
  );
};

export default DisplaySelect;
