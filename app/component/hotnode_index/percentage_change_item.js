import React from 'react';
import { View, Text } from 'react-native';

const percentage_change_item = ({ style, textStyle, percentage_change }) => {
  const minus_percentage = percentage_change < 0;
  return (
    <View
      style={[
        styles.container,
        minus_percentage && { backgroundColor: '#F55454' },
        style,
      ]}
    >
      <Text style={[styles.text, textStyle]}>
        {minus_percentage ? `${percentage_change}` : `+${percentage_change}`}%
      </Text>
    </View>
  );
};

const styles = {
  container: {
    height: 20,
    backgroundColor: '#09AC32',
    borderRadius: 10,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
};

export default percentage_change_item;
