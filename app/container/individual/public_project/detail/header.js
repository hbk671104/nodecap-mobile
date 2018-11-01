import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import R from 'ramda';

import Avatar from 'component/uikit/avatar';
import NavBar from 'component/navBar';
import MiscTag from 'component/public_project/misc_tag';
import Tag from 'component/public_project/tag';
import Label from 'component/public_project/label';
import Purpose from 'component/public_project/purpose';
import Price from 'component/public_project/price';

const header = ({
  style,
  titleStyle,
  portfolio: data,
  base_symbol,
  can_calculate,
}) => {
  const name = R.pathOr('--', ['name'])(data);
  const token = R.pipe(
    R.pathOr('--', ['symbol']),
    R.toUpper,
  )(data);
  const logo = R.pathOr('', ['icon'])(data);

  return (
    <View>
      <NavBar back disableStatusBar iconStyle={{ color: 'white' }} />
      <View style={[styles.container, style]}>
        <View style={styles.top.container}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.top.title, titleStyle]}>
              {name}
              <Text style={styles.top.subtitle}>（{token}）</Text>
            </Text>
            <Label data={data} />
          </View>
          <Avatar source={{ uri: logo }} />
        </View>
        <Price
          base_symbol={base_symbol}
          data={data}
          can_calculate={can_calculate}
        />
        <Tag data={data} />
      </View>
      <MiscTag data={data} />
      {R.compose(
        R.not,
        R.isEmpty,
        R.pathOr([], ['purpose']),
      )(data) && <Purpose portfolio={data} />}
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
  bottom: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 30,
      color: 'white',
    },
    subtitle: {
      fontWeight: 'bold',
      fontSize: 14,
      color: 'white',
    },
    content: {
      fontWeight: '300',
      fontSize: 10,
      color: 'white',
    },
    description: {
      fontSize: 12,
      color: 'white',
      lineHeight: 17,
    },
  },
  tag: {
    wrapper: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    container: {
      height: 19,
      paddingHorizontal: 3,
      borderRadius: 2,
      marginLeft: 8,
      justifyContent: 'center',
      borderColor: 'white',
      borderWidth: StyleSheet.hairlineWidth,
    },
    title: {
      fontSize: 11,
      color: 'white',
    },
  },
  vipIcon: {
    position: 'absolute',
    right: 0,
    bottom: 8,
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
