import React from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Text, ViewPropTypes } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';

import StatusBar from './uikit/statusBar';
import { raised } from '../utils/style';

const navBar = ({ style, barStyle, renderTitle, renderBottom, gradient }) => {
  const Comp = gradient ? LinearGradient : Animated.View;
  return (
    <View>
      <Comp
        style={[styles.container, style]}
        // start={{ x: 0.5, y: 0.0 }}
        // end={{ x: 0.5, y: 1.0 }}
        colors={['#35C3FF', '#1890FF']}
      >
        <StatusBar barStyle={barStyle} />
        <View style={styles.wrapper}>{renderTitle && renderTitle()}</View>
      </Comp>
      {renderBottom && renderBottom()}
    </View>
  );
};

navBar.defaultProps = {
  barStyle: 'light-content',
  gradient: false,
};

navBar.propTypes = {
  barStyle: PropTypes.string,
  renderTitle: PropTypes.func,
  renderBottom: PropTypes.func,
  gradient: PropTypes.bool,
};

const styles = {
  container: {
    height: 44 + getStatusBarHeight(true),
    justifyContent: 'flex-end',
  },
  wrapper: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export const navBarHeight = styles.container.height;
export default navBar;
