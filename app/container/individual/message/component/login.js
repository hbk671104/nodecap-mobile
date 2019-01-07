import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Button from 'component/auth/button';

@connect()
class Login extends PureComponent {
  handleLoginPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Login',
      }),
    );
  };

  render() {
    const { image, title, content } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Image source={image} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
        </View>
        <View style={styles.button}>
          <Button disabled={false} onPress={this.handleLoginPress} />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1890FF',
    marginTop: 32,
  },
  content: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.66)',
    marginTop: 12,
  },
  button: {
    position: 'absolute',
    bottom: 74,
    left: 80,
    right: 80,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
};

export default Login;
