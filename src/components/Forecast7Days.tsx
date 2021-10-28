import React, {useContext} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

import realisticIconMap from '../../res/realistic/relatisticIconMap';

import CityContext from '../contexts/CityContext';
import useForecast15Days from '../sdk/hooks/useForecast15Days';
import formatDateBr from '../utils/formatDateBr';

const Forecast7Days: React.FC = () => {
  const {city, refreshRequests} = useContext(CityContext);
  const {forecast} = useForecast15Days(city?.id, refreshRequests);
  return (
    <Container>
      {forecast?.data.map(item => (
        <DayRow key={new Date(item.date).getTime()}>
          <Icon
            source={realisticIconMap(item.text_icon.icon.day)}
            resizeMode="contain"
          />
          <Text>{formatDateBr(new Date(item.date))}</Text>
          <SpaceBetween>
            <Text>Min: {item.temperature.min}°</Text>
            <Text>Max: {item.temperature.max}°</Text>
          </SpaceBetween>
        </DayRow>
      ))}
    </Container>
  );
};

const Container = styled.View`
  background-color: #fff;
`;

const DayRow = styled.View`
  flex-direction: row;
  height: 50px;
  align-items: center;
`;

const Icon = styled.Image`
  width: 40px;
  height: 40px;
  margin: 0 10px;
`;

const SpaceBetween = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
`;

export default Forecast7Days;
