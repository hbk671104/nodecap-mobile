import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';

const empty = ({ image, title }) => (
  <View style={styles.container}>
    <Image source={image} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  image: {
    marginTop: 144,
  },
  title: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.45)',
    marginTop: 32,
  },
};

empty.propTypes = {
  image: PropTypes.number,
  title: PropTypes.string,
};

empty.defaultProps = {
  image: require('asset/empty/permission_denied.png'),
  title: '暂无权限',
};

export default empty;
