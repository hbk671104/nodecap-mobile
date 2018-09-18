import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';

import AuthButton from 'component/auth/button';

const empty = ({ image, title, action }) => (
  <View style={styles.container}>
    <Image source={image} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    {!!action && (
      <View style={styles.button.container}>
        <AuthButton disabled={false} onPress={action} />
      </View>
    )}
  </View>
);

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
  },
  image: {
    marginTop: 144,
    alignSelf: 'center',
  },
  title: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.65)',
    marginTop: 32,
    alignSelf: 'center',
  },
  button: {
    container: {
      marginHorizontal: 20,
      marginTop: 42,
    },
  },
};

empty.propTypes = {
  image: PropTypes.number,
  title: PropTypes.string,
  action: PropTypes.func,
};

empty.defaultProps = {
  image: require('asset/empty/permission_denied.png'),
  title: '暂无权限',
};

export default empty;
