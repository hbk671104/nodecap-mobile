import React from 'react';
import { PropTypes } from 'prop-types';
import { View, Text, Image } from 'react-native';

import NodeCapIcon from 'component/icon/nodecap';
import Touchable from 'component/uikit/touchable';
import Gradient from 'component/uikit/gradient';

const header = ({ value, onSelect }) => (
  <View style={styles.container}>
    <Touchable borderless onPress={() => onSelect('balance')}>
      <View style={styles.group.container}>
        {value === 'balance' ? (
          <Gradient style={[styles.group.top, { borderWidth: 0, overflow: 'hidden' }]}>
            <NodeCapIcon name="qianbi" size={16} color="white" />
          </Gradient>
        ) : (
          <View style={styles.group.top}>
            <NodeCapIcon name="qianbi" size={16} color="#1890FF" />
          </View>
        )}
        <Text style={[styles.group.title, value !== 'balance' && { color: '#999999' }]}>
          盈余榜
        </Text>
      </View>
    </Touchable>
    <Touchable borderless onPress={() => onSelect('roi')}>
      <View style={styles.group.container}>
        {value === 'roi' ? (
          <Gradient style={[styles.group.top, { borderWidth: 0, overflow: 'hidden' }]}>
            <NodeCapIcon name="bingtu" size={16} color="white" />
          </Gradient>
        ) : (
          <View style={styles.group.top}>
            <NodeCapIcon name="bingtu" size={16} color="#1890FF" />
          </View>
        )}
        <Text style={[styles.group.title, value !== 'roi' && { color: '#999999' }]}>回报率榜</Text>
      </View>
    </Touchable>
    <Touchable borderless onPress={() => onSelect('price_change')}>
      <View style={styles.group.container}>
        {value === 'price_change' ? (
          <Gradient style={[styles.group.top, { borderWidth: 0, overflow: 'hidden' }]}>
            <NodeCapIcon name="qushi" size={14} color="white" />
          </Gradient>
        ) : (
          <View style={styles.group.top}>
            <NodeCapIcon name="qushi" size={14} color="#1890FF" />
          </View>
        )}
        <Text style={[styles.group.title, value !== 'price_change' && { color: '#999999' }]}>
          涨跌榜
        </Text>
      </View>
    </Touchable>
    <Touchable borderless onPress={() => onSelect('investment')}>
      <View style={styles.group.container}>
        {value === 'investment' ? (
          <Gradient style={[styles.group.top, { borderWidth: 0, overflow: 'hidden' }]}>
            <NodeCapIcon name="investment" size={14} color="white" />
          </Gradient>
        ) : (
          <View style={styles.group.top}>
            <NodeCapIcon name="investment" size={14} color="#1890FF" />
          </View>
        )}
        <Text style={[styles.group.title, value !== 'investment' && { color: '#999999' }]}>
          投资榜
        </Text>
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
    paddingHorizontal: 22,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  group: {
    container: {
      alignItems: 'center',
    },
    top: {
      height: 41,
      width: 41,
      borderRadius: 20.5,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#1890FF',
    },
    title: {
      fontSize: 14,
      color: '#333333',
      marginTop: 6.5,
    },
  },
};

export default header;
