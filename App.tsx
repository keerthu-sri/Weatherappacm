import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import { useWeather } from './context/WeatherContext';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherChart from './components/WeatherChart';
import FavoriteLocations from './components/FavoriteLocations';
import WeatherForecast from './components/WeatherForecast';

const getBackgroundStyle = (condition?: string) => {
  const timeOfDay = new Date().getHours();
  const isDaytime = timeOfDay >= 6 && timeOfDay < 18;

  if (!condition) return 'bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300';

  const condition_lower = condition.toLowerCase();
  if (condition_lower.includes('rain')) {
    return 'bg-[url("https://images.unsplash.com/photo-1519692933481-e162a57d6721")] bg-cover bg-center';
  } else if (condition_lower.includes('snow')) {
    return 'bg-[url("https://images.unsplash.com/photo-1478265409131-1f65c88f965c")] bg-cover bg-center';
  } else if (condition_lower.includes('thunder')) {
    return 'bg-[url("https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28")] bg-cover bg-center';
  } else if (condition_lower.includes('cloud')) {
    return 'bg-[url("https://images.unsplash.com/photo-1534088568595-a066f410bcda")] bg-cover bg-center';
  } else {
    return 'bg-[url("https://images.unsplash.com/photo-1601297183305-6df142704ea2")] bg-cover bg-center';
  }
};

const WeatherApp: React.FC = () => {
  const { weatherData, loading, error } = useWeather();
  const backgroundStyle = getBackgroundStyle(weatherData?.current?.condition?.text);

  return (
    <div className={`min-h-screen ${backgroundStyle} transition-all duration-500`}>
      <div className="min-h-screen backdrop-blur-sm bg-black/30">
        <div className="container mx-auto px-4 py-8">
          <SearchBar />
          {loading && (
            <div className="text-white text-center">Loading weather data...</div>
          )}
          {error && (
            <div className="text-red-400 text-center bg-red-400/10 rounded-lg p-4">
              {error}
            </div>
          )}
          {weatherData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <CurrentWeather />
                <WeatherForecast />
              </div>
              <div className="space-y-8">
                <WeatherChart />
                <FavoriteLocations />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  );
};

export default App;