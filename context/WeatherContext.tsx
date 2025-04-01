import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { WeatherData, WeatherContextType } from '../types/weather';

const WeatherContext = createContext<WeatherContextType | null>(null);

const API_KEY = '331b65dd7c484ec9a8b43925252803';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCelsius, setIsCelsius] = useState(() => 
    localStorage.getItem('tempUnit') === 'F' ? false : true
  );
  const [darkMode, setDarkMode] = useState(() => 
    localStorage.getItem('darkMode') === 'true'
  );
  const [favoriteLocations, setFavoriteLocations] = useState<string[]>(() => 
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      searchCity(lastCity);
    }
  }, []);

  const searchCity = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}/forecast.json`, {
        params: {
          key: API_KEY,
          q: city,
          days: 7,
        },
      });
      setWeatherData(response.data);
      localStorage.setItem('lastCity', city);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
    localStorage.setItem('tempUnit', !isCelsius ? 'C' : 'F');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  const addToFavorites = (city: string) => {
    if (!favoriteLocations.includes(city)) {
      const newFavorites = [...favoriteLocations, city];
      setFavoriteLocations(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (city: string) => {
    const newFavorites = favoriteLocations.filter(loc => loc !== city);
    setFavoriteLocations(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <WeatherContext.Provider value={{
      weatherData,
      loading,
      error,
      searchCity,
      toggleUnit,
      isCelsius,
      darkMode,
      toggleDarkMode,
      favoriteLocations,
      addToFavorites,
      removeFromFavorites,
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};