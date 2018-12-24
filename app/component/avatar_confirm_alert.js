import React from 'react';

import ActionAlert from 'component/action_alert';

const avatarConfirmAlert = ({
  avatarConfirmVisible,
  setAvatarConfirmVisible,
  title = '是否跳过上传头像',
  content = '会降低收到消息的概率，确认跳过？',
  actionTitle = '上传',
  subActionTitle = '跳过并提交',
  onSubmit,
}) => (
  <ActionAlert
    title={title}
    content={content}
    contentContainerStyle={{ paddingTop: 18, paddingBottom: 18 }}
    visible={avatarConfirmVisible}
    actionTitle={actionTitle}
    action={() => setAvatarConfirmVisible(false)}
    subActionTitle={subActionTitle}
    subAction={() => {
      setAvatarConfirmVisible(false);
      onSubmit();
    }}
    onBackdropPress={() => setAvatarConfirmVisible(false)}
  />
);

export default avatarConfirmAlert;
