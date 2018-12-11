import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { compose, withState } from 'recompose';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import NameInputAlert from 'component/name_input_alert';

@connect(({ login, user }) => ({
  user: R.path(['currentUser'])(user),
  logged_in: !!login.token,
}))
@compose(withState('nameInputVisible', 'setNameInputVisible', false))
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

    const { user, setNameInputVisible } = this.props;
    if (
      R.pipe(
        R.path(['realname']),
        R.test(/^1[34578]\d{9}$/),
      )(user)
    ) {
      setNameInputVisible(true);
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
      <View>
        <Touchable style={styles.container} onPress={this.handlePress}>
          <Text style={styles.text}>聊 天</Text>
        </Touchable>
        <NameInputAlert {...this.props} />
      </View>
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
