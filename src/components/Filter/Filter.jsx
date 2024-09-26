import { useSelector, useDispatch } from 'react-redux';
import {
  setLocation,
  toggleTruckEquipment,
  setTruckType,
} from '../../redux/filters/slice';
import { fetchTrucks } from '../../redux/trucks/operations';
import { selectFilters } from '../../redux/filters/selectors';

export default function Filter() {
  const dispatch = useDispatch();
  const { location, truckType, truckEquipment } = useSelector(selectFilters);

  const handleLocationChange = e => {
    dispatch(setLocation(e.target.value));
  };

  const handleTruckTypeChange = type => {
    dispatch(setTruckType(type));
  };

  const handleEquipmentToggle = equipment => {
    dispatch(toggleTruckEquipment(equipment));
  };

  const handleSearch = () => {
    dispatch(fetchTrucks());
  };

  return (
    <div>
      <h2>Location</h2>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={handleLocationChange}
      />

      <div>
        <h2>Filters</h2>

        <div>
          <h3>Vehicle Equipment</h3>
          {Object.keys(truckEquipment).map(equipment => (
            <button
              key={equipment}
              onClick={() => handleEquipmentToggle(equipment)}
              style={{
                border: truckEquipment[equipment]
                  ? '2px solid blue'
                  : '1px solid gray',
              }}
            >
              {equipment}
            </button>
          ))}
        </div>

        <h4>Vehicle Type</h4>
        {Object.keys(truckType).map(type => (
          <button
            key={type}
            onClick={() => handleTruckTypeChange(type)}
            style={{
              border: truckType[type] ? '2px solid blue' : '1px solid gray',
            }}
          >
            {type}
          </button>
        ))}
      </div>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
