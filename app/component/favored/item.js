import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';
import R from 'ramda';

import Avatar from 'component/uikit/avatar';
import Touchable from 'component/uikit/touchable';

const colorMap = [
  {
    textColor: '#1890FF',
    backgroundColor: '#E5F3FF',
  },
  {
    textColor: '#FF7600',
    backgroundColor: '#FFE9D6',
  },
  {
    textColor: '#A663E0',
    backgroundColor: '#ECD7FE',
  },
  {
    textColor: '#09AC32',
    backgroundColor: '#BCF4CA',
  },
];

const favoredItem = ({ style, data, onPress, onFavorPress }) => {
  const icon = R.pathOr('', ['icon'])(data);
  const project_name = R.pathOr('--', ['name'])(data);
  const status = R.pathOr('--', ['finance_status'])(data);
  const category = R.pathOr([], ['category'])(data);
  const description = R.pathOr('--', ['description'])(data);

  return (
    <Touchable foreground onPress={onPress}>
      <View style={[styles.container, style]}>
        <Avatar
          size={45}
          source={
            R.isEmpty(icon)
              ? require('asset/project/project_logo_default.png')
              : { uri: icon }
          }
        />
        <View style={styles.content.container}>
          <Text style={styles.content.title}>{project_name}</Text>
          <View style={styles.content.tag.wrapper}>
            {R.addIndex(R.map)((t, i) => {
              const textColor = R.pathOr('#939393', [i, 'textColor'])(colorMap);
              const backgroundColor = R.pathOr('#E2E2E2', [
                i,
                'backgroundColor',
              ])(colorMap);
              return (
                <View
                  key={`${i}`}
                  style={[styles.content.tag.container, { backgroundColor }]}
                >
                  <Text
                    style={[styles.content.tag.title, { color: textColor }]}
                  >
                    {t || '--'}
                  </Text>
                </View>
              );
            })(category)}
          </View>
          <Text style={styles.content.subtitle} numberOfLines={1}>
            {description}
          </Text>
        </View>
        <View style={styles.end.container}>
          <Text
            style={[
              styles.end.status,
              status === '进行中' && { color: '#09AC32' },
              status === '已结束' && { color: 'rgba(0, 0, 0, 0.45)' },
            ]}
          >
            {status}
          </Text>
          <Touchable
            foreground
            style={styles.end.favor.container}
            onPress={onFavorPress}
          >
            <Text style={styles.end.favor.number}>
              <Image source={require('asset/favored/favored_star.png')} /> 1273
            </Text>
          </Touchable>
        </View>
      </View>
    </Touchable>
  );
};

export const itemHeight = 90;
const styles = {
  container: {
    height: itemHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 10,
    backgroundColor: 'white',
  },
  content: {
    container: {
      flex: 1,
      marginLeft: 20,
      justifyContent: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    subtitle: {
      marginTop: 8,
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
    },
    tag: {
      wrapper: {
        marginTop: 8,
        flexDirection: 'row',
      },
      container: {
        height: 19,
        paddingHorizontal: 3,
        borderRadius: 2,
        marginRight: 8,
        justifyContent: 'center',
      },
      title: {
        fontSize: 11,
      },
    },
  },
  end: {
    container: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginLeft: 6,
    },
    status: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1890FF',
    },
    favor: {
      container: {
        marginTop: 8,
        height: 23,
        width: 60,
        borderRadius: 2,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
      },
      number: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.65)',
      },
    },
  },
};

favoredItem.propType = {
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  onFavorPress: PropTypes.func,
};

favoredItem.defaultProps = {
  onPress: () => null,
  onFavorPress: () => null,
};

export default favoredItem;
