import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';

const deviceWidth = Dimensions.get('window').width;

const header = ({ style, data, onItemPress }) => (
  <View style={[styles.container, style]}>
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
  </View>
);

const styles = {
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 7,
  },
  item: {
    container: {
      width: deviceWidth / 4,
      height: 68,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
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
