import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import R from 'ramda';

import Badge from 'component/badge';

const source = ({ route, focused }) => {
  switch (route) {
    case 'Fund':
      return focused
        ? require('asset/tabIcon/latest/fund-sel.png')
        : require('asset/tabIcon/latest/fund.png');
    case 'ProjectRepo':
      return focused
        ? require('asset/tabIcon/latest/project_sel.png')
        : require('asset/tabIcon/latest/project.png');
    case 'PublicProject':
    case 'Onboard':
      return focused
        ? require('asset/tabIcon/latest/home_sel.png')
        : require('asset/tabIcon/latest/home.png');
    case 'Portfolio':
    case 'Management':
      return focused
        ? require('asset/tabIcon/latest/investment_sel.png')
        : require('asset/tabIcon/latest/investment.png');
    // case 'NotificationCenter':
    // case 'Trending':
    //   return focused
    //     ? require('asset/tabIcon/notification_center_selected.png')
    //     : require('asset/tabIcon/notification_center.png');
    case 'Self':
      return focused
        ? require('asset/tabIcon/latest/mine_sel.png')
        : require('asset/tabIcon/latest/mine.png');
    case 'Favored':
      return focused
        ? require('asset/tabIcon/latest/attention_sel.png')
        : require('asset/tabIcon/latest/attention.png');
    case 'HotnodeIndex':
      return focused
        ? require('asset/tabIcon/latest/hotnode_index_selected.png')
        : require('asset/tabIcon/latest/hotnode_index.png');
    default:
      return null;
  }
};

const badgeTabIcon = ({ focused, route, badgeVisible }) => (
  <View>
    <Image source={source({ focused, route })} />
    {badgeVisible && <Badge />}
  </View>
);

badgeTabIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
  route: PropTypes.string.isRequired,
};

const styles = {
  container: {},
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
