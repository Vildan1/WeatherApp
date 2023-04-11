import { useState } from 'react';
import { useWeather } from '../context/WeatherContext';

function WeatherCard() {
  //we can use the useWeather hook here to get the weatherInfo
  const { weatherInfo } = useWeather();
  //we can use the useState hook to keep track of the selected card
  const [selectedCardId, setSelectedCardId] = useState(null);

  //we can use this object to format the date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  //we can use this function to check if the card is selected
  const isSelected = (cardId) => {
    return cardId === selectedCardId;
  }

  return (
    <div className="card-container">
      {weatherInfo && weatherInfo.map((day) => (
        <div
          key={day.dt}
          className={`weather-card ${isSelected(day.dt) ? 'is-selected' : ''}`}
          onClick={() => setSelectedCardId(day.dt)}
        >
          <div className='selected-city'> {day.city} </div>
          <div className="date">{new Date(day.dt * 1000).toLocaleDateString("en-En", options)}</div>
          <div className="temp">
            {Math.round(day.main.temp)} <span>°C</span>
          </div>
          <div className="description">
            {day.weather[0].description.toUpperCase()}
          </div>
          <div className="image">
            <img
              className="icon"
              src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
              alt="weather icon"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeatherCard;
