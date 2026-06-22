import React, { useEffect,useRef, useState} from 'react'
import './Weather.css'
import search_icon from '../assets/images/search.png';
import clear_icon from '../assets/images/clear.png';
import clouds_icon from '../assets/images/clouds.png';
import drizzle_icon from '../assets/images/drizzle.png';
import humidity_icon from '../assets/images/humidity.png';
import mist_icon from '../assets/images/mist.png';
import rain_icon from '../assets/images/rain.png';
import snow_icon from '../assets/images/snow.png';
import wind_icon from '../assets/images/wind.png';
const Weather = () => {

  const inputRef = useRef()
  const[weatherdata , setWeatherdata] = useState(false);

  const allIcons ={
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": clouds_icon,
    "02n": clouds_icon,
    "03d": clouds_icon,
    "03n": clouds_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }

  const search = async(city)=>{
    if(city === ""){
      alert("Alert! Enter city name");
      return;
    }

    try {
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      
      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherdata({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temp: Math.floor(data.main.temp),
        loc: data.name,
        icon: icon
      });

    } catch (error) {
      
    }
  }

  useEffect(() =>{
    search("New York");
  },[])

  return (
    <div>
      
      <div className="container">
        <div className="search">
          <input ref={inputRef} type="text" placeholder="Enter city name" />
          <img src={search_icon} alt="search icon" onClick={()=>search(inputRef.current.value)} />
        </div>
        <img src={weatherdata.icon} alt="" className='weather_icon' />
        <p className='temp'>{weatherdata.temp}°C </p>
        <p className='loc'>{weatherdata.loc}</p>
        <div className='weather-data'>
          <div className='col'>
            <img src={humidity_icon} alt="humidity" />
            <div>
              <p>{weatherdata.humidity} %</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className='col'>
            <img src={wind_icon} alt="humidity" />
            <div>
              <p>{weatherdata.windspeed} km/hrs</p>
              <p>Wind</p>
            </div>
          </div>
        </div>
        <h1>Ankush Kashyap</h1>
      </div>
    </div> 
  )
}

export default Weather
