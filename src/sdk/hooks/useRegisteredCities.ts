import axios from 'axios';
import {useEffect, useState} from 'react';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'registered_cities';

export default function useRegisteredCities(
  refreshRequest: number | undefined,
) {
  const [registeredCities, setRegisteredCities] =
    useState<RegisteredCities | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .get(
        `${Config.API_BASE_URL}/api-manager/user-token/${Config.API_TOKEN}/locales`,
      )
      .then(response => {
        setRegisteredCities(response.data as RegisteredCities);
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
          setRegisteredCities(value ? JSON.parse(value) : null);
        } catch (e) {
          console.error(e);
        }
        setError(_error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refreshRequest]);

  return {registeredCities, loading, error};
}

export interface RegisteredCities {
  locales: number[];
}
