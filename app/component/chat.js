import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import { GiftedChat, Send, Composer } from 'react-native-gifted-chat';
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
              blurOnSubmit: false,
              value: undefined,
              returnKeyType: 'send',
              onSubmitEditing: event => {
                p.onSend(p);
                this.clearText();
              },
            }}
          />
        )}
        renderSend={p => <Send {...p} label="发送" />}
      />
    );
  }
}

export default Chat;
