import React, { useEffect, useState } from 'react';
import { formattedData } from './weatherService';
import clear from './Assets/clear.png';
import cloud from './Assets/cloud.png';
import rain from './Assets/rain.png';

import drizzle from './Assets/drizzle.png';
import snow from './Assets/snow.png';
import rain_video from './Assets/rain_video.mp4';
import storm from './Assets/storm.mp4';
import Description from './Components/Description';
import moving_clouds from './Assets/moving_clouds.mp4';

function App() {
  const [city, setCity] = useState("Mumbai");
  const [weatherS, setWeatherS] = useState(null);
  const [units, setUnits] = useState('metric'); 

  const [image, setImage] = useState(clear);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await formattedData(city, units);
      setWeatherS(data);
    }
    fetchWeatherData();

    


    

  }, [units, city]);

  const handleUnitsClick = () => {
    
    const newUnits = units === 'imperial' ? 'metric' : 'imperial';
    setUnits(newUnits);
  }

  const keyPressedDown = (e) => {
    if (e.keyCode === 13) {


      setCity(e.currentTarget.value);
      e.currentTarget.blur();
      if (weatherS && weatherS.icon) {
        switch (weatherS.icon) {
          case "01d":
          case "01n":
            setImage(clear);
            break;
          case "02d":
          case "02n":
            setImage(cloud);
            break;
          case "03d":
          case "03n":
            setImage(drizzle);
            break;
          case "04d":
          case "04n":
            setImage(drizzle);
            break;
          case "09d":
          case "09n":
            setImage(rain);
            break;
          case "10d":
          case "10n":
            setImage(rain);
            break;
          case "13d":
          case "13n":
            setImage(snow);
            break;
          default:
            setImage(clear); 
            break;
        }
      } else {
        setImage(clear); 
      }
    }

    
  }

  return (
    <div className="app">
      <video id="background-video" autoPlay loop muted>
        <source src={storm} type="video/mp4" /> {/* Use the imported rain_video here */}
      </video>
      <div className='overlay'>
        {weatherS && (
          <div className='container'>
            <div className='section section__inputs'>
              <input onKeyDown={keyPressedDown} type='text' name='city' placeholder='Enter City....' />
              <button onClick={handleUnitsClick}>
                {units === 'imperial' ? '°F' : '°C'}
              </button>
            </div>
            <div className='section section__temperature'>
              <div className='icon'>
                <h3>{`${weatherS.name}, ${weatherS.country}`}</h3>
                <img src={image} alt='' />
                <h3>{weatherS.description}</h3>
              </div>
              <div className='temperature'>
                <h1>{`${weatherS.temp.toFixed()} °${units === "metric" ? "C": "F"}`}</h1>
              </div>
            </div>
            {/* bottom-description */}
            <Description weather={weatherS} units={units} />
          </div>
        )}
      </div>
      
    </div>
  );
}

export default App;
