export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
    feelslike_f: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }>;
  };
}

export interface WeatherContextType {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  searchCity: (city: string) => Promise<void>;
  toggleUnit: () => void;
  isCelsius: boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
  favoriteLocations: string[];
  addToFavorites: (city: string) => void;
  removeFromFavorites: (city: string) => void;
}