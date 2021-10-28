import axios from 'axios';
import {useEffect, useState} from 'react';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'forecast_15days';

export default function useForecast15Days(
  cityId: number | undefined,
  refreshRequest: number | undefined,
) {
  const [forecast, setForecast] = useState<Forecast | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (!cityId) {
      return;
    }

    axios
      .get(
        `${Config.API_BASE_URL}/api/v1/forecast/locale/${cityId}/days/15?token=${Config.API_TOKEN}`,
      )
      .then(response => {
        setForecast(response.data as Forecast);
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
          setForecast(value ? JSON.parse(value) : null);
        } catch (e) {
          console.error(e);
        }
        setError(_error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cityId, refreshRequest]);

  return {forecast, loading, error};
}

export interface Forecast {
  id: number;
  name: string;
  state: string;
  country: string;
  data: ForecastData[];
}

export interface ForecastData {
  date: Date;
  temperature: MinMax;
  text_icon: ForecastDataTextIcon;
}

export interface ForecastDataTextIcon {
  icon: ForecastDataTextIconIcon;
}

export interface ForecastDataTextIconIcon {
  day: string;
}

export interface MinMax {
  min: number;
  max: number;
}
