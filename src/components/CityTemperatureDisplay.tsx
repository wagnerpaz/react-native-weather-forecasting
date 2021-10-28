import React, {useContext} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

import realisticIconMap from '../../res/realistic/relatisticIconMap';
import CityContext from '../contexts/CityContext';
import useCurrentWeather from '../sdk/hooks/useCurrentWeather';

const CityTemperatureDisplay: React.FC = () => {
  const {city, refreshRequests} = useContext(CityContext);
  const {weather} = useCurrentWeather(city?.id, refreshRequests);

  return (
    <Container>
      <IconRow>
        {weather?.data.icon && (
          <Icon
            source={realisticIconMap(weather.data.icon)}
            resizeMode="contain"
          />
        )}
        <Center>
          <CityName>{city?.name}</CityName>
          <Text>{weather?.data.condition}</Text>
          <Temperature>{weather?.data.temperature}°</Temperature>
        </Center>
      </IconRow>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

const IconRow = styled.View`
  flex: 1;
  flex-direction: row;
`;

const Icon = styled.Image`
  width: 100px;
  height: 100px;
  margin-left: -50px;
  margin-right: 20px;
  background-
`;

const CityName = styled.Text`
  font-size: 20px;
`;

const Center = styled.View`
  align-items: center;
  justify-content: center;
`;

const Temperature = styled.Text`
  font-size: 30px;
  font-weight: 600;
`;

export default CityTemperatureDisplay;
