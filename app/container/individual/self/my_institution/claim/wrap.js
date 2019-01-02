import React from 'react';
import { View, Image, Text } from 'react-native';

import Modal from 'component/modal';
import Touchable from 'component/uikit/touchable';

const ClaimWrap = ({ tipVisible, setTipVisible }) => {
  const handleDismiss = () => {
    setTipVisible(false);
  };
  return (
    <Modal
      style={{ alignSelf: 'center' }}
      isVisible={tipVisible}
      onBackdropPress={handleDismiss}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 2,
          paddingHorizontal: 12,
          paddingVertical: 20,
        }}
      >
        <Image
          source={require('asset/institution_create/institution_claim_tip.jpg')}
        />
        <Touchable style={styles.button.container} onPress={handleDismiss}>
          <Text style={styles.button.title}>好的，开始</Text>
        </Touchable>
      </View>
    </Modal>
  );
};

const styles = {
  button: {
    container: {
      marginTop: 45,
      height: 43,
      width: 210,
      borderRadius: 2,
      backgroundColor: '#1890FF',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    title: {
      fontSize: 13,
      color: 'white',
      fontWeight: 'bold',
    },
  },
};
ClaimWrap.propTypes = {};
ClaimWrap.defaultProps = {};

export default ClaimWrap;
