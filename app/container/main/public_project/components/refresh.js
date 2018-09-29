import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
    const { loading, onPress } = this.props;
    return (
      <Touchable disabled={loading} hitSlop={styles.hitSlop} onPress={onPress}>
        <Animatable.View
          animation={loading ? 'rotate' : undefined}
          easing="linear"
          iterationCount="infinite"
          useNativeDriver
        >
          <Icon style={styles.icon} name="refresh" />
        </Animatable.View>
      </Touchable>
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
};

export default Refresh;
