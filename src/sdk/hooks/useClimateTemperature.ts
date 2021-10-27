import axios from 'axios';
import {useEffect, useState} from 'react';
// due to how react-native-dotenv works with webpack it's needed to ts-ignore the next line
// @ts-ignore
import {API_BASE_URL, API_TOKEN} from 'react-native-dotenv';

export default function useClimateTemperature(
  cityId: number | undefined,
  latitude: number | undefined,
  longitude: number | undefined,
) {
  const [climateTemperature, setClimateTemperature] =
    useState<ClimateTemperature | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (!cityId || !latitude || !longitude) {
      return;
    }

    axios
      .get(
        `${API_BASE_URL}/api/v1/climate/temperature/locale/${cityId}&token=${API_TOKEN}`,
      )
      .then(response => {
        setClimateTemperature(response.data as ClimateTemperature);
        console.log(response.data);
        setLoading(false);
      })
      .catch(_error => {
        console.log(
          `${API_BASE_URL}/api/v1/climate/temperature/locale/${cityId}&token=${API_TOKEN}`,
          error,
        );
        setClimateTemperature(null);
        setError(_error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cityId, latitude, longitude]);

  return {climateTemperature, loading, error};
}

export interface ClimateTemperature {
  id: number;
  name: string;
  state: string;
  country: string;
  data: ClimateTemperatureData;
}

export interface ClimateTemperatureData {
  last_year: ClimateTemperatureMinMax;
  normal: ClimateTemperatureMinMax;
  forecast: ClimateTemperatureMinMax;
}

export interface ClimateTemperatureMinMax {
  min: number;
  max: number;
}
