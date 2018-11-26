import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Flex } from 'antd-mobile';
import PropTypes from 'prop-types';
import NavBar from 'component/navBar';
import moment from 'moment';
import Touchable from 'component/uikit/touchable';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

@connect()
class WeeklyReportItem extends Component {
  render() {
    const { data = {}, coin } = this.props;
    return (
      <View style={styles.container}>
        <Touchable onPress={() => {
          this.props.dispatch(
            NavigationActions.navigate({
              routeName: 'ReportPage',
              params: {
                title: data.title,
                uri: data.link,
                data,
                coin,
              },
            }),
          );
        }}
        >
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
                  {data.title}
                </Text>
                <Text style={styles.date}>
                  {moment.unix(data.created_at).format('YYYY-MM-DD')}
                </Text>
              </View>
            </Flex>
          </Flex>
        </Touchable>
        <Flex style={styles.buttons}>
          <Touchable style={{ flex: 1 }} onPress={() => this.props.onDelete(data.id)}>
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
              <Text style={styles.buttonText} onPress={() => this.props.onEdit(data)}>编辑</Text>
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
              <Text style={styles.buttonText} onPress={() => this.props.onShare(data)}>分享</Text>
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
