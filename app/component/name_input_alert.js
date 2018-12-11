import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { createForm } from 'rc-form';

import ActionAlert from 'component/action_alert';
import TextInput from 'component/uikit/textInput';

@connect(({ loading }) => ({
  loading: loading.effects['user/updateUserProfile'],
}))
@createForm()
class NameInputAlert extends PureComponent {
  handleAction = () => {
    this.props.form.validateFields((err, { realname }) => {
      if (!err) {
        this.props.dispatch({
          type: 'user/updateUserProfile',
          payload: {
            realname,
          },
          callback: () => {
            this.props.setNameInputVisible(false);
          },
        });
      }
    });
  };

  render() {
    const { nameInputVisible, setNameInputVisible, loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <ActionAlert
        loading={loading}
        avoidKeyboard
        visible={nameInputVisible}
        renderContent={() => (
          <View style={styles.container}>
            <View style={styles.title.container}>
              <Text style={styles.title.text}>您的真实姓名是</Text>
            </View>
            <View style={styles.subtitle.container}>
              <Text style={styles.subtitle.text}>
                姓名能帮您更快获得对方信任及反馈
              </Text>
            </View>
            <View style={styles.input.container}>
              {getFieldDecorator('realname')(
                <TextInput placeholder="请输入您的真实姓名" />,
              )}
            </View>
          </View>
        )}
        actionTitle="确定"
        action={this.handleAction}
        onBackdropPress={() => setNameInputVisible(false)}
      />
    );
  }
}

const styles = {
  container: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 16,
  },
  title: {
    container: {
      alignSelf: 'center',
    },
    text: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333333',
    },
  },
  subtitle: {
    container: {
      marginTop: 12,
      alignSelf: 'center',
    },
    text: {
      fontSize: 13,
      color: 'rgba(0, 0, 0, 0.65)',
    },
  },
  input: {
    container: {
      marginTop: 24,
      height: 40,
      backgroundColor: '#F5F5F5',
      borderRadius: 1,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: '#E9E9E9',
      justifyContent: 'center',
      paddingLeft: 10,
    },
  },
};

export default NameInputAlert;
