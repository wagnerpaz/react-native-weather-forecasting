import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PermissionsAndroid,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Geolocation from 'react-native-geolocation-service';

// ensure to import dotenv to be included in the package by webpack
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dotenv from 'dotenv';

import CityTemperatureDisplay from './components/CityTemperatureDisplay';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [position, setPosition] = useState<Geolocation.GeoPosition>();

  useEffect(() => {
    //react-native-geolocation-service assumes that the location permissions is granted on Android
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Location Permission request',
        message:
          'We need access to your location for showing accurate climate information.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    ).then(granted => {
      if (granted) {
        Geolocation.getCurrentPosition(
          _position => {
            setPosition(_position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  }, [setPosition]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <CityTemperatureDisplay
          latitude={position?.coords.latitude}
          longitude={position?.coords.longitude}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
