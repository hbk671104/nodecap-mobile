import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ViewPropTypes } from 'react-native';

const group = ({ style, icon, title, children }) => (
  <View style={[styles.container, style]}>
    <View style={styles.group}>
      {!!icon && <Image style={styles.image} source={icon} />}
      {!!title && <Text style={styles.title}>{title}</Text>}
    </View>
    {children}
  </View>
);

group.propTypes = {
  style: ViewPropTypes.style,
  icon: PropTypes.number,
  title: PropTypes.string,
};

const styles = {
  container: {
    paddingLeft: 22,
    paddingRight: 12,
    paddingVertical: 10,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginRight: 12,
  },
  title: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default group;
