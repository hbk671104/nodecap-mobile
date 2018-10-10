import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';

const bottom = ({ pagination, loading, onResetPress, onConfirmPress }) => {
  const total_count = R.pathOr(0, ['total'])(pagination);

  return (
    <View style={styles.container}>
      <Touchable style={styles.reset.container} onPress={onResetPress}>
        <Text style={styles.reset.title}>重置</Text>
      </Touchable>
      <Touchable style={styles.confirm.container} onPress={onConfirmPress}>
        <View style={styles.confirm.wrapper}>
          {loading && <ActivityIndicator color="white" />}
          <Text style={styles.confirm.title}>
            确定（
            {total_count}
            个项目）
          </Text>
        </View>
      </Touchable>
    </View>
  );
};

const styles = {
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 12,
    flexDirection: 'row',
  },
  reset: {
    container: {
      flex: 1,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#1890FF',
      borderRadius: 2,
    },
    title: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#1890FF',
    },
  },
  confirm: {
    container: {
      flex: 2,
      height: 40,
      marginLeft: 12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1890FF',
      borderRadius: 2,
    },
    wrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      marginLeft: 5,
      fontSize: 13,
      fontWeight: 'bold',
      color: 'white',
    },
  },
};

export default bottom;
