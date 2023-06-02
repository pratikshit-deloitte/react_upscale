import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCityName, removeCityName } from '../Redux/weatherSlice';
import { useSelector } from 'react-redux';
import plusicon from "../../assets/plusicon.png";
import "./AddToList.css";
interface WeatherData {
  name: string;
}

interface AddToListButtonProps {
  name: string;
  weatherData: WeatherData; // Update the type here
}

const AddToListButton: React.FC<AddToListButtonProps> = ({ name, weatherData }) => {
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();

  const handleAddToList = () => {
    dispatch(addCityName({
      name: weatherData.name,
      data: weatherData
    }));
    setAdded(true);
  };

  const handleRemoveFromList = () => {
    dispatch(removeCityName(name));
    setAdded(false);
  };

  return (
    <div>
      {!added ? (
        <div className="button-with-icon">

        <button onClick={handleAddToList} className="add-list-btn">

          Add to List

        </button>

        <img src={plusicon} alt="Plus Icon" className="icon" />

      </div>
  
      ) : (
        <div>
          <button style={{ backgroundColor: '#009456', width: '150px', height: '50px', color: 'white', fontWeight: 700, marginRight: '30px', border: 'none', borderRadius: '10px' }}>Successfully Added</button>

          <button style={{ backgroundColor: '#EC7272', width: '150px', height: '50px', color: 'white', fontWeight: 700, border: 'none', borderRadius: '10px' }} onClick={handleRemoveFromList}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default AddToListButton;
