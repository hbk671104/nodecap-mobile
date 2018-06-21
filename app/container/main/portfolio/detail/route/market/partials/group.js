import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ViewPropTypes } from 'react-native';

const group = ({ style, title, subtitle, children }) => (
  <View style={[styles.container, style]}>
    <View>
      {!!title && <Text style={styles.title}>{title}</Text>}
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
    {children}
  </View>
);

group.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

const styles = {
  container: {
    paddingLeft: 22,
    paddingRight: 12,
    paddingVertical: 12,
  },
  title: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#999999',
    fontSize: 10,
    marginTop: 6,
  },
};

export default group;
