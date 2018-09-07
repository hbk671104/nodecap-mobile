import React from 'react';
import { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import { shadow } from '../../../../utils/style';

const tabbar = props => (
  <ScrollableTabBar
    {...props}
    style={styles.container}
    activeTextColor="#1890FF"
    inactiveTextColor="rgba(0, 0, 0, 0.65)"
    underlineStyle={styles.underline}
  />
);

const styles = {
  container: {
    height: 51,
    backgroundColor: 'white',
    borderBottomWidth: 0,
    ...shadow,
  },
  underline: {
    height: 0,
  },
};

export default tabbar;
