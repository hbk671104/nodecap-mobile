import React from 'react';
import { SafeAreaView } from 'react-navigation';

const safeArea = props => (
  <SafeAreaView {...props} forceInset={{ top: 'never' }}>
    {props.children}
  </SafeAreaView>
);

export default safeArea;
