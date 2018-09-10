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
  const trend = R.pathOr({}, ['coin_news'])(data);
  if (R.isEmpty(trend)) {
    return null;
  }

  const logo_url = R.pathOr('', ['logo_url'])(trend);
  const title = R.pathOr('--', ['title'])(trend);
  const project_name = R.pathOr('--', ['project_name'])(trend);
  const type = R.pathOr([], ['type'])(trend);
  const subtitle = R.pathOr('--', ['subtitle'])(trend);
  const push_at = R.pathOr('--', ['push_at'])(trend);

  return (
    <Touchable foreground onPress={onPress(trend.id)}>
      <View style={[styles.container, style]}>
        <Avatar
          size={50}
          source={
            R.isEmpty(logo_url)
              ? require('asset/project/project_logo_default.png')
              : { uri: logo_url }
          }
        />
        <View style={styles.content.container}>
          <View style={styles.content.top.container}>
            <View style={styles.content.top.title.container}>
              <Text style={styles.content.top.title.text} numberOfLines={2}>
                Zilliqa
              </Text>
            </View>
            <Text style={styles.content.top.status}>即将开始</Text>
          </View>
          <View style={styles.content.tag.wrapper}>
            {R.addIndex(R.map)((t, i) => {
              const textColor = R.pathOr('#939393', [i, 'textColor'])(colorMap);
              const backgroundColor = R.pathOr('#E2E2E2', [
                i,
                'backgroundColor',
              ])(colorMap);
              const tag_name = R.pathOr('--', ['name'])(t);
              return (
                <View
                  key={`${i}`}
                  style={[styles.content.tag.container, { backgroundColor }]}
                >
                  <Text
                    style={[styles.content.tag.title, { color: textColor }]}
                  >
                    {tag_name}
                  </Text>
                </View>
              );
            })(type)}
          </View>
          <View style={styles.content.subtitle.container}>
            <Text numberOfLines={2} style={styles.content.subtitle.text}>
              {subtitle}
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
