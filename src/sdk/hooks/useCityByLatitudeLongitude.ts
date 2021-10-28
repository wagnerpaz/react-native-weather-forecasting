import axios from 'axios';
import {useEffect, useState} from 'react';
import Config from 'react-native-config';

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'city';

export default function useCityByLatitudeLongitude(
  latitude: number | undefined,
  longitude: number | undefined,
  refreshRequest: number | undefined,
) {
  const [city, setCity] = useState<City | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (!latitude || !longitude) {
      return;
    }

    axios
      .get(
        `${Config.API_BASE_URL}/api/v1/locale/city?latitude=${latitude}&longitude=${longitude}&token=${Config.API_TOKEN}`,
      )
      .then(response => {
        setCity(response.data as City);
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
          setCity(value ? JSON.parse(value) : null);
        } catch (e) {
          console.error(e);
        }
        setError(_error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [latitude, longitude, refreshRequest]);

  return {city, loading, error};
}

export interface City {
  id: number;
  name: string;
  state: string;
  country: string;
}
