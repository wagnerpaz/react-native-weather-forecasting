import React from 'react';
import {Text, View} from 'react-native';
import useCityByLatitudeLongitude from '../sdk/hooks/useCityByLatitudeLongitude';

const CityTemperatureDisplay: React.FC<Props> = ({latitude, longitude}) => {
  const {city, loading} = useCityByLatitudeLongitude(latitude, longitude);

  return (
    <View>
      <Text>{city?.name}</Text>
    </View>
  );
};

interface Props {
  latitude: number;
  longitude: number;
}

export default CityTemperatureDisplay;
