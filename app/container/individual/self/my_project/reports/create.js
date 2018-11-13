import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { Form, Button, Flex } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import InputItem from 'component/inputItem';
import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';

@createForm()
class CreateWeeklyReport extends Component {
  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <NavBar
          back
          gradient
          title="发布新周报"
          renderRight={() => {
            return (
              <Touchable borderless onPress={this.handleSavePress}>
                <Text style={styles.navBar.right}>预览</Text>
              </Touchable>
            );
          }}
        />
        <KeyboardAvoidingView
          style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}
          behavior="padding"
        >
          <View>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入周报标题' }],
            })(
              <InputItem
                style={styles.inputItem.container}
                titleStyle={styles.inputItem.title}
                title="标题"
                placeholder="请输入周报标题"
                inputProps={{ autoFocus: true }}
                error={getFieldError('title')}
              />,
            )}
            {getFieldDecorator('link_url', {
              rules: [{ required: true, message: '请输入周报链接' }],
            })(
              <InputItem
                style={styles.inputItem.container}
                titleStyle={styles.inputItem.title}
                vertical
                title="周报链接"
                placeholder="请输入周报链接"
                error={getFieldError('link_url')}
                inputProps={{
                  numberOfLines: 5,
                  style: {
                    height: 90,
                  },
                }}
              />,
            )}
          </View>
          <View style={{ margin: 12 }}>
            <Button
              type="primary"
              style={{ height: 39, borderRadius: 2 }}
            >
              <Text style={{ fontSize: 13, color: '#FFFFFF', letterSpacing: 0.15 }}>发  布</Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = {
  inputItem: {
    container: {
      paddingVertical: 20,
    },
    title: {
      color: 'rgba(0, 0, 0, 0.65)',
    },
    input: {
      textAlign: 'right',
    },
  },
  navBar: {
    right: {
      color: 'white',
      fontSize: 14,
    },
  },
};
CreateWeeklyReport.propTypes = {};
CreateWeeklyReport.defaultProps = {};

export default CreateWeeklyReport;
