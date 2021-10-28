import React, {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';

import Geolocation, {GeoError} from 'react-native-geolocation-service';

const PositionContext = React.createContext<ContextValue>({
  position: undefined,
  refresh: undefined,
  error: null,
});

export const PositionProvider: React.FC = ({children}) => {
  const [position, setPosition] = useState<Geolocation.GeoPosition>();
  const [refreshRequests, setRefreshRequests] = useState(0);
  const [error, setError] = useState<GeoError | null>(null);

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
            setError(null);
          },
          _error => {
            setError(_error);
          },
          {enableHighAccuracy: false, timeout: 15000, maximumAge: 0},
        );
      }
    });
  }, [setPosition, refreshRequests]);

  return (
    <PositionContext.Provider
      value={{
        position,
        refresh: () => setRefreshRequests(rr => rr + 1),
        error,
      }}>
      {children}
    </PositionContext.Provider>
  );
};

export default PositionContext;

interface ContextValue {
  position: Geolocation.GeoPosition | undefined;
  refresh: (() => void) | undefined;
  error: GeoError | null;
}
