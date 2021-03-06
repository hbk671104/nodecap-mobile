import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Flex } from 'antd-mobile';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';

const publicProjectItem = ({ style, data, onPress, renderRight }) => {
  const icon = R.pathOr('', ['icon'])(data);
  const project_name = R.pathOr('--', ['name'])(data);
  const category = R.pipe(
    R.pathOr([], ['tags']),
    R.take(4),
  )(data);
  const description = R.pathOr('--', ['description'])(data);

  // misc
  const has_white_paper = R.pipe(
    R.pathOr([], ['white_papers']),
    R.isEmpty,
    R.not,
  )(data);
  const is_vip = R.pipe(
    R.pathOr({}, ['vip']),
    R.isEmpty,
    R.not,
  )(data);
  const invested_by_renowned_insti = R.pipe(
    R.pathOr([], ['renowned_industry']),
    R.isEmpty,
    R.not,
  )(data);
  const top_rated = R.pipe(
    R.pathOr([], ['top_rating']),
    R.isEmpty,
    R.not,
  )(data);
  const score = R.pathOr('--', ['score'])(data);
  const score_distribution = R.pathOr('--', ['score_distribution'])(data);
  const owner_status = R.pathOr('', ['owner_status'])(data);
  const status = R.pathOr('', ['status'])(data);
  let scoreColor = null;

  if (score < 60) {
    scoreColor = '#F55454';
  } else if (score >= 60 && score <= 80) {
    scoreColor = '#FF7600';
  } else {
    scoreColor = '#1890FF';
  }
  return (
    <Touchable
      style={{
        marginBottom: 8,
      }}
      foreground
      onPress={onPress}
    >
      <View style={{ backgroundColor: 'white' }}>
        <Flex align="start">
          <View style={{ flex: 1 }}>
            <View style={[styles.container, style]}>
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
                <View style={styles.content.top.container}>
                  <View style={styles.content.titleContainer}>
                    <Text
                      style={styles.content.top.title.text}
                      numberOfLines={2}
                    >
                      {project_name}
                    </Text>
                    {is_vip && (
                      <Image
                        style={{ marginLeft: 8 }}
                        source={require('asset/public_project/is_vip.png')}
                      />
                    )}
                  </View>
                  {renderRight && renderRight()}
                </View>
                <View style={styles.content.tag.wrapper}>
                  {R.addIndex(R.map)((t, i) => (
                    <View key={`${i}`} style={styles.content.tag.container}>
                      <Text style={styles.content.tag.title}>
                        {R.pipe(
                          R.pathOr('', ['name']),
                          R.trim,
                        )(t)}
                      </Text>
                    </View>
                  ))(category)}
                </View>
                <View style={styles.content.miscTag.container}>
                  {has_white_paper && (
                    <View
                      style={[
                        styles.content.miscTag.item.container,
                        { backgroundColor: '#E5F3FF', marginRight: 4 },
                      ]}
                    >
                      <Text
                        style={[
                          styles.content.miscTag.item.text,
                          { color: '#1890FF' },
                        ]}
                      >
                        有白皮书
                      </Text>
                    </View>
                  )}
                  {invested_by_renowned_insti && (
                    <View
                      style={[
                        styles.content.miscTag.item.container,
                        { backgroundColor: '#FFE9D6', marginRight: 4 },
                      ]}
                    >
                      <Text
                        style={[
                          styles.content.miscTag.item.text,
                          { color: '#FF7600' },
                        ]}
                      >
                        知名机构所投
                      </Text>
                    </View>
                  )}
                  {top_rated && (
                    <View
                      style={[
                        styles.content.miscTag.item.container,
                        { backgroundColor: '#BCF4CA' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.content.miscTag.item.text,
                          { color: '#09AC32' },
                        ]}
                      >
                        有评级
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </Flex>
      </View>
    </Touchable>
  );
};

const styles = {
  container: {
    padding: 12,
    flexDirection: 'row',
  },
  score: {
    flexShrink: 0,
    width: 73,
    marginRight: 12,
    marginTop: 12,
  },
  scoreText: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.65)',
    letterSpacing: 0.12,
    textAlign: 'right',
  },
  scoreTextSmall: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.65)',
    letterSpacing: 0.12,
    textAlign: 'right',
  },
  statusTip: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 13,
  },
  statusPending: {
    backgroundColor: '#FFD6B2',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusApproved: {
    backgroundColor: '#09AC32',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusCancel: {
    backgroundColor: '#FFB2B2',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusPendingText: {
    fontSize: 9,
    color: '#FF7600',
    letterSpacing: 0.14,
    textAlign: 'center',
  },
  statusApprovedText: {
    fontSize: 9,
    color: '#09AC32',
    letterSpacing: 0.14,
    textAlign: 'center',
  },
  statusCancelText: {
    fontSize: 9,
    color: '#FF0000',
    letterSpacing: 0.14,
    textAlign: 'center',
  },
  avatar: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#F0F0F0',
    borderRadius: 2,
  },
  content: {
    container: {
      marginLeft: 15,
      flex: 1,
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
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
        marginTop: 8,
        flexDirection: 'row',
      },
      container: {
        height: 17,
        paddingHorizontal: 3,
        borderRadius: 1,
        marginRight: 4,
        justifyContent: 'center',
        alignItems: 'center',
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
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 1,
          marginRight: 4,
        },
        text: {
          fontSize: 10,
        },
      },
    },
    subtitle: {
      container: {
        marginTop: 8,
      },
      text: {
        fontSize: 12,
        lineHeight: 18,
        color: 'rgba(0, 0, 0, 0.45)',
      },
    },
  },
  buttons: {
    height: 38,
    borderTopWidth: 0.5,
    borderTopColor: '#E9E9E9',
  },
  buttonText: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.65)',
    letterSpacing: 0.16,
    textAlign: 'right',
  },
  buttonTextDisabled: {
    color: 'rgba(0,0,0,0.25)',
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
