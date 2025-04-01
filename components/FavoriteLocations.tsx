import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const FavoriteLocations: React.FC = () => {
  const { favoriteLocations, searchCity } = useWeather();

  if (favoriteLocations.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
    >
      <h2 className="text-xl font-semibold text-white mb-4">Favorite Locations</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {favoriteLocations.map((location) => (
          <button
            key={location}
            onClick={() => searchCity(location)}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-4 text-white"
          >
            <MapPin size={20} />
            <span className="truncate">{location}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default FavoriteLocations;