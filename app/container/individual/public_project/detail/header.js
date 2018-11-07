import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import R from 'ramda';

import NavBar from 'component/navBar';
import MiscTag from 'component/public_project/misc_tag';
import Tag from 'component/public_project/tag';
import Label from 'component/public_project/label';
import Purpose from 'component/public_project/purpose';
import Price from 'component/public_project/price';
import HotnodeIndex from 'component/public_project/hotnode_index';
import AvatarGroup from 'component/public_project/avatar_group';

import Shimmer from 'component/shimmer';

const header = ({
  style,
  loading,
  titleStyle,
  portfolio: data,
  base_symbol,
  can_calculate,
  onInvitedPress,
  onExplanationPress,
}) => {
  const name = R.pathOr('--', ['name'])(data);
  const token = R.pipe(
    R.pathOr('--', ['symbol']),
    R.toUpper,
  )(data);
  const purpose = R.pathOr([], ['purpose'])(data);

  return (
    <View>
      <NavBar back disableStatusBar iconStyle={{ color: 'white' }} />
      <View style={[styles.container, style]}>
        <View style={styles.top.container}>
          <View style={{ flex: 1 }}>
            <Shimmer animating={loading}>
              <Text style={[styles.top.title, titleStyle]}>
                {name}
                <Text style={styles.top.subtitle}>（{token}）</Text>
              </Text>
            </Shimmer>
            <Label data={data} />
            <Price
              base_symbol={base_symbol}
              data={data}
              can_calculate={can_calculate}
            />
          </View>
          <AvatarGroup data={data} onExplanationPress={onExplanationPress} />
        </View>
        <Tag data={data} />
      </View>
      <MiscTag
        style={[R.isEmpty(purpose) && { borderBottomWidth: 0 }]}
        data={data}
      />
      <Purpose data={data} />
      <View>
        <View style={styles.divider} />
        <HotnodeIndex data={data} onInvitedPress={onInvitedPress} />
        <View style={styles.divider} />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#1890FF',
    paddingHorizontal: 12,
  },
  top: {
    container: {
      flexDirection: 'row',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 25,
      color: 'white',
    },
    subtitle: {
      fontSize: 12,
    },
  },
  divider: {
    backgroundColor: '#F5F5F5',
    height: 8,
  },
};

header.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  avatarWrapperStyle: PropTypes.object,
};

header.defaultProps = {
  loading: false,
};

export default header;
