import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';

import { shadow } from '../../../../../utils/style';

const empty = ({ title, image, onAddPress }) => (
  <View style={styles.container}>
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      {onAddPress && (
        <Text style={styles.add} onPress={onAddPress}>
          立即添加
        </Text>
      )}
    </View>
    {!!image && (
      <View style={styles.image.container}>
        <Image source={image} />
      </View>
    )}
  </View>
);

const styles = {
  container: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 12,
    ...shadow,
  },
  wrapper: {
    alignItems: 'center',
  },
  title: {
    color: 'rgba(0, 0, 0, 0.45)',
  },
  add: {
    color: '#1890FF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  image: {
    container: {
      position: 'absolute',
      bottom: 14,
      right: 18,
    },
  },
};

empty.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.number,
  onAddPress: PropTypes.func,
};

export default empty;
