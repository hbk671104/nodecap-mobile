import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  LayoutAnimation,
  StyleSheet,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';
import StatusBar from './uikit/statusBar';

@connect()
class NavBar extends PureComponent {
  static propTypes = {
    disableStatusBar: PropTypes.bool,
    showBottomBorder: PropTypes.bool,
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
    titleStyle: PropTypes.object,
    titleContainerStyle: PropTypes.object,
    contentContainerStyle: PropTypes.object,
    iconStyle: PropTypes.object,
    backAction: PropTypes.func,
  };

  static defaultProps = {
    disableStatusBar: false,
    showBottomBorder: false,
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
      LayoutAnimation.configureNext({
        duration: 300,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
        update: { type: LayoutAnimation.Types.easeInEaseOut },
      });
    }
  }

  handleBackAction = () => {
    if (this.props.backAction) {
      this.props.backAction();
      return;
    }
    this.props.dispatch(NavigationActions.back());
  };

  render() {
    const {
      style,
      wrapperStyle,
      contentContainerStyle,
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
      titleStyle,
      titleContainerStyle,
      iconStyle,
      disableStatusBar,
      showBottomBorder,
    } = this.props;
    return (
      <View style={[style, gradient && { backgroundColor: '#1890FF' }]}>
        {!disableStatusBar && <StatusBar barStyle={barStyle} />}
        <Animated.View
          style={[
            styles.container,
            wrapperStyle,
            hidden && styles.hidden.container,
            showBottomBorder && {
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: '#E9E9E9',
            },
          ]}
        >
          <View
            style={[
              styles.wrapper.container,
              contentContainerStyle,
              hidden && styles.hidden.wrapper,
            ]}
          >
            {renderContent ? (
              renderContent()
            ) : (
              <View style={styles.wrapper.content}>
                <Animated.View
                  style={[styles.title.container, titleContainerStyle]}
                >
                  {!!title && (
                    <Text
                      style={[
                        styles.title.text,
                        { color: gradient ? 'white' : '#333333' },
                        titleStyle,
                      ]}
                      numberOfLines={1}
                    >
                      {title}
                    </Text>
                  )}
                  {renderTitle && renderTitle()}
                </Animated.View>
                <View style={styles.group.left}>
                  {back && (
                    <Touchable
                      hitSlop={styles.back.hitSlop}
                      borderless
                      onPress={this.handleBackAction}
                    >
                      <Icon
                        style={[
                          {
                            fontSize: 26,
                            color: gradient ? 'white' : '#333333',
                          },
                          iconStyle,
                        ]}
                        name="arrow-back"
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
      </View>
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
      paddingHorizontal: 0,
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
  back: {
    hitSlop: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
  },
};

export default NavBar;
