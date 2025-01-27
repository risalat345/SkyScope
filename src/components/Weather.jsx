import React, { useEffect,useState } from 'react'
import clear_icon from"../Assets/clear.png"
import humidity from "../Assets/humidity.png"
import wind from "../Assets/wind.png"
import rain from "../Assets/rain.png"
import drizzle from "../Assets/drizzle.png"
import cloud from "../Assets/cloud.png"
import snow from "../Assets/snow.png"
import { useRef } from 'react'
const Weather = () => {
  const inputRef=useRef()
  const allIconns={
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud,
    "02n":cloud,
    "03d":cloud,
    "03n":cloud,
    "04d":drizzle,
    "04n":drizzle,
    "09d":rain,
    "09n":rain,
    "10d":rain,
    "10n":rain,
    "13d":snow,
    "13n":snow,
   
  }
  
  const [weatherData, setweatherData] = useState(false)
// if(weatherData!=inputRef.current.value){
//   alert("Write The Correct City Name")
// }
const search = async (city) => {
  if (!city) {
    alert("Please enter your city name");
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
    const response = await fetch(url);
    const data = await response.json();

    // Check if the city is found
    if (data.cod !== 200) {
      alert("City not found! Please enter a valid city name.");
      return;
    }

    const icon = allIconns[data.weather[0].icon] || clear_icon;
    setweatherData({
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      temparature: Math.floor(data.main.temp),
      location: data.name,
      icon: icon,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("An error occurred while fetching the weather data. Please try again.");
  }
};

  const weather=()=>{
    search(inputRef.current.value)
    inputRef.current.value=""
  }
  useEffect(() => {
    search("Feni")

   }, [])
  return (
   <div className="bg-black min-h-screen md:px-32 p-5 flex flex-col items-center gap-10">
     <div className='flex items-center'>
      <div className="flex flex-col gap-3">
      <div className="logo px-5 text-center text-2xl">
      <span className='text-blue-500 font-bold animated-sky'>Sky</span>
<span className='text-white font-bold animated-scope'>Scope</span>

        <h1 className='text-sm'>An Exciting Weather App</h1>
      </div>
      <div className="search flex gap-3">
  <input
    ref={inputRef}
    placeholder="Search City Name"
    className="w-[250px] text-black font-mono placeholder:font-mono placeholder:font-bold placeholder:text-gray-600 border border-blue-500 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 p-2 rounded-full px-5 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-md"
    type="text"
  />
  <div
    onClick={() => {
      weather();
    }}
    className="cursor-pointer search-icon hover:bg-gradient-to-r from-blue-500 to-sky-400 flex justify-center items-center h-10 w-10 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      className="text-white"
    >
      <path
        fill="black"
        fillRule="evenodd"
        d="M5 11a6 6 0 1 1 12 0a6 6 0 0 1-12 0m6-8a8 8 0 1 0 4.906 14.32l3.387 3.387a1 1 0 0 0 1.414-1.414l-3.387-3.387A8 8 0 0 0 11 3m0 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8"
        clipRule="evenodd"
      />
    </svg>
  </div>
</div>

        
      </div>
    </div>
    <h1 className="intro md:text-2xl text-1xl stylish-slide-in">
  {Array.from("Help To Know The World Weather Condition").map((char, index) => (
    <span
      key={index}
      className="animated-letter"
      style={{ animationDelay: `${index * 0.01}s` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ))}
</h1>

    <div className='flex flex-col justify-center items-center p-2'>
          <img src={weatherData.icon} alt="" />
          <div className="temp text-3xl">{weatherData.temparature}&deg;C</div>
          <div className="location text-3xl">
            {weatherData.location}
          </div>
        </div>
        <div className="weather-data flex gap-10 items-center justify-center">
          <div className="col flex gap-2 justify-center items-center">
           <div>
           <img src={humidity} alt="" />
           </div>
            <div>
              <h1>Humidity</h1>
              <h1>{weatherData.humidity}%</h1>
            </div>
          </div>
          <div className="col flex gap-2 justify-center items-center">
            <div>
            <img src={wind} alt="" />
            </div>
            <div>
              <h1>Wind Spped</h1>
              <h1>{weatherData.windSpeed} km/h</h1>
            </div>
          </div>
        </div>
        <footer className='bg-black w-full text-sky-300 text-center'>Made By Ashraf Uddin</footer>
   </div>
  )
}

export default Weather
