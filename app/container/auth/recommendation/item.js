import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import R from 'ramda';

import Avatar from 'component/uikit/avatar';
import Icon from 'component/uikit/icon';
import Touchable from 'component/uikit/touchable';

const item = ({ data, selected, onPress }) => {
  const logo = R.pathOr('', ['icon'])(data);
  const title = R.pathOr('--', ['name'])(data);
  const focusable = R.pathOr(false, ['is_focusable'])(data);
  return (
    <View style={styles.container}>
      <Avatar size={45} source={{ uri: logo }} />
      <View style={styles.title.container}>
        <Text style={styles.title.text}>{title}</Text>
      </View>
      <Touchable
        style={[
          styles.selector.container,
          selected && { backgroundColor: '#1890FF' },
          focusable && { backgroundColor: '#1890FF', opacity: 0.6 },
        ]}
        disabled={focusable}
        onPress={onPress}
      >
        <Icon
          style={[
            styles.selector.title,
            (selected || focusable) && { color: 'white' },
          ]}
          name={selected || focusable ? 'checkmark' : 'add'}
        />
      </Touchable>
    </View>
  );
};

const styles = {
  container: {
    paddingVertical: 8,
    paddingLeft: 20,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    container: {
      flex: 1,
      marginLeft: 20,
    },
    text: {
      color: 'rgba(0, 0, 0, 0.85)',
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
  selector: {
    container: {
      height: 27.5,
      width: 50,
      borderRadius: 2,
      borderWidth: 1,
      borderColor: '#1890FF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: '#1890FF',
      fontSize: 24,
    },
  },
};

item.propTypes = {
  data: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onPress: PropTypes.func,
};

item.defaultProps = {
  selected: false,
  onPress: () => null,
};

export default item;
