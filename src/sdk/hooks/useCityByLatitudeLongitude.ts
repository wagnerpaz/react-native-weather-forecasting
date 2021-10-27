import axios from 'axios';
import {useEffect, useState} from 'react';
import {API_BASE_URL, API_TOKEN} from 'react-native-dotenv';

export default function useCityByLatitudeLongitude(
  latitude: number,
  longitude: number,
) {
  const [city, setCity] = useState<City | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!latitude || !longitude) {
      return;
    }

    axios
      .get(
        `${API_BASE_URL}/api/v1/locale/city?latitude=${latitude}&longitude=${longitude}&token=${API_TOKEN}`,
      )
      .then(function (response) {
        setCity(response.data as City);
        setLoading(false);
      })
      .catch(function (error) {
        setCity(null);
        console.log(
          `${API_BASE_URL}/api/v1/locale/city?latitude=${latitude}&longitude=${longitude}&token=${API_TOKEN}`,
        );
        console.log('oii', error);
      })
      .finally(function () {
        setLoading(false);
      });
  }, [latitude, longitude]);

  return {city, loading};
}

export interface City {
  id: number;
  name: string;
  state: string;
  country: string;
}
