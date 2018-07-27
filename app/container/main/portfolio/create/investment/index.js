import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions } from 'react-navigation';
import { createForm } from 'rc-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Toast } from 'antd-mobile';

import SafeAreaView from 'component/uikit/safeArea';
import NavBar from 'component/navBar';
import AuthButton from 'component/auth/button';
import InputItem from 'component/inputItem';
import TokenSelector, { tokenDisplay } from 'component/tokenSelector';
import DatePicker from 'component/datePicker';
import PickerSelect from 'component/picker';

import styles from './style';

@connect(({ fund, global }) => ({
  funds: R.pathOr([], ['funds', 'data'])(fund),
  stages: R.pathOr([], ['constants', 'finance_stages'])(global),
  tokens: R.pipe(
    R.pathOr([], ['constants', 'tokens']),
    R.filter(t => t.type === 1),
  )(global),
}))
@createForm()
class InvestmentCreate extends Component {
  createDone = data => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'CreateDone',
        params: {
          data,
        },
      }),
    );
  };

  handleSkip = () => {
    const projectInfo = this.props.navigation.getParam('projectInfo', {});
    if (!R.isEmpty(projectInfo)) {
      Toast.loading('创建中...', 0);
      this.props.dispatch({
        type: 'portfolio/createProject',
        payload: {
          ...projectInfo,
        },
        callback: data => {
          Toast.hide();
          this.createDone(data);
        },
      });
    }
  };

  handleSubmit = () => {
    this.props.form.validateFields((error, value) => {
      // if (R.isNil(error)) {
      // }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { funds, stages, tokens } = this.props;
    const isExpress = this.props.navigation.getParam('express', false);

    const initialSelectToken = R.path([0, 'id'])(tokens);
    const selectedId = getFieldValue('invest_token') || initialSelectToken;
    const selectedToken = R.find(t => t.id === selectedId)(tokens);

    return (
      <SafeAreaView style={styles.container}>
        <NavBar
          gradient
          back
          title={`${isExpress ? '快速' : '手动'}添加 (2/2)`}
        />
        <KeyboardAwareScrollView>
          {!R.isEmpty(funds) &&
            getFieldDecorator('fund', {
              initialValue: R.path([0, 'id'])(funds),
              rules: [
                {
                  required: true,
                  message: '请选择投资主体',
                },
              ],
            })(
              <InputItem
                title="投资主体"
                placeholder="请选择投资主体"
                renderContent={({ onChange, value }) => (
                  <PickerSelect
                    hideIcon
                    placeholder={{
                      label: '请选择投资主体',
                      value: null,
                    }}
                    data={funds.map(f => ({ label: f.name, value: f.id }))}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />,
            )}
          {!R.isEmpty(stages) &&
            getFieldDecorator('stage_id', {
              initialValue: R.path([0, 'id'])(stages),
              rules: [
                {
                  required: true,
                  message: '请选择所投阶段',
                },
              ],
            })(
              <InputItem
                title="所投阶段"
                placeholder="请选择所投阶段"
                renderContent={({ onChange, value }) => (
                  <PickerSelect
                    hideIcon
                    placeholder={{
                      label: '请选择所投阶段',
                      value: null,
                    }}
                    data={stages.map(s => ({ label: s.name, value: s.id }))}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />,
            )}
          {!R.isEmpty(tokens) &&
            getFieldDecorator('invest_token', {
              initialValue: initialSelectToken,
              rules: [
                {
                  required: true,
                  message: '请选择所投币种',
                },
              ],
            })(
              <InputItem
                vertical
                title="投资币种"
                renderContent={({ onChange, value }) => (
                  <TokenSelector
                    data={tokens}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />,
            )}
          {getFieldDecorator('invest_count', {
            rules: [
              {
                required: true,
                message: '请填写应投资数额',
              },
            ],
          })(
            <InputItem
              title="投资数额"
              placeholder="请输入投资数额"
              inputProps={{ keyboardType: 'numeric' }}
              renderRight={() =>
                tokenDisplay({ t: selectedToken, selected: true })
              }
            />,
          )}
          {getFieldDecorator('return_count', {
            rules: [
              {
                required: true,
                message: '请填写应回币数量',
              },
            ],
          })(
            <InputItem
              title="应回币数量"
              placeholder="请输入应回币数量"
              inputProps={{ keyboardType: 'numeric' }}
            />,
          )}
          {getFieldDecorator('paid_at', {
            rules: [
              {
                required: true,
                message: '请选择打币时间',
              },
            ],
          })(
            <InputItem
              title="打币时间"
              placeholder="请选择打币时间"
              renderContent={({ onChange, value }) => (
                <DatePicker onChange={onChange} value={value} />
              )}
            />,
          )}
          <View style={styles.notice.container}>
            <Text style={styles.notice.text}>
              添加更多投资信息可前往网页版 hotnode.io
            </Text>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.noInvestment.container}>
          <Text style={styles.noInvestment.title}>
            暂无投资数据，
            <Text
              style={styles.noInvestment.highlight}
              onPress={this.handleSkip}
            >
              {'跳过 >'}
            </Text>
          </Text>
        </View>
        <AuthButton
          style={styles.confirm}
          disabled={false}
          title="提交"
          onPress={this.handleSubmit}
        />
      </SafeAreaView>
    );
  }
}

export default InvestmentCreate;
