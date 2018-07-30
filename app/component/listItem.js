import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'component/uikit/icon';
import Touchable from 'component/uikit/touchable';

const item = ({
  title,
  titleStyle,
  subtitle,
  subtitleStyle,
  content,
  contentStyle,
  contentContainerStyle,
  style,
  icon,
  children,
  noBottomBorder,
  disablePress,
  renderContent,
  onPress,
}) => (
  <View>
    <Touchable foreground disabled={disablePress} onPress={onPress}>
      <View
        style={[
          styles.container,
          noBottomBorder && styles.noBottomBorder,
          style,
        ]}
      >
        {!!icon && (
          <Image resizeMode="contain" style={styles.image} source={icon} />
        )}
        <View style={styles.group}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
          {!!subtitle && (
            <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
          )}
        </View>
        <View style={[styles.content.container, contentContainerStyle]}>
          {renderContent ? (
            renderContent()
          ) : (
            <Text style={[styles.content.text, contentStyle]}>{content}</Text>
          )}
        </View>
        {!disablePress && (
          <Icon name="arrow-forward" size={16} color="rgba(0, 0, 0, 0.25)" />
        )}
      </View>
    </Touchable>
    {children}
  </View>
);

const styles = {
  container: {
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    paddingRight: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
  noBottomBorder: {
    borderBottomWidth: 0,
  },
  image: {
    marginRight: 12,
    height: 18,
    width: 18,
  },
  title: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.85)',
  },
  subtitle: {
    fontSize: 11,
    color: 'rgba(0, 0, 0, 0.45)',
    marginTop: 7,
  },
  group: {},
  content: {
    container: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10,
      alignItems: 'flex-end',
    },
    text: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.65)',
    },
  },
};

item.defaultProps = {
  onPress: () => null,
  titleStyle: {},
  contentStyle: {},
  contentContainerStyle: {},
  style: {},
  noBottomBorder: false,
  disablePress: false,
};

item.propTypes = {
  title: PropTypes.string.isRequired,
  titleStyle: PropTypes.object,
  subtitle: PropTypes.string,
  subtitleStyle: PropTypes.object,
  content: PropTypes.string,
  contentStyle: PropTypes.object,
  contentContainerStyle: PropTypes.object,
  style: PropTypes.object,
  icon: PropTypes.number,
  noBottomBorder: PropTypes.bool,
  renderContent: PropTypes.func,
  disablePress: PropTypes.bool,
  onPress: PropTypes.func,
};

export default item;
