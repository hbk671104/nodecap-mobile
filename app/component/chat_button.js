import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Touchable from 'component/uikit/touchable';

@connect(({ login }) => ({
  logged_in: !!login.token,
}))
class ChatButton extends PureComponent {
  handlePress = () => {
    if (!this.props.logged_in) {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      );
      return;
    }

    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'IMPage',
        params: {
          id: this.props.id,
        },
      }),
    );
  };

  render() {
    return (
      <Touchable style={styles.container} onPress={this.handlePress}>
        <Text style={styles.text}>聊 天</Text>
      </Touchable>
    );
  }
}

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

export default ChatButton;
