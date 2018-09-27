import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import R from 'ramda';

const source = ({ route, focused }) => {
  switch (route) {
    case 'Fund':
      return focused
        ? require('asset/tabIcon/fund-sel.png')
        : require('asset/tabIcon/fund.png');
    case 'ProjectRepo':
      return focused
        ? require('asset/tabIcon/project_repo_highlight.png')
        : require('asset/tabIcon/project_repo.png');
    case 'PublicProject':
    case 'Onboard':
      return focused
        ? require('asset/tabIcon/homepage_highlight.png')
        : require('asset/tabIcon/homepage.png');
    case 'Portfolio':
    case 'Management':
      return focused
        ? require('asset/tabIcon/asset_highlight.png')
        : require('asset/tabIcon/asset.png');
    case 'NotificationCenter':
    case 'Trending':
      return focused
        ? require('asset/tabIcon/notification_center_selected.png')
        : require('asset/tabIcon/notification_center.png');
    case 'Self':
      return focused
        ? require('asset/tabIcon/me_highlight.png')
        : require('asset/tabIcon/me.png');
    case 'Favored':
      return focused
        ? require('asset/tabIcon/favor_highlight.png')
        : require('asset/tabIcon/favor.png');
    default:
      return null;
  }
};

const badgeTabIcon = ({ focused, route, badgeVisible }) => (
  <View>
    <Image source={source({ focused, route })} />
    {badgeVisible && (
      <View style={styles.badge.wrapper}>
        <View style={styles.badge.container} />
      </View>
    )}
  </View>
);

badgeTabIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
  route: PropTypes.string.isRequired,
};

const styles = {
  container: {},
  badge: {
    wrapper: {
      position: 'absolute',
      top: -3,
      right: -6,
    },
    container: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: '#F5222D',
    },
  },
};

export default connect(({ notification }, { route }) => {
  if (route === 'NotificationCenter') {
    return {
      badgeVisible: R.pathOr(false, ['badgeVisible'])(notification),
    };
  }
  return {
    badgeVisible: false,
  };
})(badgeTabIcon);
