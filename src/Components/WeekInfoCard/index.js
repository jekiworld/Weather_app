import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleCardComponents from '../SingleCard';
import { UseWeatherAppContext } from '../../Context/Context';

const WeekInfoCardComponents = () => {
  const { state: { daily }, dispatch } = UseWeatherAppContext();
  const [selectedCard, setSelectedCard] = useState(0);
  const [weatherAdvice, setWeatherAdvice] = useState('');

  const handleGetWeatherAdvice = async () => {
    try {
      const selectedDay = daily[selectedCard];

      const response = await axios.post('http://localhost:8000/get_weather_advice', {
        temperature: selectedDay.temp.day,
        humidity: selectedDay.humidity,
        wind_speed: selectedDay.wind_speed,
        uv_index: selectedDay.uvi,
      });

      setWeatherAdvice(response.data.weatherAdvice);
    } catch (error) {
      console.error('Error getting weather advice:', error);
    }
  };

  const updateCurrent = () => {
    dispatch({
      type: 'SET_CURRENT',
      payload: daily[selectedCard],
    });
  };

  useEffect(() => {
    updateCurrent();
    // eslint-disable-next-line
  }, [daily, selectedCard]);

  return (
    <>
      <div className='cardWrap'>
        <ul className='cardList'>
          {daily && daily.length > 0 ? daily.map((item, index) => {
            if (index < 7) {
              return (
                <SingleCardComponents
                  className={index === selectedCard ? 'active' : ''}
                  onClick={() => {
                    setSelectedCard(index);
                    updateCurrent();
                  }}
                  item={item}
                  key={index}
                />
              );
            }
            return '';
          }) : ''}
        </ul>
      </div>
      <button className="weatherAdviceButton" onClick={handleGetWeatherAdvice}>
        Получить совет по одежде
      </button>
      {weatherAdvice && (
        <div className="weatherAdvice">
          <h2>Совет по одежде:</h2>
          <p>{weatherAdvice}</p>
        </div>
      )}
    </>
  );
};

export default WeekInfoCardComponents;
