import React from 'react';
import { Alert } from 'react-native';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

import { useCart } from '../../hooks/cart';

interface ButtonProps {
  id: string;
  title: string;
}

const LongPressButton: React.FC<ButtonProps> = ({
  id,
  title,
  children,
  ...rest
}) => {
  const { removeFromCart } = useCart();

  return (
    <LongPressGestureHandler
      {...rest}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          Alert.alert(
            'Você tem certeza que deseja deletar o produto ?',
            `${title}`,
            [
              {
                text: 'Cancel',
                onPress: () => '',
                style: 'cancel',
              },
              { text: 'OK', onPress: () => removeFromCart(id) },
            ],
            { cancelable: true },
          );
        }
      }}
      minDurationMs={800}
    >
      {children}
    </LongPressGestureHandler>
  );
};

export default LongPressButton;
