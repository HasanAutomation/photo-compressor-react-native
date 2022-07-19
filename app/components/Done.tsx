import React, {FC} from 'react';
import LottieView from 'lottie-react-native';

interface Props {
  visible: boolean;
  onClose?: () => void;
}

const Done: FC<Props> = ({visible, onClose}): JSX.Element | null => {
  if (!visible) return null;

  return (
    <LottieView
      source={require('../source/done.json')}
      autoPlay
      loop={false}
      style={{
        width: 200,
        height: 200,
      }}
      onAnimationFinish={onClose}
    />
  );
};

export default Done;
