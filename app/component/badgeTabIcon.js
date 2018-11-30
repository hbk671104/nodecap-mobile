import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import R from 'ramda';

import { NumberBadge } from 'component/badge';

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
    case 'MessageCenter':
      return focused
        ? require('asset/tabIcon/latest/message_selected.png')
        : require('asset/tabIcon/latest/message.png');
    default:
      return null;
  }
};

const badgeTabIcon = ({ focused, route, badge }) => (
  <View>
    <Image source={source({ focused, route })} />
    {badge > 0 && (
      <NumberBadge wrapperStyle={{ top: -5, right: -10 }} number={badge} />
    )}
  </View>
);

badgeTabIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
  route: PropTypes.string.isRequired,
};

export default connect(({ message_center }, { route }) => {
  if (route === 'MessageCenter') {
    return {
      badge:
        R.pipe(
          R.pathOr([], ['session', 'data']),
          R.reduce((accu, d) => accu + R.pathOr(0, ['unread'])(d), 0),
        )(message_center) +
        R.pipe(
          R.pathOr([], ['notification', 'data']),
          R.reduce((accu, d) => {
            if (!R.pathOr(false, ['is_read'])(d)) {
              return accu + 1;
            }
            return accu;
          }, 0),
        )(message_center),
    };
  }
  return {
    badge: 0,
  };
})(badgeTabIcon);
