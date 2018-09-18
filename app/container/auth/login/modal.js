import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { NavigationActions, Actions } from 'react-navigation';
import { connect } from 'react-redux';
import Login from './index';
import NodeCapIcon from 'component/icon/nodecap';

@connect()
class LoginModal extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
      }}
      >
        <Login screenProps={{
          renderLeft: () => (
            <TouchableWithoutFeedback onPress={() => {
              this.props.navigation.dispatch(NavigationActions.back());
            }}
            >
              <NodeCapIcon name="guanbi" color="#4A4A4A" size={20} />
            </TouchableWithoutFeedback>
          ),
        }}
        />
      </View>
    );
  }
}

LoginModal.propTypes = {};
LoginModal.defaultProps = {};

export default LoginModal;
