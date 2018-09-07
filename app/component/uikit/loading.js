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
          <Text style={styles.title.text}>{title}</Text>
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
    text: {
      color: 'rgba(0, 0, 0, 0.85)',
    },
  },
};

loading.propTypes = {
  title: PropTypes.string,
};

export default loading;
