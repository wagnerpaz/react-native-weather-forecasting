import axios from 'axios';
import {useEffect, useState} from 'react';
// due to how react-native-dotenv works with webpack it's needed to ts-ignore the next line
// @ts-ignore
import {API_BASE_URL, API_TOKEN} from 'react-native-dotenv';

export default function useForecast15Days(cityId: number | undefined) {
  const [forecast, setForecast] = useState<Forecast | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (!cityId) {
      return;
    }

    axios
      .get(
        `${API_BASE_URL}/api/v1/forecast/locale/${cityId}/days/15?token=${API_TOKEN}`,
      )
      .then(response => {
        setForecast(response.data as Forecast);
        setLoading(false);
      })
      .catch(_error => {
        setForecast(null);
        setError(_error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cityId]);

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
