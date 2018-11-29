import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Touchable from 'component/uikit/touchable';

const chatButton = ({ id, dispatch }) => {
  const handlePress = () => {
    dispatch(
      NavigationActions.navigate({
        routeName: 'IMPage',
        params: {
          id,
        },
      }),
    );
  };
  return (
    <Touchable style={styles.container} onPress={handlePress}>
      <Text style={styles.text}>聊 天</Text>
    </Touchable>
  );
};

const styles = {
  container: {
    height: 30,
    width: 58,
    borderWidth: 1,
    borderColor: '#1890FF',
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1890FF',
  },
};

export default connect()(chatButton);
