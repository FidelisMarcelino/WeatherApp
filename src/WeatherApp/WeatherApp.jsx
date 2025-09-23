import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { div } from "framer-motion/client";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null)
  const [view, setView] = useState("hourly")

  const API_KEY = "b9e6eaca1ab64aa2a66122137250109";

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();

    if(inputRef.current){
      inputRef.current.focus()
    }
  }, [city]);

  return (
    <div className="p-4 bg-gradient-to-tr from-pink-500 via-purple-800 to-red-400 min-h-screen">
      <h1 className="text-5xl font-bold m-4 text-gray-200 text-center">Weather App</h1>

      {/* Input City */}
      <div className="flex justify-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 rounded w-72"
          placeholder="Search for cities..."
          ref={inputRef}
        />
      </div>

      <div>
        {/* Loading & Result */}
        {loading ? (
          <p className="mt-4 text-center text-white text-2xl">Loading...</p>
        ) : weather ? (
          <div>
            <div className="flex justify-center">
              <div className="mt-4 p-10 bg-gradient-to-tr from-red-400 via-purple-300 to-pink-300 rounded-xl flex flex-row w-fit">
                <div>
                  <h2 className="text-3xl font-bold">
                    {weather.location.name}, {weather.location.country}
                  </h2>

                  <p className="font-semibold text-lg">
                    {new Date(weather.location.localtime).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  
                  {/* Jam */}
                  <p className="font-semibold">{weather.location.localtime.split(" ")[1]} </p>

                  <img src={weather.current.condition.icon} alt="weather icon" className="mt-4 h-24"/>              
                  <p className="font-semibold text-xl">{weather.current.condition.text}</p>
                </div>

                <div className="flex flex-col justify-center items-center ml-10">
                  <p className="text-7xl font-medium">{weather.current.temp_c}°</p>
                  <p className="text-2xl font-medium ">{weather.current.wind_mph} mph</p>
                </div>
              </div>
            </div>

            {/* Navigation Button */}
            <div className="flex gap-2 justify-center mt-10">
              <button 
                onClick={() => setView("hourly")}
                className={`px-4 py-2 rounded-lg font-semibold text-white ${
                  view === "hourly"
                  ? "underline underline-offset-8"
                  : "opacity-50"
                }`}
              >
                Hourly
              </button>
                
              <button
                onClick={() => setView("weekly")}
                className={`px-4 py-2 rounded-lg font-semibold text-white ${
                  view === "weekly"
                  ? "underline underline-offset-8"
                  : "opacity-50"
                }`}
              >
                Weekly
              </button>
            </div>

            {/* Forecast */}
            <div className="text-white">
              {view === "hourly" ? (
                <>
                  <h2 className="text-3xl font-semibold text-center my-4">Hourly Forecast</h2>
                  <div className="gap-4 flex overflow-x-auto space-x-2 pb-2 styled-scrollbar cursor-grab active:cursor-grabbing">
                    {weather.forecast.forecastday[0].hour.map((hour, index) => (
                    <div key={index} className="bg-slate-800 rounded-lg p-4 min-w-[calc(100%/8)] flex-shrink-0 items-center shadow p-3 text-center">
                      <p className="block font-semibold">{hour.time.split(" ")[1]}</p>
                      <img src={hour.condition.icon} alt="hourly weather" className="w-10 h-10 mx-auto"/>
                      <p className="block">{hour.temp_c}°</p>
                      <p className="text-sm">{hour.condition.text}</p>
                    </div>
                    ))}
                  </div>
                </>
              ) : ( 
                <>
                  <h2 className="text-3xl font-semibold text-center my-4">Weekly Forecast</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {weather.forecast.forecastday.map((day, index) => (
                    <div key={index} className="bg-slate-800 rounded-lg p-4 text-center shadow">
                      <p className="font-semibold">
                        {new Date(day.date).toLocaleDateString("us-ID", {
                          weekday: "long",
                        })}
                      </p>

                      <img src={day.day.condition.icon} alt="daily weather" className="w-12 hday12 mx-auto"/>
                      <p className="block">{day.day.avgtemp_c}°</p>
                      <p className="text-sm">{day.day.condition.text}</p>
                    </div>
                    ))}
                  </div>
                </>
              )}
              
            </div>
          </div>
        ) : (
          <p className="mt-4 text-center text-2xl font-semibold text-red-200">No data yet</p>
        )}
      </div>
    </div>
  );
}
