import React, {useContext, useMemo, useState} from 'react';

import PositionContext from './PositionContext';
import useCityByLatitudeLongitude, {
  City,
} from '../sdk/hooks/useCityByLatitudeLongitude';
import useRegisteredCities from '../sdk/hooks/useRegisteredCities';

const CityContext = React.createContext<ContextValue>({
  city: undefined,
  registered: undefined,
  refresh: undefined,
  refreshRequests: undefined,
});

export const CityProvider: React.FC = ({children}) => {
  const {position} = useContext(PositionContext);

  const [refreshRequests, setRefreshRequests] = useState(0);

  const {registeredCities, loading: loadingRegisteredCities} =
    useRegisteredCities(refreshRequests);
  const {city, loading: loadingCity} = useCityByLatitudeLongitude(
    position?.coords.latitude,
    position?.coords.longitude,
    refreshRequests,
  );

  const registered = useMemo(
    () => registeredCities?.locales.includes(city?.id as number),
    [registeredCities, city],
  );

  if (loadingRegisteredCities || loadingCity) {
    return null;
  }

  return (
    <CityContext.Provider
      value={{
        city,
        registered,
        refresh: () => setRefreshRequests(rr => rr + 1),
        refreshRequests,
      }}>
      {children}
    </CityContext.Provider>
  );
};

export default CityContext;

interface ContextValue {
  city: City | null | undefined;
  registered: boolean | undefined;
  refresh: (() => void) | undefined;
  refreshRequests: number | undefined;
}
