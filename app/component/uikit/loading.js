import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator } from 'react-native';

const loading = props => {
  const { title } = props;
  return (
    <View style={[styles.container, props.style]}>
      <ActivityIndicator {...props} />
      {!!title && (
        <View style={styles.title.container}>
          <Text>{title}</Text>
        </View>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    container: {
      marginTop: 12,
    },
    text: {},
  },
};

loading.propTypes = {
  title: PropTypes.string,
};

export default loading;
