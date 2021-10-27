import React, {useContext} from 'react';

import PositionContext from './PositionContext';
import useCityByLatitudeLongitude, {
  City,
} from '../sdk/hooks/useCityByLatitudeLongitude';

const CityContext = React.createContext<ContextValue>({
  city: undefined,
});

export const CityProvider: React.FC = ({children}) => {
  const {position} = useContext(PositionContext);
  const {city} = useCityByLatitudeLongitude(
    position?.coords.latitude,
    position?.coords.longitude,
  );
  return <CityContext.Provider value={{city}}>{children}</CityContext.Provider>;
};

export default CityContext;

interface ContextValue {
  city: City | null | undefined;
}
