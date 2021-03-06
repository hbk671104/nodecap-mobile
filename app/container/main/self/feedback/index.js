import React, { Component } from 'react';
import { TextInput, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { withState } from 'recompose';
import { View, TouchableWithoutFeedback, Text, Keyboard } from 'react-native';
import NavBar from 'component/navBar';
import InputItem from 'component/inputItem';
import request from 'utils/request';
import runtimeConfig from 'runtime/index';
import R from 'ramda';

const styles = {
  content: {
    minHeight: 140,
  },
  button: {
    color: 'white',
  },
};

@withState('submitting', 'setSubmitting', false)
@withState('focus', 'setFocus', false)
@connect(({ user }) => ({
  user: user.currentUser,
}))
@createForm()
class Feedback extends Component {
  componentWillMount() {
    setTimeout(() => {
     this.props.setFocus(true);
    }, 200);
  }

  submit = () => {
    if (this.props.submitting) {
      return;
    }
    this.props.form.validateFields((err, value) => {
      if (!err) {
        this.props.setSubmitting(true);
        request.post(`${runtimeConfig.NODE_SERVICE_URL}/feedback`, {
          ...value,
        }).then(() => {
          Toast.success('您的反馈已提交');
          this.props.setSubmitting(false);
          this.props.dispatch(
            NavigationActions.back()
          );
        });
      } else {
        Keyboard.dismiss();
        Toast.fail('请将表单填写完整后再提交');
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white',
      }}
      >
        <NavBar
          gradient
          title="意见反馈"
          back
          renderRight={() => (
            <TouchableWithoutFeedback onPress={this.submit}>
              <View>
                <Text style={styles.button}>{this.props.submitting ? '提交中...' : '提交'}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
        {this.props.focus && (
          <View>
            {getFieldDecorator('content', {
              initialValue: this.props.navigation.getParam('name') || '',
              rules: [{
                required: true,
                message: '你的意见将是我们进步的动力～（必填）',
              }],
            })(
              <InputItem
                inputProps={{
                  style: styles.content,
                  autoFocus: true,
                }}
                placeholder="输入意见反馈内容"
                vertical
              />
            )}
            {getFieldDecorator('mobile', {
              initialValue: R.path(['user', 'mobile'])(this.props),
              rules: [{
                required: true,
                message: '请您填写手机号，方便我们联系您',
              }],
            })(
              <InputItem placeholder="顺便留下联系方式哦，方便我们联系你" vertical />
            )}
          </View>
        )}
      </View>
    );
  }
}

Feedback.propTypes = {};
Feedback.defaultProps = {};


export default Feedback;
