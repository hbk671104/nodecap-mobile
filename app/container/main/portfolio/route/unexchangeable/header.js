import React from 'react';
import { PropTypes } from 'prop-types';
import { View, Text } from 'react-native';

import Touchable from 'component/uikit/touchable';

const header = ({ value, onSelect }) => (
  <View style={styles.container}>
    <Touchable borderless onPress={() => onSelect('0/1/2/3/4/5/6')}>
      <View style={styles.group.container}>
        <Text
          style={[
            styles.group.title.normal,
            value === '0/1/2/3/4/5/6' && styles.group.title.highlight,
          ]}
        >
          全部
        </Text>
        {value === '0/1/2/3/4/5/6' && <View style={styles.group.line} />}
      </View>
    </Touchable>
    <Touchable borderless onPress={() => onSelect('4')}>
      <View style={styles.group.container}>
        <Text
          style={[
            styles.group.title.normal,
            value === '4' && styles.group.title.highlight,
          ]}
        >
          确定意向
        </Text>
        {value === '4' && <View style={styles.group.line} />}
      </View>
    </Touchable>
    <Touchable borderless onPress={() => onSelect('5')}>
      <View style={styles.group.container}>
        <Text
          style={[
            styles.group.title.normal,
            value === '5' && styles.group.title.highlight,
          ]}
        >
          待打币
        </Text>
        {value === '5' && <View style={styles.group.line} />}
      </View>
    </Touchable>
    <Touchable borderless onPress={() => onSelect('6')}>
      <View style={styles.group.container}>
        <Text
          style={[
            styles.group.title.normal,
            value === '6' && styles.group.title.highlight,
          ]}
        >
          已打币
        </Text>
        {value === '6' && <View style={styles.group.line} />}
      </View>
    </Touchable>
  </View>
);

header.propTypes = {
  value: PropTypes.string,
  onSelect: PropTypes.func,
};

const styles = {
  container: {
    paddingLeft: 5,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  group: {
    container: {
      marginHorizontal: 17,
      paddingBottom: 10,
    },
    title: {
      highlight: {
        fontSize: 14,
        color: '#1890FF',
        fontWeight: 'bold',
      },
      normal: {
        color: '#666666',
        fontWeight: 'normal',
      },
    },
    line: {
      position: 'absolute',
      height: 3,
      borderRadius: 2,
      backgroundColor: '#1890FF',
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
};

export default header;
