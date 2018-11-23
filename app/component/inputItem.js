import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native';
import R from 'ramda';
import { Flex } from 'antd-mobile';

import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';
import Input from 'component/uikit/textInput';

export const InputError = ({ error }) => (
  <View style={styles.error.container}>
    {error.map(info => (
      <Text key={info} style={styles.error.text}>
        {info}
      </Text>
    ))}
  </View>
);

InputError.propTypes = {
  error: PropTypes.array,
};

InputError.defaultProps = {
  error: [],
};

class InputItem extends PureComponent {
  static propTypes = {
    style: ViewPropTypes.style,
    wrapperStyle: ViewPropTypes.style,
    contentWrapperStyle: ViewPropTypes.style,
    showArrow: PropTypes.bool,
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    placeholder: PropTypes.string,
    vertical: PropTypes.bool,
    renderContent: PropTypes.func,
    renderRight: PropTypes.func,
    inputProps: PropTypes.object,
    onPress: PropTypes.func,
    error: PropTypes.array,
    required: PropTypes.bool,
  };

  static defaultProps = {
    vertical: false,
    showArrow: false,
    required: false,
    inputProps: {},
    error: [],
  };

  render() {
    const {
      showArrow,
      style,
      wrapperStyle,
      contentWrapperStyle,
      title,
      titleStyle,
      vertical,
      renderContent,
      renderRight,
      placeholder,
      onChange,
      inputProps = {},
      onPress,
      value,
      error,
      required,
    } = this.props;
    return (
      <Touchable disabled={!onPress} onPress={onPress}>
        <View style={[styles.container, style]}>
          <View
            style={[styles.wrapper, vertical && styles.vertical, wrapperStyle]}
          >
            {!!title && (
              <Flex style={styles.titleContainer}>
                <Text style={[styles.title, titleStyle]}>{title}</Text>
                {required && (
                  <View style={{ position: 'absolute', top: 0, right: 0 }}>
                    {' '}
                    <Text style={styles.required}>*</Text>
                  </View>
                )}
              </Flex>
            )}
            <View
              style={
                vertical
                  ? styles.content.vertical.container
                  : styles.content.horizontal.container
              }
            >
              {renderContent ? (
                <Flex style={contentWrapperStyle}>
                  {renderContent({ onChange, value })}
                  {showArrow && (
                    <Icon
                      style={{ marginLeft: 8 }}
                      name="arrow-forward"
                      color="rgba(0, 0, 0, 0.25)"
                      size={16}
                    />
                  )}
                </Flex>
              ) : (
                <View style={styles.content.horizontal.wrapper}>
                  <Input
                    {...inputProps}
                    style={[
                      styles.content.horizontal.input,
                      vertical && styles.content.vertical.input,
                      inputProps.style,
                    ]}
                    multiline={vertical}
                    placeholder={placeholder}
                    placeholderTextColor="rgba(0, 0, 0, 0.25)"
                    onChange={onChange}
                    value={value || ''}
                  />
                  {renderRight && renderRight()}
                </View>
              )}
            </View>
          </View>
          {!R.isEmpty(error) && <InputError error={error} />}
        </View>
      </Touchable>
    );
  }
}

const styles = {
  container: {
    marginLeft: 12,
    paddingRight: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vertical: {
    flexDirection: 'column',
    alignItems: undefined,
  },
  titleContainer: {
    paddingVertical: 3,
    paddingRight: 8,
  },
  title: {
    color: 'rgba(0, 0, 0, 0.45)',
  },
  required: {
    fontSize: 11,
    color: '#F55454',
  },
  content: {
    horizontal: {
      container: {
        flex: 1,
        marginLeft: 9,
      },
      input: {
        flex: 1,
        color: 'rgba(0, 0, 0, 0.85)',
      },
      wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
    vertical: {
      container: {
        marginTop: 12,
      },
      input: {
        lineHeight: 20,
      },
    },
  },
  error: {
    container: {
      marginTop: 8,
    },
    text: {
      color: 'red',
      fontSize: 12,
    },
  },
};

export default InputItem;
