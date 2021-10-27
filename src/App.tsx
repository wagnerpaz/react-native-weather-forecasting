import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import styled from 'styled-components/native';

// ensure to import dotenv to be included in the package by webpack
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dotenv from 'dotenv';

import CityTemperatureDisplay from './components/CityTemperatureDisplay';
import {PositionProvider} from './contexts/PositionContext';
import {CityProvider} from './contexts/CityContext';
import Forecast7Days from './components/Forecast7Days';

const App = () => {
  return (
    <PositionProvider>
      <CityProvider>
        <Container>
          <StatusBar barStyle="light-content" />
          <ScrollView>
            <CityTemperatureDisplay />
            <Forecast7Days />
          </ScrollView>
        </Container>
      </CityProvider>
    </PositionProvider>
  );
};

const Container = styled.SafeAreaView`
  background-color: #fff;
  flex: 1;
`;

export default App;
