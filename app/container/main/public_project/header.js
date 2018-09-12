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
    {R.addIndex(R.map)((i, index) => {
      return (
        <Touchable key={index} foreground onPress={() => onItemPress(i)}>
          <View style={styles.item.container}>
            <Avatar
              size={28}
              raised={false}
              innerRatio={1}
              source={i.logo_url ? { uri: i.logo_url } : null}
            />
            <Text style={styles.item.title}>{i.name}</Text>
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
    paddingHorizontal: 7,
  },
  item: {
    container: {
      width: 110,
      height: 68,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      margin: 5,
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
