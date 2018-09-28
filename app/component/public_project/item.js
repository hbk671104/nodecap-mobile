import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';

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

const publicProjectItem = ({ style, data, onPress }) => {
  const icon = R.pathOr('', ['icon'])(data);
  const project_name = R.pathOr('--', ['name'])(data);
  const status = R.pathOr('', ['finance_status'])(data);
  const category = R.pathOr([], ['category'])(data);
  const description = R.pathOr('--', ['description'])(data);

  return (
    <Touchable foreground onPress={onPress}>
      <View style={[styles.container, style]}>
        <Avatar
          size={50}
          source={
            R.isEmpty(icon)
              ? require('asset/project/project_logo_default.png')
              : { uri: icon }
          }
        />
        <View style={styles.content.container}>
          <View style={styles.content.top.container}>
            <View style={styles.content.top.title.container}>
              <Text style={styles.content.top.title.text} numberOfLines={2}>
                {project_name}
              </Text>
            </View>
            {!R.isEmpty(status) && (
              <Text
                style={[
                  styles.content.top.status,
                  status === '未设定' && { color: 'rgba(0, 0, 0, 0.45)' },
                  status === '进行中' && { color: '#09AC32' },
                  status === '已结束' && { color: 'rgba(0, 0, 0, 0.45)' },
                ]}
              >
                {status}
              </Text>
            )}
          </View>
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
          <View style={styles.content.subtitle.container}>
            <Text numberOfLines={2} style={styles.content.subtitle.text}>
              {description}
            </Text>
          </View>
        </View>
      </View>
    </Touchable>
  );
};

const styles = {
  container: {
    padding: 12,
    flexDirection: 'row',
  },
  content: {
    container: {
      marginLeft: 15,
      flex: 1,
    },
    top: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      title: {
        container: {
          flex: 1,
        },
        text: {
          color: 'rgba(0, 0, 0, 0.85)',
          fontWeight: 'bold',
          fontSize: 16,
        },
      },
      status: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1890FF',
      },
    },
    tag: {
      wrapper: {
        marginTop: 6,
        flexDirection: 'row',
        flexWrap: 'wrap',
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
    subtitle: {
      container: {
        marginTop: 10,
      },
      text: {
        fontSize: 12,
        lineHeight: 18,
        color: 'rgba(0, 0, 0, 0.45)',
      },
    },
  },
};

publicProjectItem.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

publicProjectItem.defaultProps = {
  onPress: () => null,
};

export default publicProjectItem;
