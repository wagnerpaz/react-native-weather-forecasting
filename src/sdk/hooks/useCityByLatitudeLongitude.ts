import axios from 'axios';
import {useEffect, useState} from 'react';
// due to how react-native-dotenv works with webpack it's needed to ts-ignore the next line
// @ts-ignore
import {API_BASE_URL, API_TOKEN} from 'react-native-dotenv';

export default function useCityByLatitudeLongitude(
  latitude: number | undefined,
  longitude: number | undefined,
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
        `${API_BASE_URL}/api/v1/locale/city?latitude=${latitude}&longitude=${longitude}&token=${API_TOKEN}`,
      )
      .then(response => {
        console.log(response.data, latitude, longitude);
        setCity(response.data as City);
        setLoading(false);
      })
      .catch(_error => {
        setCity(null);
        setError(_error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [latitude, longitude]);

  return {city, loading, error};
}

export interface City {
  id: number;
  name: string;
  state: string;
  country: string;
}
