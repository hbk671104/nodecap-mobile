import React from 'react';
import { View } from 'react-native';
import R from 'ramda';

const paginationIndicator = ({ index, total }) => {
  const dots = R.repeat('', total).map((i, idx) => (
    <View
      key={`${idx}`}
      style={[styles.dot, idx === index ? styles.dotActive : {}]}
    />
  ));
  return <View style={styles.pagination}>{dots}</View>;
};

const styles = {
  dot: {
    width: 10,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255, 255, 255, .4)',
    marginRight: 4,
  },
  dotActive: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
};

export default paginationIndicator;
