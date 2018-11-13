import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Flex } from 'antd-mobile';
import PropTypes from 'prop-types';
import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';

class WeeklyReportItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Flex justify="between" align="start">
          <Flex align="start">
            <View style={{
              marginRight: 8,
              marginTop: 3,
            }}
            >
              <Image
                source={require('asset/weekly_report/report_icon.png')}
                style={{
                  width: 16,
                  height: 16,
                }}
              />
            </View>
            <View>
              <Text style={styles.title}>
                Zilliqa项目周报-十月第一周
              </Text>
              <Text style={styles.date}>
                2018-10-01
              </Text>
            </View>
          </Flex>
          <View style={{
            marginTop: 5,
          }}
          >
            <Touchable>
              <Image
                source={require('asset/weekly_report/report_preview.png')}
                style={{
                  width: 15,
                  height: 14,
                }}
              />
            </Touchable>
          </View>
        </Flex>
        <Flex style={styles.buttons}>
          <Touchable style={{ flex: 1 }}>
            <Flex justify="center">
              <Text style={styles.buttonText}>删除</Text>
            </Flex>
          </Touchable>
          <View style={{
            height: 16,
            borderRightColor: '#E5E5E5',
            borderRightWidth: 0.5,
          }}
          />
          <Touchable style={{ flex: 1 }}>
            <Flex justify="center">
              <Text style={styles.buttonText}>编辑</Text>
            </Flex>
          </Touchable>
        </Flex>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: 'white',
    marginBottom: 8,
    paddingTop: 14.5,
    paddingHorizontal: 12.5,
  },
  title: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    letterSpacing: 0.19,
  },
  date: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.45)',
    letterSpacing: 0.14,
    marginTop: 8,
    marginBottom: 11,
  },
  buttons: {
    height: 38,
    borderTopWidth: 0.5,
    borderTopColor: '#E9E9E9',
  },
  buttonText: { fontSize: 13, color: 'rgba(0,0,0,0.65)', letterSpacing: 0.16, textAlign: 'right' },
};
WeeklyReportItem.propTypes = {};
WeeklyReportItem.defaultProps = {};

export default WeeklyReportItem;
