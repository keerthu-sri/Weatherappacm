import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { motion } from 'framer-motion';

const WeatherForecast: React.FC = () => {
  const { weatherData, isCelsius } = useWeather();

  if (!weatherData?.forecast) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6"
    >
      <h2 className="text-xl font-semibold text-white mb-4">7-Day Forecast</h2>
      <div className="space-y-4">
        {weatherData.forecast.forecastday.map((day, index) => (
          <div
            key={day.date}
            className="flex items-center justify-between bg-white/5 rounded-xl p-4 text-white"
          >
            <div className="flex items-center gap-4">
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="w-12 h-12"
              />
              <div>
                <p className="font-medium">
                  {index === 0
                    ? 'Today'
                    : new Date(day.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                      })}
                </p>
                <p className="text-sm opacity-80">{day.day.condition.text}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">
                {isCelsius
                  ? `${Math.round(day.day.maxtemp_c)}°C`
                  : `${Math.round(day.day.maxtemp_f)}°F`}
              </p>
              <p className="text-sm opacity-80">
                {isCelsius
                  ? `${Math.round(day.day.mintemp_c)}°C`
                  : `${Math.round(day.day.mintemp_f)}°F`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeatherForecast;