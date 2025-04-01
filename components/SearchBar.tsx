import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { motion } from 'framer-motion';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const { searchCity } = useWeather();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchCity(query.trim());
      setQuery('');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="relative w-full max-w-md mx-auto mb-8"
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 pr-12"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
        >
          <Search size={24} />
        </button>
      </div>
    </motion.form>
  );
};

export default SearchBar;