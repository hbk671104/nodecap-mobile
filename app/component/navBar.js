import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, LayoutAnimation, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';
import StatusBar from './uikit/statusBar';
import Gradient from './uikit/gradient';

@connect()
class NavBar extends Component {
  static propTypes = {
    barStyle: PropTypes.string,
    renderContent: PropTypes.func,
    renderLeft: PropTypes.func,
    renderRight: PropTypes.func,
    renderTitle: PropTypes.func,
    renderBottom: PropTypes.func,
    hidden: PropTypes.bool,
    bottomHidden: PropTypes.bool,
    gradient: PropTypes.bool,
    back: PropTypes.bool,
    title: PropTypes.string,
  };

  static defaultProps = {
    barStyle: 'light-content',
    hidden: false,
    bottomHidden: false,
    gradient: false,
    back: false,
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.hidden !== this.props.hidden ||
      nextProps.bottomHidden !== this.props.bottomHidden
    ) {
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
      renderContent,
      renderTitle,
      renderLeft,
      renderRight,
      renderBottom,
      hidden,
      bottomHidden,
      gradient,
      back,
      title,
    } = this.props;
    const WrapperComp = gradient ? Gradient : View;
    return (
      <WrapperComp style={style}>
        <StatusBar barStyle={barStyle} />
        <Animated.View
          style={[
            styles.container,
            wrapperStyle,
            hidden && styles.hidden.container,
          ]}
        >
          <View
            style={[styles.wrapper.container, hidden && styles.hidden.wrapper]}
          >
            {renderContent ? (
              renderContent()
            ) : (
              <View style={styles.wrapper.content}>
                <View style={styles.title.container}>
                  {!!title && (
                    <Text style={styles.title.text} numberOfLines={1}>
                      {title}
                    </Text>
                  )}
                  {renderTitle && renderTitle()}
                </View>
                <View style={styles.group.left}>
                  {back && (
                    <Touchable borderless onPress={this.handleBackAction}>
                      <Icon
                        name="arrow-back"
                        size={26}
                        color={gradient ? 'white' : '#333333'}
                      />
                    </Touchable>
                  )}
                  {renderLeft && renderLeft()}
                </View>
                <View style={styles.group.right}>
                  {renderRight && renderRight()}
                </View>
              </View>
            )}
          </View>
        </Animated.View>
        {renderBottom && !bottomHidden && renderBottom()}
      </WrapperComp>
    );
  }
}

export const navBarHeight = 44;
export const statusBarHeight = getStatusBarHeight(true);
export const realBarHeight = navBarHeight + statusBarHeight;

const styles = {
  container: {
    height: realBarHeight,
    justifyContent: 'flex-end',
  },
  wrapper: {
    container: {
      height: navBarHeight,
    },
    content: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
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
      paddingHorizontal: 36,
    },
    text: {
      fontSize: 17,
      color: 'white',
      fontWeight: 'bold',
    },
  },
  hidden: {
    container: {
      height: statusBarHeight,
    },
    wrapper: {
      height: 0,
      opacity: 0,
    },
  },
};

export default NavBar;
