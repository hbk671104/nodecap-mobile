import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';
import { shadow } from '../../../utils/style';

const header = ({ style, data, onItemPress }) => (
  <ScrollView
    style={[styles.container, style]}
    contentContainerStyle={styles.content}
    horizontal
  >
    {R.map(i => {
      return (
        <Touchable foreground onPress={onItemPress}>
          <View style={styles.item.container}>
            <Avatar size={28} raised={false} innerRatio={1} />
            <Text style={styles.item.title}>标准共识</Text>
          </View>
        </Touchable>
      );
    })(data)}
  </ScrollView>
);

const styles = {
  container: {
    height: 98,
    backgroundColor: 'white',
  },
  content: {
    alignItems: 'center',
  },
  item: {
    container: {
      width: 110,
      height: 68,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      marginLeft: 12,
      ...shadow,
    },
    title: {
      fontSize: 12,
      marginTop: 8,
    },
  },
};

header.propTypes = {
  style: PropTypes.object,
  data: PropTypes.array.isRequired,
  onItemPress: PropTypes.func,
};

header.defaultProps = {
  onItemPress: () => null,
};

export default header;
