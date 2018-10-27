import * as React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const group = ({ style, title, renderTitle, renderRight, children }) => (
  <View style={[styles.container, style]}>
    <View style={styles.top.container}>
      {renderTitle ? (
        renderTitle()
      ) : (
        <Text style={styles.top.title}>{title}</Text>
      )}
      {renderRight && renderRight()}
    </View>
    {children}
  </View>
);

const styles = {
  container: {
    paddingTop: 15,
    backgroundColor: 'white',
  },
  top: {
    container: {
      paddingHorizontal: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 16,
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: 'bold',
    },
  },
};

group.propTypes = {
  title: PropTypes.string,
};

export default group;
