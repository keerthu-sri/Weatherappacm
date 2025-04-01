import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useWeather } from '../context/WeatherContext';
import { motion } from 'framer-motion';

const WeatherChart: React.FC = () => {
  const { weatherData, isCelsius } = useWeather();

  if (!weatherData?.forecast) return null;

  const data = weatherData.forecast.forecastday.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
    'Max Temp': isCelsius ? day.day.maxtemp_c : day.day.maxtemp_f,
    'Min Temp': isCelsius ? day.day.mintemp_c : day.day.mintemp_f,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
    >
      <h2 className="text-xl font-semibold text-white mb-4">Temperature Trend</h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="date"
              stroke="rgba(255,255,255,0.7)"
              tick={{ fill: 'rgba(255,255,255,0.7)' }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.7)"
              tick={{ fill: 'rgba(255,255,255,0.7)' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)',
                color: 'white',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="Max Temp"
              stroke="#60A5FA"
              strokeWidth={2}
              dot={{ fill: '#60A5FA' }}
            />
            <Line
              type="monotone"
              dataKey="Min Temp"
              stroke="#F87171"
              strokeWidth={2}
              dot={{ fill: '#F87171' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default WeatherChart;