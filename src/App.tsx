import React, {useCallback, useContext, useEffect} from 'react';
import {ScrollView, StatusBar, RefreshControl, Text} from 'react-native';
import styled from 'styled-components/native';

// ensure to import dotenv to be included in the package by webpack
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dotenv from 'dotenv';
import Config from 'react-native-config';

import CityTemperatureDisplay from './components/CityTemperatureDisplay';
import PositionContext, {PositionProvider} from './contexts/PositionContext';
import CityContext, {CityProvider} from './contexts/CityContext';
import Forecast7Days from './components/Forecast7Days';

const App = () => {
  return (
    <PositionProvider>
      <CityProvider>
        <Content />
      </CityProvider>
    </PositionProvider>
  );
};

const Content = () => {
  const {refresh: refreshPosition, error: positionError} =
    useContext(PositionContext);
  const {refresh: refreshCity, registered: registeredCity} =
    useContext(CityContext);

  const refresh = useCallback(() => {
    refreshPosition && refreshPosition();
    refreshCity && refreshCity();
  }, [refreshPosition, refreshCity]);

  console.log(Config.REFRESH_INTERVAL);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('will refresh');
      refresh();
    }, +Config.REFRESH_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [refresh]);

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refresh} />
        }>
        {positionError ? (
          <MarginsLarge>
            <ErrorText>
              It was not possible to retrieve your position. Verify if you
              granted permission and if your GPS is enabled.
            </ErrorText>
          </MarginsLarge>
        ) : !registeredCity ? (
          <MarginsLarge>
            <ErrorText>
              The current city you are in is not available on this system.
            </ErrorText>
          </MarginsLarge>
        ) : (
          <>
            <CityTemperatureDisplay />
            <Forecast7Days />
          </>
        )}
      </ScrollView>
      <Text>API_BASE_URL={Config.API_BASE_URL}</Text>
      <Text>API_TOKEN={Config.API_TOKEN}</Text>
      <Text>REFRESH_INTERVAL={Config.REFRESH_INTERVAL}</Text>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: #fff;
  flex: 1;
`;

const ErrorText = styled.Text`
  color: #ff0000;
  text-align: center;
`;

const MarginsLarge = styled.View`
  margin: 100px 50px;
`;

export default App;
