import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ViewPropTypes } from 'react-native';

const Badge = ({ value, displayDot, style, textStyle }) => {
  if (!value || value <= 0) {
    return null;
  }
  if (displayDot) {
    return <View style={[styles.container, styles.dotContainer, style]} />;
  }
  return (
    <View style={[styles.container, styles.text.container, style]}>
      <Text style={[styles.text.text, textStyle]}>
        {value <= 99 ? value : '99+'}
      </Text>
    </View>
  );
};

Badge.defaultProps = {
  displayDot: false,
};

Badge.propTypes = {
  value: PropTypes.number,
  style: ViewPropTypes.style,
  textStyle: PropTypes.object,
  displayDot: PropTypes.bool,
};

const styles = {
  container: {},
  dotContainer: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: '#FF2121',
  },
  text: {
    container: {
      height: 20,
      minWidth: 20,
      paddingHorizontal: 2,
      borderRadius: 10,
      backgroundColor: '#FF2121',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 11,
      color: 'white',
      fontWeight: 'bold',
    },
  },
};

export default Badge;
