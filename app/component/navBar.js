import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, LayoutAnimation, Platform } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import Touchable from 'component/uikit/touchable';
import StatusBar from './uikit/statusBar';
import Gradient from './uikit/gradient';

@connect()
class NavBar extends Component {
  static propTypes = {
    barStyle: PropTypes.string,
    renderLeft: PropTypes.func,
    renderRight: PropTypes.func,
    renderTitle: PropTypes.func,
    renderBottom: PropTypes.func,
    hidden: PropTypes.bool,
    gradient: PropTypes.bool,
    back: PropTypes.bool,
  };

  static defaultProps = {
    barStyle: 'light-content',
    hidden: false,
    gradient: false,
    back: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.hidden !== this.props.hidden) {
      LayoutAnimation.easeInEaseOut();
    }
  }

  handleBackAction = () => {
    this.props.dispatch(NavigationActions.back());
  };

  render() {
    const {
      style,
      wrapperStyle,
      barStyle,
      renderTitle,
      renderLeft,
      renderRight,
      renderBottom,
      hidden,
      gradient,
      back,
    } = this.props;
    const WrapperComp = gradient ? Gradient : View;
    return (
      <WrapperComp style={style}>
        <StatusBar barStyle={barStyle} />
        <Animated.View style={[styles.container, wrapperStyle, hidden && styles.hidden.container]}>
          <View style={[styles.wrapper, hidden && styles.hidden.wrapper]}>
            <View style={styles.title.container}>{renderTitle && renderTitle()}</View>
            <View style={styles.group.left}>
              {back && (
                <Touchable borderless onPress={this.handleBackAction}>
                  <Icon
                    name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                    size={26}
                    color={gradient ? 'white' : '#333333'}
                  />
                </Touchable>
              )}
              {renderLeft && renderLeft()}
            </View>
            <View style={styles.group.right}>{renderRight && renderRight()}</View>
          </View>
        </Animated.View>
        {renderBottom && renderBottom()}
      </WrapperComp>
    );
  }
}

export const navBarHeight = Platform.OS === 'ios' ? 44 : 56;

const styles = {
  container: {
    height: navBarHeight + getStatusBarHeight(true),
    justifyContent: 'flex-end',
  },
  wrapper: {
    height: navBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  group: {
    left: {
      position: 'absolute',
      left: 12,
      top: 0,
      bottom: 0,
      flexDirection: 'row',
      alignItems: 'center',
    },
    right: {
      position: 'absolute',
      right: 12,
      top: 0,
      bottom: 0,
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  title: {
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  hidden: {
    container: {
      height: getStatusBarHeight(true),
    },
    wrapper: {
      height: 0,
      opacity: 0,
    },
  },
};

export default NavBar;
