import React, {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

const PositionContext = React.createContext<ContextValue>({
  position: undefined,
});

export const PositionProvider: React.FC = ({children}) => {
  const [position, setPosition] = useState<Geolocation.GeoPosition>();

  useEffect(() => {
    //react-native-geolocation-service assumes that the location permissions is granted on Android
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
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
    <PositionContext.Provider value={{position}}>
      {children}
    </PositionContext.Provider>
  );
};

export default PositionContext;

interface ContextValue {
  position: Geolocation.GeoPosition | undefined;
}
