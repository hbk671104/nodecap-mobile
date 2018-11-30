import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import {
  GiftedChat,
  Send,
  Composer,
  LoadEarlier,
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
        renderSend={p => <Send {...p} label="发送" />}
        renderLoadEarlier={p => <LoadEarlier {...p} label="加载更多消息" />}
      />
    );
  }
}

export default Chat;
