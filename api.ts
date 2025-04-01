import { WeatherData } from './types';

const API_KEY = '331b65dd7c484ec9a8b43925252803';
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function getWeatherData(city: string): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no`
    );

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();

    return {
      location: data.location.name,
      current: {
        temp: data.current.temp_c,
        condition: data.current.condition.text,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        windDirection: data.current.wind_dir,
        icon: data.current.condition.icon,
      },
      forecast: data.forecast.forecastday.map((day: any) => ({
        date: day.date,
        high: day.day.maxtemp_c,
        low: day.day.mintemp_c,
        condition: day.day.condition.text,
        icon: day.day.condition.icon,
      })),
    };
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
}