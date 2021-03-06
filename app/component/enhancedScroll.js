import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const enhancedScroll = props => (
  <KeyboardAwareScrollView
    {...props}
    enableOnAndroid
    keyboardDismissMode="interactive"
    keyboardShouldPersistTaps="handled"
  >
    {props.children}
  </KeyboardAwareScrollView>
);

export default enhancedScroll;
