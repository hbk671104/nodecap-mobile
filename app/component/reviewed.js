import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Flex } from 'antd-mobile';

import Modal from 'component/modal';
import NavBar, { navBarHeight } from 'component/navBar';
import Touchable from 'component/uikit/touchable';

export const institutionReviewed = ({ visible, onExitPress, onSharePress }) => (
  <Modal
    useNativeDriver
    hideModalContentWhileAnimating
    animationIn="slideInUp"
    animationOut="slideOutDown"
    isVisible={visible}
    style={{ margin: 0 }}
  >
    <View style={styles.container}>
      <NavBar
        // barStyle="dark-content"
        renderLeft={() => (
          <Touchable borderless onPress={onExitPress}>
            <Text style={styles.close}>关闭</Text>
          </Touchable>
        )}
      />
      <View style={{ alignItems: 'center' }}>
        <Flex style={{ marginTop: 46.5 - navBarHeight }} direction="column">
          <Image style={{ width: 316, height: 448, resizeMode: 'contain' }} source={require('asset/reviewed/org_approved.jpg')} />
        </Flex>
      </View>
      <Touchable style={styles.button.container} onPress={onSharePress}>
        <Text style={styles.button.title}>分享我的机构</Text>
      </Touchable>
    </View>
  </Modal>
);

const reviewed = ({ visible, onExitPress, onSharePress }) => (
  <Modal
    useNativeDriver
    hideModalContentWhileAnimating
    animationIn="slideInUp"
    animationOut="slideOutDown"
    isVisible={visible}
    style={{ margin: 0 }}
  >
    <View style={styles.container}>
      <NavBar
        // barStyle="dark-content"
        renderLeft={() => (
          <Touchable borderless onPress={onExitPress}>
            <Text style={styles.close}>关闭</Text>
          </Touchable>
        )}
      />
      <View style={{ alignItems: 'center' }}>
        <Flex style={{ marginTop: 46.5 - navBarHeight }} direction="column">
          <Image style={{ width: 315, height: 465, resizeMode: 'contain' }} source={require('asset/reviewed/project_approved.jpg')} />
        </Flex>
      </View>
      <Touchable style={styles.button.container} onPress={onSharePress}>
        <Text style={styles.button.title}>分享我的项目</Text>
      </Touchable>
    </View>
  </Modal>
);

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  close: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
    marginTop: 15,
  },
  share: {
    text: {
      fontSize: 13,
      color: 'rgba(0, 0, 0, 0.45)',
    },
  },
  divider: {
    flex: 1,
    marginHorizontal: 16,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E9E9E9',
  },
  item: {
    container: {
      marginTop: 20,
    },
    text: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.65)',
      marginLeft: 12,
    },
  },
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

export default reviewed;
