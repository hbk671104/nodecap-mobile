import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { Form, Button, Flex } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import InputItem from 'component/inputItem';
import NavBar from 'component/navBar';
import Touchable from 'component/uikit/touchable';
import { editWeeklyReport } from 'services/individual/api';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

@connect()
@createForm()
class CreateWeeklyReport extends Component {
  state = {
    submitting: false,
  }
  submit = () => {
    this.setState({
      submitting: true,
    });
    this.props.form.validateFields(async (err, value) => {
      if (!err) {
        await editWeeklyReport(this.props.navigation.getParam('id'), {
          ...value,
        });
        this.props.dispatch({
          type: 'public_project/get',
          id: this.props.navigation.getParam('id'),
        });
        this.props.dispatch(
          NavigationActions.back(),
        );
      }

      this.setState({
        submitting: false,
      });
    });
  }

  handlePreview = () => {
    this.props.form.validateFields(async (err, value) => {
      if (!err) {
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: 'WebPage',
            params: {
              title: value.title,
              uri: value.link,
            },
          }),
        );
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;
    const data = this.props.navigation.getParam('data');

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <NavBar
          back
          gradient
          title="编辑周报"
          renderRight={() => {
            return (
              <Touchable borderless onPress={this.handlePreview}>
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
              initialValue: data.title,
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
            {getFieldDecorator('link', {
              initialValue: data.link,
              rules: [{ required: true, message: '请输入周报链接' }],
            })(
              <InputItem
                style={styles.inputItem.container}
                titleStyle={styles.inputItem.title}
                vertical
                title="周报链接"
                placeholder="请输入周报链接"
                error={getFieldError('link')}
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
              onClick={this.submit}
              loading={this.state.submitting}
            >
              <Text style={{ fontSize: 13, color: '#FFFFFF', letterSpacing: 0.15 }}>保  存</Text>
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
