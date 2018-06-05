import React from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Text, ViewPropTypes } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import StatusBar from './uikit/statusBar';
import Gradient from './uikit/gradient';

const navBar = ({ style, wrapperStyle, barStyle, renderTitle, renderBottom, gradient }) => {
  const WrapperComp = gradient ? Gradient : View;
  return (
    <WrapperComp style={style}>
      <StatusBar barStyle={barStyle} />
      <Animated.View style={[styles.container, wrapperStyle]}>
        <View style={styles.wrapper}>{renderTitle && renderTitle()}</View>
      </Animated.View>
      {renderBottom && renderBottom()}
    </WrapperComp>
  );
};

navBar.defaultProps = {
  barStyle: 'light-content',
  gradient: false,
};

navBar.propTypes = {
  // style: ViewPropTypes.style,
  // wrapperStyle: ViewPropTypes.style,
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
