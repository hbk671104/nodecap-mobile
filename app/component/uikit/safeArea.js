import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const safeArea = props => {
  if (ifIphoneX()) {
    return (
      <SafeAreaView {...props} forceInset={{ top: 'never' }}>
        {props.children}
      </SafeAreaView>
    );
  }
  return <View {...props}>{props.children}</View>;
};

export default safeArea;
