import axios from 'axios';
import {useEffect, useState} from 'react';
// due to how react-native-dotenv works with webpack it's needed to ts-ignore the next line
// @ts-ignore
import {API_BASE_URL, API_TOKEN} from 'react-native-dotenv';

export default function useCurrentWeather(cityId: number | undefined) {
  const [weather, setWeather] = useState<Weather | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (!cityId) {
      return;
    }

    axios
      .get(
        `${API_BASE_URL}/api/v1/weather/locale/${cityId}/current?token=${API_TOKEN}`,
      )
      .then(response => {
        setWeather(response.data as Weather);
        setLoading(false);
      })
      .catch(_error => {
        console.log(
          _error.message,
          `${API_BASE_URL}/api/v1/weather/locale/${cityId}/current?token=${API_TOKEN}`,
        );
        setWeather(null);
        setError(_error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cityId]);

  return {weather, loading, error};
}

export interface Weather {
  id: number;
  name: string;
  state: string;
  country: string;
  data: WeatherData;
}

export interface WeatherData {
  date: Date;
  temperature: number;
  icon: string;
  condition: string;
}

export interface MinMax {
  min: number;
  max: number;
}
