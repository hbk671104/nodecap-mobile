import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';
import { shadow } from '../../utils/style';

const colleague = ({ data, onPress }) => (
  <Touchable onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.top.container}>
        <Text style={styles.top.title}>{data.realname}</Text>
        <View style={styles.top.group}>
          <Text style={styles.top.divider}>
            {'  '}|{'  '}
          </Text>
          <Text style={styles.top.role}>{data.role}</Text>
        </View>
      </View>
      <Grid style={styles.bottom.container}>
        {!!data.mobile && (
          <Row style={{ marginBottom: 8 }}>
            <Text style={styles.bottom.group.title}>
              手机：
              <Text style={styles.bottom.group.content}>{data.mobile}</Text>
            </Text>
          </Row>
        )}
        <Row>
          <Text style={styles.bottom.group.title}>
            登录账号：
            <Text style={styles.bottom.group.content}>{data.email}</Text>
          </Text>
        </Row>
      </Grid>
      <View style={styles.avatar.container}>
        <Avatar
          resizeMode="cover"
          source={{ uri: data.avatar_url }}
          innerRatio={1}
          size={54}
        />
      </View>
    </View>
  </Touchable>
);

const styles = {
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 20,
    marginHorizontal: 12,
    marginVertical: 5,
    ...shadow,
  },
  top: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    group: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    divider: {
      color: '#E9E9E9',
      fontSize: 13,
    },
    title: {
      color: '#333333',
      fontWeight: 'bold',
      fontSize: 18,
    },
    role: {
      color: '#1890FF',
      fontWeight: 'bold',
      fontSize: 11,
    },
  },
  bottom: {
    container: {
      marginTop: 18,
    },
    group: {
      title: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.45)',
      },
      content: {
        color: 'rgba(0, 0, 0, 0.85)',
      },
    },
  },
  avatar: {
    container: {
      position: 'absolute',
      top: 12,
      right: 12,
    },
  },
};

colleague.propTypes = {
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

colleague.defaultProps = {
  onPress: () => null,
};

export default colleague;
