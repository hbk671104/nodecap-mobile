import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import R from 'ramda';

const statusDisplay = ({ status, dotStyle, titleStyle }) => {
  if (R.isNil(status)) {
    return <Text>--</Text>;
  }
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.dot.container,
          status === 0 && { backgroundColor: '#bfbfbf' },
          status === 1 && { backgroundColor: '#FAAD14' },
          status === 2 && { backgroundColor: '#F5222D' },
          status === 3 && { backgroundColor: '#1890FF' },
          status === 4 && { backgroundColor: '#7376F4' },
          status === 5 && { backgroundColor: '#E634CE' },
          status === 6 && { backgroundColor: '#1ECEA7' },
          dotStyle,
        ]}
      />
      <Text style={[styles.text, titleStyle]}>
        {status === 0 && '待初筛'}
        {status === 1 && '待上会'}
        {status === 2 && '已Pass'}
        {status === 3 && '待跟进'}
        {status === 4 && '确定意向'}
        {status === 5 && '待打币'}
        {status === 6 && '已打币'}
      </Text>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    container: {
      height: 7,
      width: 7,
      borderRadius: 3.5,
      backgroundColor: '#7376F4',
      marginRight: 6,
    },
  },
  text: {
    color: 'rgba(0, 0, 0, 0.65)',
    fontSize: 13,
  },
};

statusDisplay.propTypes = {
  status: PropTypes.number,
  dotStyle: PropTypes.object,
  titleStyle: PropTypes.object,
};

export default statusDisplay;
