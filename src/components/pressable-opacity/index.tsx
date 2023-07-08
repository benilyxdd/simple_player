import React from 'react';
import { Animated, GestureResponderEvent, Pressable } from 'react-native';
import { Style } from 'twrnc/dist/esm/types';

import tw from '@src/config/twrnc';
import useAnimation from '@src/hooks/useAnimation';

interface PressableOpacityProps {
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  children?: React.ReactNode;
  style?: Style; // twrnc
  disabled?: boolean;
}

const PressableOpacity: React.FC<PressableOpacityProps> = ({
  children,
  onPress,
  style,
  disabled,
}) => {
  const { fadeIn, fadeOut, opacityValue } = useAnimation();

  return (
    <Pressable
      disabled={disabled}
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      style={[tw`relative`, { ...style }]}
      onPress={onPress}>
      {children}
      <Animated.View
        style={[
          tw`absolute top-0 bottom-0 left-0 right-0 bg-gray-100`,
          { opacity: opacityValue },
        ]}
      />
    </Pressable>
  );
};

export default PressableOpacity;
