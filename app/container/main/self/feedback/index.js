import React, { Component } from 'react';
import { TextInput } from 'antd-mobile';
import { createForm } from 'rc-form';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import NavBar from 'component/navBar';
import InputItem from 'component/inputItem';
import api from 'services/api';

const styles = {
  content: {
    minHeight: 140,
  },
};

@createForm()
class Feedback extends Component {
  submit = () => {
    this.props.form.validateFields((err, value) => {

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
                <Text>提交</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
        {getFieldDecorator('content', {
          rules: [{
            required: true,
            message: '你的意见将是我们进步的动力～（必填）',
          }],
        })(
          <InputItem
            inputProps={{
              style: styles.content,
            }}
            placeholder="输入意见反馈内容"
            vertical
          />
        )}
        {getFieldDecorator('mobile', {
          rules: [{
            required: true,
            message: '请您填写手机号，方便我们联系您',
          }],
        })(
          <InputItem placeholder="顺便留下联系方式哦，方便我们联系你" vertical />
        )}
      </View>
    );
  }
}

Feedback.propTypes = {};
Feedback.defaultProps = {};


export default Feedback;
