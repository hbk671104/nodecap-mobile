import React from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';
import moment from 'moment';

import Touchable from 'component/uikit/touchable';
import common_styles from './style';

const item = ({ data, onInstitutionItemPress }) => {
  const title = R.pathOr('--', ['title'])(data);
  const date = R.pathOr('--', ['published_at'])(data);
  return (
    <View key={data.id} style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.bottom.container}>
        <Text style={styles.bottom.subtitle}>
          节点研究中心
          {'  '}
          {moment(date).format('MM-DD')}
          {'  '}
          <Text
            style={{ color: '#1890FF' }}
            onPress={() => onInstitutionItemPress(data)}
          >
            查看研报
          </Text>
        </Text>
      </View>
    </View>
  );
};

const report = ({
  reports,
  onInstitutionReportPress,
  onInstitutionItemPress,
}) => {
  return (
    <View>
      {!R.isEmpty(reports) &&
        R.pipe(
          R.take(3),
          R.map(r => item({ data: r, onInstitutionItemPress })),
        )(reports)}
      <Touchable onPress={onInstitutionReportPress}>
        <View style={styles.button.container}>
          <Text style={styles.button.title}>查看全部研究报告</Text>
        </View>
      </Touchable>
    </View>
  );
};

const styles = {
  ...common_styles,
  container: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  bottom: {
    container: {
      marginTop: 10,
    },
    subtitle: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
    },
  },
  button: {
    container: {
      marginTop: 6,
      height: 40,
      backgroundColor: '#F8F8F8',
      borderRadius: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#1890FF',
    },
  },
};

export default report;
