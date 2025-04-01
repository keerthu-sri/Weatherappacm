import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { Star, Thermometer, Wind, Droplets, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const CurrentWeather: React.FC = () => {
  const {
    weatherData,
    isCelsius,
    toggleUnit,
    favoriteLocations,
    addToFavorites,
    removeFromFavorites,
  } = useWeather();

  if (!weatherData) return null;

  const isFavorite = favoriteLocations.includes(weatherData.location.name);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold">{weatherData.location.name}</h1>
          <p className="text-lg opacity-80">{weatherData.location.country}</p>
        </div>
        <button
          onClick={() =>
            isFavorite
              ? removeFromFavorites(weatherData.location.name)
              : addToFavorites(weatherData.location.name)
          }
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <Star size={24} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex items-center gap-6 mb-8">
        <img
          src={weatherData.current.condition.icon}
          alt={weatherData.current.condition.text}
          className="w-24 h-24"
        />
        <div>
          <div className="flex items-center gap-4">
            <span className="text-6xl font-bold">
              {isCelsius
                ? Math.round(weatherData.current.temp_c)
                : Math.round(weatherData.current.temp_f)}
            </span>
            <button
              onClick={toggleUnit}
              className="flex items-center gap-1 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Thermometer size={20} />
              {isCelsius ? '°C' : '°F'}
            </button>
          </div>
          <p className="text-xl">{weatherData.current.condition.text}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-4">
          <Thermometer className="text-yellow-400" />
          <div>
            <p className="text-sm opacity-80">Feels like</p>
            <p className="text-lg font-semibold">
              {isCelsius
                ? `${Math.round(weatherData.current.feelslike_c)}°C`
                : `${Math.round(weatherData.current.feelslike_f)}°F`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-4">
          <Droplets className="text-blue-400" />
          <div>
            <p className="text-sm opacity-80">Humidity</p>
            <p className="text-lg font-semibold">{weatherData.current.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-4">
          <Wind className="text-green-400" />
          <div>
            <p className="text-sm opacity-80">Wind</p>
            <p className="text-lg font-semibold">{weatherData.current.wind_kph} km/h</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;