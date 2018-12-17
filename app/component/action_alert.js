import React from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native';

import Modal from 'component/modal';
import Touchable from 'component/uikit/touchable';

const actionAlert = ({
  visible,
  title,
  content,
  contentContainerStyle,
  image,
  actionTitle,
  action,
  subActionTitle,
  subAction,
  onBackdropPress,
  renderContent,
  avoidKeyboard = false,
  loading,
}) => (
  <Modal
    useNativeDriver
    hideModalContentWhileAnimating
    avoidKeyboard={avoidKeyboard}
    isVisible={visible}
    style={styles.wrapper}
    onBackdropPress={onBackdropPress}
    backdropOpacity={0.4}
  >
    <View style={styles.contentWrapper}>
      {renderContent ? (
        renderContent()
      ) : (
        <View style={[styles.container, contentContainerStyle]}>
          <Text style={styles.title}>{title}</Text>
          {!!content && <Text style={styles.content}>{content}</Text>}
          {image && <Image style={{ marginTop: 24 }} source={image} />}
        </View>
      )}
      <View style={styles.action.wrapper}>
        {!!subActionTitle && !!subAction && (
          <Touchable
            style={[
              styles.action.container,
              {
                borderRightColor: '#DDDDDD',
                borderRightWidth: StyleSheet.hairlineWidth,
              },
            ]}
            onPress={subAction}
          >
            <Text
              style={[styles.action.text, { color: 'rgba(0, 0, 0, 0.65)' }]}
            >
              {subActionTitle}
            </Text>
          </Touchable>
        )}
        <Touchable style={styles.action.container} onPress={action}>
          {loading ? (
            <ActivityIndicator color="#1890FF" />
          ) : (
            <Text style={styles.action.text}>{actionTitle}</Text>
          )}
        </Touchable>
      </View>
    </View>
  </Modal>
);

const styles = {
  wrapper: {
    alignSelf: 'center',
  },
  contentWrapper: {
    backgroundColor: 'white',
    borderRadius: 2,
    width: 270,
  },
  container: {
    paddingHorizontal: 12,
    paddingTop: 30,
    alignItems: 'center',
  },
  action: {
    wrapper: {
      flexDirection: 'row',
      height: 48,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#DDDDDD',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#1890FF',
      fontWeight: 'bold',
      fontSize: 15,
    },
  },
  title: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
  },
  content: {
    marginTop: 12,
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.65)',
    lineHeight: 18,
  },
};

export default actionAlert;
