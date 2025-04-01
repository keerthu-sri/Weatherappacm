export interface WeatherData {
  location: string;
  current: {
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    icon: string;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
  }>;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type Theme = 'light' | 'dark';