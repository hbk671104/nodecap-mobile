import React, { PureComponent } from 'react';
import { Platform, Image, StyleSheet } from 'react-native';
import {
  GiftedChat,
  Composer,
  Bubble,
  Avatar,
  Day,
} from 'react-native-gifted-chat';
import 'moment/locale/zh-cn';

import Touchable from 'component/uikit/touchable';
import styles from './style';

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
        ref={this.props.chatRef}
        showUserAvatar
        locale="zh-cn"
        onSend={props => {
          this.props.onSend(props);
          this.clearText();
        }}
        listViewProps={{
          ...this.props.listViewProps,
          style: {
            backgroundColor: '#f5f5f5',
          },
          keyboardShouldPersistTaps: 'handled',
        }}
        // minInputToolbarHeight={77}
        renderComposer={p => (
          <Composer
            {...p}
            placeholder=""
            textInputStyle={{ backgroundColor: '#E5E5E5' }}
            textInputProps={{
              ref: ref => {
                this._textInput = ref;
              },
              multiline: false,
              value: undefined,
              returnKeyType: 'send',
              onFocus: this.props.onFocus,
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
        renderAvatarOnTop
        renderAvatar={p => (
          <Avatar
            {...p}
            containerStyle={{
              left: {
                marginRight: 0,
              },
              right: {
                marginLeft: 0,
              },
            }}
            imageStyle={{
              left: {
                height: 44,
                width: 44,
                borderRadius: 1,
              },
              right: {
                height: 44,
                width: 44,
                borderRadius: 1,
              },
            }}
          />
        )}
        renderDay={p => (
          <Day
            {...p}
            containerStyle={{
              marginTop: 16,
              marginBottom: 16,
            }}
            wrapperStyle={{
              backgroundColor: '#AAAAAA',
              paddingHorizontal: 6,
              paddingVertical: 4,
            }}
            textStyle={{
              color: 'white',
            }}
            dateFormat="MM月DD日 HH:mm"
          />
        )}
        renderSend={p => (
          <Touchable
            style={{ marginHorizontal: 18, alignSelf: 'center' }}
            onPress={this.props.toggleAccessory}
          >
            <Image source={require('asset/chat_add.png')} />
          </Touchable>
        )}
      />
    );
  }
}

export default Chat;
