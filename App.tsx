import React, {FC} from 'react';
import Home from './app/screens/Home';
import {View, Text} from 'react-native';
import AppNavigator from './app/navigation/AppNavigator';

interface Props {
  appName: string;
}

const App: FC<Props> = (props): JSX.Element | null => {
  return <AppNavigator />;
};

export default App;
