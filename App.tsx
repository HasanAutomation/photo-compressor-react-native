import React, {FC} from 'react';
import Home from './app/screens/Home';
import {View, Text} from 'react-native';

interface Props {
  appName: string;
}

const App: FC<Props> = (props): JSX.Element | null => {
  return <Home />;
};

export default App;
