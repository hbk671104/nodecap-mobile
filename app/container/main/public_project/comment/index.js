import React, { Component } from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback } from 'react-native';
import { Flex } from 'antd-mobile';
import NavBar from 'component/navBar';
import { withState } from 'recompose';
import ShareModal from '../../../individual/public_project/detail/share';
import { submitComment } from '../../../../services/individual/api';

@withState('showShareModal', 'toggleShareModal', false)
@withState('textCount', 'setTextCount', 0)
@withState('comment', 'setComment', '')
class CommentCoin extends Component {
  onComment = () => {
    const coin = this.props.navigation.getParam('coin');
    this.props.toggleShareModal(true);
    submitComment(coin.id, this.props.comment);
  }

  clearInput = () => {
    this.props.setTextCount(0);
    this.props.setComment('');
  }
  render() {
    const coin = this.props.navigation.getParam('coin');
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <NavBar
          back
          gradient
          title="点评"
          renderRight={() => (
            <TouchableWithoutFeedback onPress={this.onComment}>
              <Text style={{ fontSize: 14, color: '#FFFFFF' }}>分享</Text>
            </TouchableWithoutFeedback>
          )}
        />
        <TextInput
          multiline
          style={{
            height: 226,
            verticalAlign: 'top',
            paddingHorizontal: 12,
            marginVertical: 20,
          }}
          maxLength={200}
          onChangeText={(text) => {
            if (text) {
              this.props.setTextCount(text.length);
            }
            this.props.setComment(text);
          }}
          placeholder="写下项目点评，并点击右上角将你的真知灼见分享给大家吧！"
        />
        <Flex
          justify="space-between"
          style={{
            paddingHorizontal: 12,
            borderBottomColor: '#e9e9e9',
            borderBottomWidth: 0.5,
            paddingBottom: 10,
          }}
        >
          <Text style={style.bottomText}>{this.props.textCount}/200</Text>
          {this.props.textCount && (
          <TouchableWithoutFeedback onPress={this.clearInput}>
            <Text style={style.bottomText}>清除</Text>
          </TouchableWithoutFeedback>
          )}
        </Flex>
        <ShareModal
          onClose={() => this.props.toggleShareModal(false)}
          coin={coin}
          comment={this.props.comment}
          visible={this.props.showShareModal}
        />
      </View>
    );
  }
}

CommentCoin.propTypes = {};
CommentCoin.defaultProps = {};

const style = {
  bottomText: { fontSize: 12, color: 'rgba(0,0,0,0.65)' },
};
export default CommentCoin;
