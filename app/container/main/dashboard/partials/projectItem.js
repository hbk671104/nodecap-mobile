import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';

import Text from 'component/text';
import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';

const roiItem = ({
  style,
  contentContainerStyle,
  titleStyle,
  subtitleStyle,
  rankingStyle,
  index,
  data,
  onPress,
  avatarProps,
}) => (
  <Touchable foreground onPress={onPress}>
    <View style={[styles.container, style]}>
      <Avatar source={{ uri: data.logo_url }} size={50} {...avatarProps} />
      <View style={[styles.content.container, contentContainerStyle]}>
        <Text style={[styles.content.title, titleStyle]}>{data.name}</Text>
        <Text style={[styles.content.subtitle, subtitleStyle]}>
          <Text disablePrefix>{data.ROI}</Text> %
        </Text>
      </View>
      <Text style={[styles.ranking, rankingStyle]}>#{index + 1}</Text>
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
  contentContainerStyle: ViewPropTypes.style,
  titleStyle: PropTypes.object,
  subtitleStyle: PropTypes.object,
  rankingStyle: PropTypes.object,
  avatarProps: PropTypes.object,
  index: PropTypes.number,
  data: PropTypes.object,
  onPress: PropTypes.func,
};

export default roiItem;
