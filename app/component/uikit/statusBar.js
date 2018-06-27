import React from 'react';
import { StatusBar, Platform } from 'react-native';

export const setStatusBar = (barStyle, animated = false) => {
  StatusBar.setBarStyle(barStyle, animated);
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('transparent', animated);
    StatusBar.setTranslucent(true);
  }
};

const statusBar = props => (
  <StatusBar {...props} animated={false} translucent backgroundColor="transparent" />
);

export default statusBar;
