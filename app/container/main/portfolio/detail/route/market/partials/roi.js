import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ViewPropTypes } from 'react-native';
import * as R from 'ramda';
import { shadow } from '../../../../../../../utils/style';

const roi = ({ style, data }) => (
  <View style={[styles.container, style]}>
    {R.keys(data).map((k) => {
      const item = data[k];
      return (
        <View key={k} style={styles.group.container}>
          <View style={styles.group.inner}>
            <Text style={styles.title}>{k}</Text>
            <Text style={styles.subtitle}>{item.count.to}%</Text>
          </View>
        </View>
      );
    })}
  </View>
);

roi.propTypes = {
  style: ViewPropTypes.style,
  data: PropTypes.object,
};

const styles = {
  container: {
    flexDirection: 'row',
    marginTop: 15,
  },
  group: {
    container: {
      flex: 1,
      padding: 5,
    },
    inner: {
      ...shadow,
      borderRadius: 4,
      height: 65,
      backgroundColor: 'white',
      justifyContent: 'center',
      paddingLeft: 6,
    },
  },
  title: {
    color: '#666666',
    fontSize: 12,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#1890FF',
    fontSize: 14,
    marginTop: 6,
  },
};

export default roi;
