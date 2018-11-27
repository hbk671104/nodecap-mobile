import React from 'react';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import 'moment/locale/zh-cn';

const chat = props => (
  <GiftedChat
    {...props}
    locale="zh-cn"
    placeholder="请输入..."
    renderSend={p => <Send {...p} label="发送" />}
  />
);

export default chat;
