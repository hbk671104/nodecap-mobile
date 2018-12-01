import React from 'react';
import { View, Text, Image } from 'react-native';
import R from 'ramda';
import { withState } from 'recompose';
import Touchable from 'component/uikit/touchable';
import ActionAlert from 'component/action_alert';

const label = ({ data, showInviteModal, setInviteModal, showVipModal, setVipModal }) => {
  const is_vip = R.pathOr(false, ['is_vip'])(data);
  const owners = R.pathOr(false, ['is_owned'])(data);
  const finance_status = R.path(['finance_status'])(data);

  if (!is_vip && !owners && R.isNil(finance_status)) {
    return null;
  }

  return (
    <View style={styles.container}>
      {is_vip && (
        <Touchable onPress={() => {
          setVipModal(true);
        }}
        >
          <Image
            style={{ marginRight: 4 }}
            source={require('asset/public_project/vip_latest.png')}
          />
        </Touchable>
      )}
      {owners && (
        <Touchable onPress={() => {
          setInviteModal(true);
        }}
        >
          <View style={styles.item.container}>
            <Image
              style={{ marginRight: 3 }}
              source={require('asset/public_project/checkmark_highlight.png')}
            />
            <Text style={[styles.item.text, { color: '#1890FF' }]}>已入驻</Text>
          </View>
        </Touchable>
      )}
      {!R.isNil(finance_status) && finance_status !== '未设定' && (
        <View style={styles.item.container}>
          <Text style={[styles.item.text, { color: '#09AC32' }]}>
            {finance_status}
          </Text>
        </View>
      )}
      <ActionAlert
        visible={showInviteModal}
        title="已入驻"
        content="项目方已有团队成员入驻，可直接联系"
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 18 }}
        actionTitle="我知道了"
        action={() => {
          setInviteModal(false);
        }}
        onBackdropPress={() => setInviteModal(false)}
      />
      <ActionAlert
        visible={showVipModal}
        title="VIP"
        content="VIP付费用户可获得全面和专业的信息、资源对接服务"
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 18 }}
        actionTitle="成为VIP"
        action={() => {
          setVipModal(false);
        }}
        onBackdropPress={() => setVipModal(false)}
      />
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 12,
  },
  item: {
    container: {
      height: 15,
      borderRadius: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 3,
      marginRight: 4,
    },
    text: {
      fontSize: 10,
    },
  },
};

export default withState('showVipModal', 'setVipModal', false)(
               withState('showInviteModal', 'setInviteModal', false)(label)
               );
