import React from 'react';
import { View, Text, Image } from 'react-native';
import R from 'ramda';

const label = ({ data }) => {
  const is_vip = R.pathOr(false, ['is_vip'])(data);
  const owners = R.pathOr(false, ['is_owned'])(data);
  const finance_status = R.path(['finance_status'])(data);

  if (!is_vip && !owners && R.isNil(finance_status)) {
    return null;
  }

  return (
    <View style={styles.container}>
      {is_vip && (
        <Image
          style={{ marginRight: 4 }}
          source={require('asset/public_project/vip_latest.png')}
        />
      )}
      {owners && (
        <View style={styles.item.container}>
          <Image
            style={{ marginRight: 3 }}
            source={require('asset/public_project/checkmark_highlight.png')}
          />
          <Text style={[styles.item.text, { color: '#1890FF' }]}>已入驻</Text>
        </View>
      )}
      {!R.isNil(finance_status) && finance_status !== '未设定' && (
        <View style={styles.item.container}>
          <Text style={[styles.item.text, { color: '#09AC32' }]}>
            {finance_status}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 12,
  },
  item: {
    container: {
      height: 15,
      borderRadius: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 3,
      marginRight: 4,
    },
    text: {
      fontSize: 10,
    },
  },
};

export default label;
