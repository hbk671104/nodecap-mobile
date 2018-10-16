import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Linking } from 'react-native';
import { Flex } from 'antd-mobile';
import R from 'ramda';

import Avatar from 'component/uikit/avatar';

const memberItem = ({ data, style }) => {
  const profile_pic = R.pathOr('', ['profile_pic'])(data);
  const name = R.pathOr('--', ['name'])(data);
  const title = R.pathOr('--', ['title'])(data);
  const linkedIn_url = R.path(['linkedIn_url'])(data);
  return (
    <View style={[styles.container, style]}>
      <Avatar
        source={{ uri: profile_pic }}
        raised={false}
        size={40}
        innerRatio={1}
      />
      <Flex justify="between" style={{ flex: 1 }}>
        <View style={[styles.content.container]}>
          <Text style={styles.content.title}>{R.trim(name)}</Text>
          <Text style={styles.content.subtitle}>{R.trim(title)}</Text>
        </View>
        {!!linkedIn_url && (
        <View>
          <TouchableWithoutFeedback onPress={() => {
            Linking
              .canOpenURL(linkedIn_url)
              .then((support) => {
                if (support) {
                  Linking
                    .openURL(linkedIn_url)
                    .catch((err) => {
                      console.log(err);
                    });
                }
              })
              .catch((err) => console.error('An error occurred', err));
          }}
          >
            <Image style={styles.content.linkedin} source={require('asset/public_project/linkedin.png')} />
          </TouchableWithoutFeedback>
        </View>
        )}
      </Flex>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
  content: {
    container: {
      marginLeft: 15,
    },
    title: {
      color: 'rgba(0, 0, 0, 0.85)',
      fontSize: 14,
      fontWeight: 'bold',
    },
    linkedin: {
      width: 15,
      height: 15,
    },
    subtitle: {
      marginTop: 6,
      color: 'rgba(0, 0, 0, 0.65)',
      fontSize: 12,
    },
  },
};

memberItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default memberItem;
