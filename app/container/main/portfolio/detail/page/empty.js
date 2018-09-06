import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';

const empty = ({ image, title, subtitle }) => (
  <View style={styles.container}>
    <Image source={image} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

const styles = {
  container: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1890FF',
    marginTop: 18,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.45)',
    marginTop: 14,
  },
};

empty.propTypes = {
  image: PropTypes.number,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

empty.defaultProps = {
  image: require('asset/project/unmatched.png'),
};

export default empty;
