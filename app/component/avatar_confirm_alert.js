import React from 'react';

import ActionAlert from 'component/action_alert';

const avatarConfirmAlert = ({
  avatarConfirmVisible,
  setAvatarConfirmVisible,
  onSubmit,
}) => (
  <ActionAlert
    title="是否跳过上传头像"
    content="会降低收到消息的概率，确认跳过？"
    contentContainerStyle={{ paddingTop: 18, paddingBottom: 18 }}
    visible={avatarConfirmVisible}
    actionTitle="上传"
    action={() => setAvatarConfirmVisible(false)}
    subActionTitle="跳过并提交"
    subAction={() => {
      setAvatarConfirmVisible(false);
      onSubmit();
    }}
    onBackdropPress={() => setAvatarConfirmVisible(false)}
  />
);

export default avatarConfirmAlert;
