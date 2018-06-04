import React from 'react';
import { StatusBar } from 'react-native';

export const setStatusBar = (barStyle, animated = false) => {
  StatusBar.setBarStyle(barStyle, animated);
};

const statusBar = props => (
  <StatusBar
    {...props}
    animated={false}
    translucent
    backgroundColor="transparent"
  />
);

export default statusBar;
