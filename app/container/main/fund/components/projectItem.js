import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import R from 'ramda';

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
  symbol,
}) => {
  const roi = R.pathOr('--', ['roi', symbol])(data);
  return (
    <Touchable foreground onPress={onPress}>
      <View style={[styles.container, style]}>
        <Avatar source={{ uri: data.logo_url || '' }} size={40} {...avatarProps} />
        <View style={[styles.content.container, contentContainerStyle]}>
          <Text style={[styles.content.title, titleStyle]}>{data.name}</Text>
          <Text style={[styles.content.subtitle, subtitleStyle]}>
            <Text disablePrefix>{roi}</Text> %
          </Text>
        </View>
        <Text style={[styles.ranking, rankingStyle]}>#{index + 1}</Text>
      </View>
    </Touchable>
  );
};

const styles = {
  container: {
    paddingLeft: 22,
    paddingRight: 18,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    container: {
      flex: 1,
      marginLeft: 36,
    },
    title: {
      color: 'rgba(0, 0, 0, 0.85)',
      fontSize: 14,
      fontWeight: 'bold',
    },
    subtitle: {
      color: 'rgba(0, 0, 0, 0.65)',
      fontSize: 17,
      fontWeight: 'bold',
      marginTop: 5,
    },
  },
  ranking: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.45)',
    alignSelf: 'flex-start',
  },
};

roiItem.defaultProps = {
  onPress: () => null,
  symbol: 'ETH',
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
  symbol: PropTypes.string,
};

export default roiItem;
