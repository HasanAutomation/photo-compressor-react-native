import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {View} from 'react-native';
import {RootStackParamList} from '../navigation/AppNavigator';

type RouteProps = NativeStackScreenProps<RootStackParamList, 'ImageEditor'>;

interface Props {
  route: RouteProps['route'];
}

const ImageEditor: FC<Props> = ({route}): JSX.Element => {
  console.log(route.params.imageUri);
  return <View></View>;
};

export default ImageEditor;
