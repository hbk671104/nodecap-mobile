import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'component/uikit/icon';
import Touchable from 'component/uikit/touchable';

const item = ({ title, titleStyle, content, contentStyle, onPress }) => (
  <Touchable foreground onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.group}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
      <View style={styles.content.container}>
        <Text style={[styles.content.text, contentStyle]}>{content}</Text>
      </View>
      <Icon name="arrow-forward" size={16} color="rgba(0, 0, 0, 0.25)" />
    </View>
  </Touchable>
);

const styles = {
  container: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    paddingRight: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
  title: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.85)',
  },
  group: {
    flex: 1,
  },
  content: {
    container: {
      marginRight: 10,
    },
    text: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.65)',
    },
  },
};

item.defaultProps = {
  onPress: () => null,
  titleStyle: {},
  contentStyle: {},
};

item.propTypes = {
  title: PropTypes.string.isRequired,
  titleStyle: PropTypes.object,
  content: PropTypes.string,
  contentStyle: PropTypes.object,
  onPress: PropTypes.func,
};

export default item;
