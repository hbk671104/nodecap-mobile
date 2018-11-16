import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flex } from 'antd-mobile';
import R from 'ramda';
import styles from './style';
import Touchable from 'component/uikit/touchable';
import { NavigationActions } from 'react-navigation';

class weeklyReports extends Component {
  render() {
    const data = R.pipe(R.pathOr([], ['portfolio', 'weekly']))(this.props);
    if (!data.length) {
      return null;
    }
    return (
      <View style={styles.fieldGroup}>
        <Text style={[styles.title, styles.site]}>项目进度</Text>
        <View style={{ marginTop: 5 }}>
          {R.map(m => (
            <Flex
              key={m.id}
              justify="between"
              style={{
                height: 44,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: '#E9E9E9',
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'rgba(0,0,0,0.85)',
                    letterSpacing: 0.16,
                  }}
                >
                  {m.title}
                </Text>
              </View>
              <View style={{ flexShrink: 0 }}>
                <Touchable
                  borderless
                  onPress={() => {
                    this.props.track('点击项目周报查看按钮');
                    this.props.dispatch(
                      NavigationActions.navigate({
                        routeName: 'WebPage',
                        params: {
                          title: m.title,
                          uri: m.link,
                        },
                      }),
                    );
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#1890FF',
                      letterSpacing: 0.16,
                    }}
                  >
                    查看
                  </Text>
                </Touchable>
              </View>
            </Flex>
          ))(data)}
        </View>
      </View>
    );
  }
}

weeklyReports.propTypes = {};
weeklyReports.defaultProps = {};

export default weeklyReports;
