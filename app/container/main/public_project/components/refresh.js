import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Platform, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';

class Refresh extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    loading: false,
    onPress: () => null,
  };

  render() {
    const { style, loading, onPress } = this.props;
    return (
      <Animated.View style={[styles.container, style]}>
        <Touchable
          style={styles.content}
          disabled={loading}
          hitSlop={styles.hitSlop}
          onPress={onPress}
        >
          <Animatable.View
            animation={loading ? 'rotate' : undefined}
            easing="linear"
            iterationCount="infinite"
            useNativeDriver
          >
            <Icon style={styles.icon} name="refresh" />
          </Animatable.View>
        </Touchable>
      </Animated.View>
    );
  }
}

const styles = {
  icon: {
    fontSize: 20,
    color: 'white',
  },
  hitSlop: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  },
  container: {
    position: 'absolute',
    right: 12,
    bottom: 60,
    backgroundColor: '#1890ff',
    borderRadius: 25,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 3, width: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  content: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Refresh;
