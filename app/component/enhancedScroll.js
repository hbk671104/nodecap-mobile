import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const enhancedScroll = props => (
  <KeyboardAwareScrollView {...props} enableOnAndroid>
    {props.children}
  </KeyboardAwareScrollView>
);

export default enhancedScroll;
