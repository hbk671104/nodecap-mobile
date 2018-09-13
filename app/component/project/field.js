import React from 'react';
import { Flex } from 'antd-mobile';
import { View, Text } from 'react-native';
import R from 'ramda';

import { borderColor } from 'component/uikit/color';

export const renderField = ({ name, value, style, titleStyle, valueStyle }) => {
  if (R.isNil(value) || R.isEmpty(value)) {
    return null;
  }
  return (
    <View style={[styles.field, style]}>
      <Flex align="center">
        <Text style={[styles.fieldName, titleStyle]}>{name}</Text>
        <Text style={[styles.fieldValue, valueStyle]}>{value}</Text>
      </Flex>
    </View>
  );
};

const styles = {
  field: {
    marginLeft: 22,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: borderColor,
    justifyContent: 'center',
    paddingRight: 15,
  },
  fieldName: {
    color: '#999999',
  },
  fieldValue: {
    flex: 1,
    color: '#333333',
    marginLeft: 15,
    textAlign: 'right',
  },
};
