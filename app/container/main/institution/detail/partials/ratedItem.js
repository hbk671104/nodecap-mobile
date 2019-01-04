import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import R from 'ramda';
import { Flex } from 'antd-mobile';
import Communications from 'react-native-communications';

import Avatar from 'component/uikit/avatar';
import Touchable from 'component/uikit/touchable';

class RatedItem extends PureComponent {
  handlePress = () => {
    const { data } = this.props;
    const grade_url = R.path(['grade_url'])(data);
    Communications.web(grade_url);
  };

  render() {
    const { style, data, showTopBorder } = this.props;

    const icon = R.pathOr('', ['icon'])(data);
    const project_name = R.pathOr('--', ['name'])(data);
    const grade_name = R.pathOr('', ['grade_name'])(data);
    const description = R.pathOr('--', ['description'])(data);
    const grade_url = R.pathOr('', ['grade_url'])(data);

    return (
      <Touchable
        disabled={R.isEmpty(grade_url)}
        foreground
        onPress={this.handlePress}
      >
        <View
          style={[styles.container, showTopBorder && styles.topBorder, style]}
        >
          <Avatar
            style={styles.avatar}
            raised={false}
            size={52}
            innerRatio={0.75}
            source={
              R.isEmpty(icon)
                ? require('asset/project/project_logo_default.png')
                : { uri: icon }
            }
          />
          <View style={styles.content.container}>
            <View style={styles.content.titleContainer}>
              <Text style={styles.content.title}>{project_name}</Text>
            </View>
            <Text style={[styles.content.subtitle]} numberOfLines={1}>
              {description}
            </Text>
          </View>
          <View style={styles.end.container}>
            <View style={{ flex: 1 }}>
              {!R.isEmpty(grade_name) && (
                <Flex align="center">
                  <Text style={[styles.end.scoreText]}>评分</Text>
                  <Text style={[styles.end.score]}>{grade_name}</Text>
                </Flex>
              )}
            </View>
          </View>
        </View>
      </Touchable>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    // alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  avatar: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#F0F0F0',
    borderRadius: 2,
  },
  vip_label: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  content: {
    container: {
      flex: 1,
      marginLeft: 12,
      justifyContent: 'center',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    subtitle: {
      marginTop: 8,
      fontSize: 11,
      color: 'rgba(0, 0, 0, 0.45)',
    },
    tag: {
      wrapper: {
        marginTop: 8,
        flexDirection: 'row',
      },
      container: {
        height: 17,
        paddingHorizontal: 3,
        borderRadius: 1,
        marginRight: 4,
        justifyContent: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(0, 0, 0, 0.25)',
      },
      title: {
        fontSize: 10,
        color: 'rgba(0, 0, 0, 0.45)',
      },
    },
    miscTag: {
      container: {
        marginTop: 8,
        flexDirection: 'row',
      },
      item: {
        container: {
          height: 17,
          paddingHorizontal: 3,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 1,
        },
        text: {
          fontSize: 10,
        },
      },
    },
  },
  end: {
    container: {
      marginVertical: 3,
      alignItems: 'flex-end',
      marginLeft: 6,
    },
    status: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1890FF',
    },
    score: { fontFamily: 'DIN Alternate', fontSize: 17, color: '#1890FF' },
    scoreText: { fontSize: 11, color: 'rgba(0,0,0,0.45)', marginRight: 5 },
    favor: {
      container: {
        // marginTop: 24,
        paddingHorizontal: 12,
        height: 24,
        maxWidth: 60,
        borderRadius: 2,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#DDDDDD',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      number: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.65)',
      },
    },
  },
  topBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E9E9E9',
  },
};

export default RatedItem;
