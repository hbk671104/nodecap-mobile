import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { VictoryLine } from 'victory-native';

import Touchable from 'component/uikit/touchable';

class Header extends PureComponent {
  state = {
    timeSpan: '24h',
  };

  handleItemPress = timeSpan => () => {
    this.setState({ timeSpan });
  };

  render() {
    const { timeSpan } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.top.title}>
            10,320,293.22
            <Text style={styles.top.label}> CNY</Text>
          </Text>
        </View>
        <View style={styles.middle.container}>
          <View style={styles.middle.group.container}>
            <Text style={styles.middle.group.title}>今日盈亏</Text>
            <Text style={styles.middle.group.content}>72,631.12</Text>
          </View>
          <View style={styles.middle.divider} />
          <View style={styles.middle.group.container}>
            <Text style={styles.middle.group.title}>历史盈亏</Text>
            <Text style={styles.middle.group.content}>72,362,631.12</Text>
          </View>
        </View>
        <View style={styles.graph.container}>
          <Text style={{ color: 'white', fontSize: 24 }}>这里是个图</Text>
        </View>
        <View style={styles.bottom.container}>
          <View style={styles.bottom.group.container}>
            <Touchable borderless onPress={this.handleItemPress('24h')}>
              <View style={styles.bottom.group.wrapper}>
                <Text style={styles.bottom.group.title}>24H</Text>
                {timeSpan === '24h' && (
                  <View style={styles.bottom.group.indicator} />
                )}
              </View>
            </Touchable>
          </View>
          <View style={styles.bottom.group.container}>
            <Touchable borderless onPress={this.handleItemPress('w')}>
              <View style={styles.bottom.group.wrapper}>
                <Text style={styles.bottom.group.title}>周</Text>
                {timeSpan === 'w' && (
                  <View style={styles.bottom.group.indicator} />
                )}
              </View>
            </Touchable>
          </View>
          <View style={styles.bottom.group.container}>
            <Touchable borderless onPress={this.handleItemPress('m')}>
              <View style={styles.bottom.group.wrapper}>
                <Text style={styles.bottom.group.title}>月</Text>
                {timeSpan === 'm' && (
                  <View style={styles.bottom.group.indicator} />
                )}
              </View>
            </Touchable>
          </View>
          <View style={styles.bottom.group.container}>
            <Touchable borderless onPress={this.handleItemPress('y')}>
              <View style={styles.bottom.group.wrapper}>
                <Text style={styles.bottom.group.title}>年</Text>
                {timeSpan === 'y' && (
                  <View style={styles.bottom.group.indicator} />
                )}
              </View>
            </Touchable>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  top: {
    title: {
      fontSize: 36,
      color: 'white',
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    label: {
      fontSize: 13,
    },
  },
  middle: {
    container: {
      flexDirection: 'row',
      marginTop: 24,
    },
    divider: {
      width: 1,
      backgroundColor: '#2D9DF5',
    },
    group: {
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 12,
        color: 'white',
      },
      content: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 4,
      },
    },
  },
  graph: {
    container: {
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  bottom: {
    container: {
      flexDirection: 'row',
      paddingHorizontal: 24,
      marginTop: 24,
    },
    group: {
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      wrapper: {
        height: 20,
      },
      title: {
        fontSize: 13,
        color: 'white',
        fontWeight: 'bold',
      },
      indicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 3,
        backgroundColor: 'white',
        borderRadius: 1.5,
      },
    },
  },
};

export default Header;
