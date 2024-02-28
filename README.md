# Weather Forecasting App

The app was developed using raw React Native, without Expo. The project was scaffolded by using `react-native init` using the template for TypeScript. It was tested only on Android, being possible that it does not work at all on iOS.

## Libs used

- [axios](https://github.com/axios/axios)
- [styled-components](https://github.com/styled-components/styled-components)
- react-native-geolocation-service
- async-storage
- react-native-config

## Features

- Current Weather info
- 7 days forecast with min and max temperature
- Refresh by sliding down
- Refresh automatically by an interval

## Instalation and running instructions

- Ensure that your Android development environment is all set
- Run `yarn` to install all dependencies
- Create a .env file at the root folder. Here is the file used by me:

```
API_BASE_URL=http://apiadvisor.climatempo.com.br
API_TOKEN=2251314f614b224998f34f7adb2fb4f6
REFRESH_INTERVAL=30000
```

- run `yarn android` to launch the app. If there's errors, try making the project with Android Studio and after that run the command again.
- As the Clima Tempo free API only allows one location, the above token utilizes Tubarão - SC. All other cities will throw an error.
- Make sure to adjust the geolocation config in your emulator to the correct city.

## Observations

Changing locations on the AVD emulator doesn't seem to affect the app directly (latitude and longitude doesn't change even with the setting of `maximumAge: 0`). My solution for this was setting up the Google Maps, allowing location in it, and after changing the city in the emulator, ensure that Maps know right where you are. After this react-native-geolocation service should update in the emulator.
