
interface CitySelectProps {
    city: string;
    handleCityChange: (city: string) => void;
}

const CitySelect = ({handleCityChange, city}: CitySelectProps) => {
    return (
        <>
            <select value={city} onChange={(e) => handleCityChange(e.target.value)}>
                    <option value="Sydney">Sydney</option>
                    <option value="Melbourne">Melbourne</option>
                    <option value="Adelaide">Adelaide</option>
                    <option value="Brisbane">Brisbane</option>
                    <option value="Canberra">Canberra</option>
                    <option value="Perth">Perth</option>
            </select>
        </>
    )
}

export default CitySelect