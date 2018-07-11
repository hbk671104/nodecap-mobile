import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';
import Icon from 'component/uikit/icon';
import { shadow } from '../../../utils/style';

const header = ({ user, style, onPress }) => {
  const company = R.pathOr('', ['companies', 0, 'name'])(user);
  return (
    <Touchable style={[styles.wrapper, style]} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.group}>
          <Avatar size={50} innerRatio={1} source={{ uri: user.avatar_url }} />
          <View style={styles.content.container}>
            <Text style={styles.content.title}>{user.realname}</Text>
            <Touchable style={styles.content.company.container}>
              <Text style={styles.content.company.title}>
                {company} <Icon name="arrow-forward" size={10} color="white" />
              </Text>
            </Touchable>
          </View>
        </View>
        <Icon name="arrow-forward" size={20} color="rgba(0, 0, 0, 0.25)" />
      </View>
    </Touchable>
  );
};

export const headerHeight = 100;

const styles = {
  wrapper: {},
  container: {
    height: headerHeight,
    backgroundColor: 'white',
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 15,
    ...shadow,
  },
  group: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    container: {
      flex: 1,
      marginHorizontal: 15,
      alignItems: 'flex-start',
    },
    title: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    company: {
      container: {
        marginTop: 6,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        backgroundColor: '#1890FF',
      },
      title: {
        color: 'white',
        fontSize: 11,
        paddingHorizontal: 4,
      },
    },
  },
};

header.defaultProps = {
  onPress: () => null,
  onCompanyPress: () => null,
};

header.propTypes = {
  user: PropTypes.object,
  onPress: PropTypes.func,
  onCompanyPress: PropTypes.func,
};

export default header;
