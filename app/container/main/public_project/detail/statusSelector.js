import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Text, Image } from 'react-native';
import { Flex } from 'antd-mobile';
import Modal from 'react-native-modal';
import { withState } from 'recompose';
import styles from './statusSelector.style';

const status = [
  {
    text: '待初筛',
    status: '0',
    icon: require('../../../../asset/projectStatus/0.png'),
    icon_active: require('../../../../asset/projectStatus/0_active.png'),
  },
  {
    text: '待上会',
    status: '1',
    icon: require('../../../../asset/projectStatus/1.png'),
    icon_active: require('../../../../asset/projectStatus/1_active.png'),
  }, {
    text: '待跟进',
    status: '2',
    icon: require('../../../../asset/projectStatus/2.png'),
    icon_active: require('../../../../asset/projectStatus/2_active.png'),
  }, {
    text: '确定意向',
    status: '3',
    icon: require('../../../../asset/projectStatus/3.png'),
    icon_active: require('../../../../asset/projectStatus/3_active.png'),
  }, {
    text: '待打币',
    status: '4',
    icon: require('../../../../asset/projectStatus/4.png'),
    icon_active: require('../../../../asset/projectStatus/4_active.png'),
  }, {
    text: '已打币',
    status: '5',
    icon: require('../../../../asset/projectStatus/5.png'),
    icon_active: require('../../../../asset/projectStatus/5_active.png'),
  },
];

@withState('currentSelect', 'setCurrent', (props) => (props.value ? String(props.value) : '0'))
class StatusSelector extends Component {
  renderToolBar() {
    return (
      <Flex style={styles.toolbar} justifyContent="space-between">
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View>
            <Text style={[styles.toolbarButtonText, styles.cancel]}>取消</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {
          this.props.onSubmit(this.props.currentSelect);
        }}
        >
          <View>
            <Text style={[styles.toolbarButtonText, styles.submit]}>确定</Text>
          </View>
        </TouchableWithoutFeedback>
      </Flex>
    );
  }
  render() {
    return (
      <Modal
        {...this.props}
        backdropOpacity={0}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
      >
        <View style={styles.container}>
          {this.renderToolBar()}
          <ScrollView
            horizontal
            style={{
              paddingHorizontal: 10,
              marginTop: 20,
            }}
          >
            <Flex alignItems="flex-start">
              {status.map((i, idx) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => this.props.setCurrent(i.status)}
                >
                  <Flex direction="column" justifyContent="center" alignItems="center" style={styles.statusItem}>
                    <View style={styles.statusItemTouch}>
                      <Image
                        source={this.props.currentSelect === i.status ? i.icon_active : i.icon}
                        style={styles.statusItemImage}
                      />
                    </View>
                    <Text style={styles.statusItemText}>{i.text}</Text>
                  </Flex>
                </TouchableOpacity>
              ))}
            </Flex>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

StatusSelector.propTypes = {
  isVisible: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func, // 参数为 status
  value: PropTypes.string,
};
StatusSelector.defaultProps = {};

export default StatusSelector;
