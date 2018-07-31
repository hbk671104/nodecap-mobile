import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, ViewPropTypes } from 'react-native';

import Text from 'component/text';
import Touchable from 'component/uikit/touchable';
import { raised } from '../../../../utils/style';

const roiItem = ({ style, index, data, onPress }) => (
  <Touchable foreground onPress={onPress}>
    <View style={[styles.container, style]}>
      <View style={styles.icon.wrapper}>
        <Image
          resizeMode="contain"
          style={styles.icon.image}
          source={{ uri: data.logo_url }}
        />
      </View>
      <View style={styles.content.container}>
        <Text style={styles.content.title}>{data.name}</Text>
        <Text style={styles.content.subtitle}>
          <Text>{data.ROI}</Text> %
        </Text>
      </View>
      <Text style={styles.ranking}>#{index + 1}</Text>
    </View>
  </Touchable>
);

const styles = {
  container: {
    paddingLeft: 22,
    paddingRight: 18,
    paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    wrapper: {
      height: 50,
      width: 50,
      borderRadius: 25,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      ...raised,
    },
    image: {
      height: 35,
      width: 35,
      borderRadius: 17.5,
    },
  },
  content: {
    container: {
      flex: 1,
      marginLeft: 25,
    },
    title: {
      color: '#666666',
      fontSize: 14,
      fontWeight: 'bold',
    },
    subtitle: {
      color: '#000000',
      fontSize: 24,
      fontWeight: 'bold',
    },
  },
  ranking: {
    fontSize: 19,
    color: '#1890FF',
  },
};

roiItem.defaultProps = {
  onPress: () => null,
};

roiItem.propTypes = {
  style: ViewPropTypes.style,
  index: PropTypes.number,
  data: PropTypes.object,
  onPress: PropTypes.func,
};

export default roiItem;
