import React, { PureComponent } from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  GiftedChat,
  Send,
  Composer,
  Bubble,
  Avatar,
} from 'react-native-gifted-chat';
import 'moment/locale/zh-cn';

class Chat extends PureComponent {
  clearText = () => {
    if (Platform.OS === 'ios') {
      this._textInput.setNativeProps({ text: ' ' });
    }

    setTimeout(() => {
      this._textInput.setNativeProps({ text: '' });
    }, 5);
  };

  render() {
    return (
      <GiftedChat
        {...this.props}
        showUserAvatar
        locale="zh-cn"
        placeholder="请输入..."
        onSend={props => {
          this.props.onSend(props);
          this.clearText();
        }}
        listViewProps={{
          ...this.props.listViewProps,
          style: {
            backgroundColor: '#f5f5f5',
          },
          keyboardDismissMode: 'on-drag',
          keyboardShouldPersistTaps: 'handled',
        }}
        renderComposer={p => (
          <Composer
            {...p}
            textInputProps={{
              ref: ref => {
                this._textInput = ref;
              },
              multiline: false,
              value: undefined,
              returnKeyType: 'send',
              onSubmitEditing: event => {
                p.onSend(p);
                this.clearText();
              },
            }}
          />
        )}
        renderBubble={p => (
          <Bubble
            {...p}
            wrapperStyle={{
              left: {
                backgroundColor: 'white',
                borderRadius: 1,
                borderColor: '#E9E9E9',
                borderWidth: StyleSheet.hairlineWidth,
              },
              right: {
                backgroundColor: '#1890FF',
                borderRadius: 1,
                borderColor: '#177CD9',
                borderWidth: StyleSheet.hairlineWidth,
              },
            }}
          />
        )}
        renderAvatar={p => <Avatar {...p} />}
        renderSend={p => <Send {...p} label="发送" />}
      />
    );
  }
}

export default Chat;
