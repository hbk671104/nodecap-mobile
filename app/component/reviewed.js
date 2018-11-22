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
        <Flex style={{ marginTop: 80 - navBarHeight }} direction="column">
          <Image source={require('asset/reviewed/review_passed.png')} />
          <Text style={styles.title}>恭喜审核通过</Text>
        </Flex>
        <Flex style={{ marginTop: 87 }}>
          <View style={styles.divider} />
          <Text style={styles.share.text}>立即分享可有机会获得以下权益</Text>
          <View style={styles.divider} />
        </Flex>
        <View>
          <Flex style={[styles.item.container, { marginTop: 32.5 }]}>
            <Image source={require('asset/reviewed/01.png')} />
            <Text
              style={[
                styles.item.text,
                { fontSize: 16, fontWeight: 'bold', color: '#FF9500' },
              ]}
            >
              稀缺置顶资源位
            </Text>
            <Image
              style={{ marginLeft: 12 }}
              source={require('asset/reviewed/UP.png')}
            />
          </Flex>
          <Flex style={styles.item.container}>
            <Image source={require('asset/reviewed/02.png')} />
            <Text style={styles.item.text}>更多项目方曝光</Text>
          </Flex>
          <Flex style={styles.item.container}>
            <Image source={require('asset/reviewed/04.png')} />
            <Text style={styles.item.text}>
              {'与50+交易所，100+投资机构，\n研究机构等合作共赢'}
            </Text>
          </Flex>
        </View>
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
        <Flex style={{ marginTop: 80 - navBarHeight }} direction="column">
          <Image source={require('asset/reviewed/review_passed.png')} />
          <Text style={styles.title}>恭喜审核通过</Text>
        </Flex>
        <Flex style={{ marginTop: 87 }}>
          <View style={styles.divider} />
          <Text style={styles.share.text}>立即分享可有机会获得以下权益</Text>
          <View style={styles.divider} />
        </Flex>
        <View>
          <Flex style={[styles.item.container, { marginTop: 32.5 }]}>
            <Image source={require('asset/reviewed/01.png')} />
            <Text
              style={[
                styles.item.text,
                { fontSize: 16, fontWeight: 'bold', color: '#FF9500' },
              ]}
            >
              稀缺置顶资源位
            </Text>
            <Image
              style={{ marginLeft: 12 }}
              source={require('asset/reviewed/UP.png')}
            />
          </Flex>
          <Flex style={styles.item.container}>
            <Image source={require('asset/reviewed/02.png')} />
            <Text style={styles.item.text}>更多项目方曝光</Text>
          </Flex>
          <Flex style={styles.item.container}>
            <Image source={require('asset/reviewed/03.png')} />
            <Text style={styles.item.text}>优质公关、评级、律所服务资源包</Text>
          </Flex>
          <Flex style={styles.item.container}>
            <Image source={require('asset/reviewed/04.png')} />
            <Text style={styles.item.text}>投资机构、FA对接</Text>
          </Flex>
        </View>
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
