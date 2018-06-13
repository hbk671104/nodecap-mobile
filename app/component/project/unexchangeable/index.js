import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';
import moment from 'moment';
import styles from './style';

const unexchangeableItem = ({ item, status }) => (
  <Touchable style={styles.container}>
    <View>
      <View style={styles.top.container}>
        <View style={styles.top.group}>
          <Avatar source={{ uri: item.logo_url }} />
          <View style={styles.top.title.container}>
            <Text style={styles.top.title.text}>{item.name}</Text>
            {!!item.token_name && (
              <Text style={[styles.top.title.text, { fontSize: 13, marginLeft: 5 }]}>
                ({item.token_name})
              </Text>
            )}
          </View>
        </View>
        <View>
          <View style={styles.top.status.container}>
            <View
              style={[
                styles.top.status.dot.container,
                item.status === 4 && { backgroundColor: '#7376F4' },
                item.status === 5 && { backgroundColor: '#E634CE' },
                item.status === 6 && { backgroundColor: '#1ECEA7' },
              ]}
            />
            <Text style={styles.top.status.text}>
              {item.status === 4 && '确定意向'}
              {item.status === 5 && '待打币'}
              {item.status === 6 && '已打币'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom.container}>
        <View>
          <Text style={styles.bottom.content}>项目来源：{item.source || '未收录'}</Text>
          <Text style={[styles.bottom.content, { marginTop: 7 }]}>
            跟进人：{item.watch_user || '未收录'}
          </Text>
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <Text style={styles.bottom.content}>{moment(item.created_at).format('LL')} 录入</Text>
        </View>
      </View>
    </View>
  </Touchable>
);

unexchangeableItem.propTypes = {
  item: PropTypes.object,
};

export default unexchangeableItem;
