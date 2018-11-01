import React, { Component } from 'react';
import { View, Animated, Text } from 'react-native';
import { connect } from 'react-redux';
import { compose, withState, withProps } from 'recompose';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import Modal from 'component/modal';

// Partials
import Description from './page/description';
import Header from './header';
import styles from './style';

@global.bindTrack({
  page: '项目编辑详情',
  name: 'App_MyProjectDetailOperation',
})
@connect(({ project_create }) => ({
  portfolio: R.pathOr({}, ['current'])(project_create),
}))
@compose(
  withState('currentScrollY', 'setCurrentScrollY', 0),
  withState('animateY', 'setAnimatedY', new Animated.Value(0)),
  withState('explanationVisible', 'setExplanationVisible', false),
  withProps(({ animateY }) => ({
    navBarOpacityRange: animateY.interpolate({
      inputRange: [0, 160],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    backgroundOpacityRange: animateY.interpolate({
      inputRange: [0, 160],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  })),
)
export default class MyProjectDetail extends Component {
  componentDidMount() {
    this.props.track('进入');
  }

  handleEditPress = routeName => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName,
      }),
    );
  };

  render() {
    const {
      portfolio,
      currentScrollY,
      navBarOpacityRange,
      backgroundOpacityRange,
    } = this.props;
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.wrapper, { opacity: backgroundOpacityRange }]}
        />
        <Animated.View
          style={[
            styles.navBar.wrapper,
            { opacity: navBarOpacityRange, zIndex: 50 },
          ]}
        >
          <NavBar
            back
            barStyle={currentScrollY > 80 ? 'dark-content' : 'light-content'}
            style={styles.navBar.container}
            title={R.path(['name'])(portfolio)}
          />
        </Animated.View>
        <Animated.ScrollView
          ref={ref => {
            this.scroll = ref;
          }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: this.props.animateY },
                },
              },
            ],
            {
              useNativeDriver: true,
              listener: event => {
                const offsetY = event.nativeEvent.contentOffset.y;
                this.props.setCurrentScrollY(offsetY);
              },
            },
          )}
        >
          <Header
            {...this.props}
            onInvitedPress={() => null}
            onExplanationPress={() => this.props.setExplanationVisible(true)}
          />
          <View style={{ backgroundColor: 'white' }}>
            <Description {...this.props} />
          </View>
        </Animated.ScrollView>
        <Modal
          useNativeDriver
          hideModalContentWhileAnimating
          isVisible={this.props.explanationVisible}
          style={{
            alignSelf: 'center',
          }}
          onBackdropPress={() => this.props.setExplanationVisible(false)}
        >
          <View style={styles.explanation.container}>
            <View style={styles.explanation.content.container}>
              <Text style={styles.explanation.content.title}>项目得分</Text>
              <Text style={styles.explanation.content.text}>
                主要以该项目信息完整度为考量。内容越丰富得分越高，曝光机会越多。若您是项目成员，认领后可进行信息完善
              </Text>
            </View>
            <Touchable
              style={styles.explanation.bottom.container}
              onPress={() =>
                this.props.setExplanationVisible(false, this.onPressClaimCoin)
              }
            >
              <Text style={styles.explanation.bottom.text}>认领并完善</Text>
            </Touchable>
          </View>
        </Modal>
      </View>
    );
  }
}
