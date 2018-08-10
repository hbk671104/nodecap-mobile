import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const title = ({ data }) => (
  <Text
    style={[
      styles.base,
      data.id === 1 && { color: '#1890FF' },
      data.id === 2 && { color: '#09AC32' },
      data.id === 3 && { color: '#FF7600' },
      data.id === 4 && { color: '#4D59F1' },
      data.id === 5 && { color: '#F54750' },
    ]}
  >
    {data.name}
  </Text>
);

const styles = {
  base: {
    fontWeight: 'bold',
    fontSize: 11,
  },
};

title.propTypes = {
  data: PropTypes.object,
};

export default title;
