import axios from 'axios';
import {useEffect, useState} from 'react';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'current_weather';

export default function useCurrentWeather(
  cityId: number | undefined,
  refreshRequest: number | undefined,
) {
  const [weather, setWeather] = useState<Weather | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (!cityId) {
      return;
    }

    axios
      .get(
        `${Config.API_BASE_URL}/api/v1/weather/locale/${cityId}/current?token=${Config.API_TOKEN}`,
      )
      .then(response => {
        setWeather(response.data as Weather);
        try {
          AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
        } catch (e) {
          console.error(e);
        }
        setLoading(false);
      })
      .catch(async _error => {
        try {
          const value = await AsyncStorage.getItem(STORAGE_KEY);
          setWeather(value ? JSON.parse(value) : null);
        } catch (e) {
          console.error(e);
        }
        setError(_error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cityId, refreshRequest]);

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
