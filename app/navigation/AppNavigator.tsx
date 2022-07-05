import {
  NavigationContainer,
  Theme,
  DefaultTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import Home from '../screens/Home';
import ImageEditor from '../screens/ImageEditor';

interface Props {}

export type RootStackParamList = {
  Home: undefined;
  ImageEditor: {imageUri: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const CUSTOM_THEME: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const AppNavigator: FC<Props> = (props): JSX.Element => {
  return (
    <NavigationContainer theme={CUSTOM_THEME}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ImageEditor" component={ImageEditor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
