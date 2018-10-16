import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import NavBar from 'component/navBar';
import { withState } from 'recompose';
import ShareModal from '../../../individual/public_project/detail/share';

@withState('showShareModal', 'toggleShareModal', false)
class CommentCoin extends Component {
  render() {
    const coin = this.props.navigation.getParam('coin');
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <NavBar back gradient title="点评" />
        <TextInput
          style={{
            height: 226,
            verticalAlign: 'top',
          }}
          placeholder="写下项目点评，并点击右上角将你的真知灼见分享给大家吧"
        />
        <ShareModal
          onClose={() => this.props.toggleShareModal(false)}
          coin={coin}
          visible={this.props.showShareModal}
        />
      </View>
    );
  }
}

CommentCoin.propTypes = {};
CommentCoin.defaultProps = {};

export default CommentCoin;
