import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import R from 'ramda';

import Input from 'component/uikit/textInput';

class InputItem extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    titleStyle: PropTypes.object,
    placeholder: PropTypes.string,
    vertical: PropTypes.bool,
    renderContent: PropTypes.func,
    renderRight: PropTypes.func,
    inputProps: PropTypes.object,
    error: PropTypes.array,
  };

  static defaultProps = {
    vertical: false,
    inputProps: {},
    error: [],
  };

  renderError = error =>
    error.map(info => (
      <Text key={info} style={styles.error.text}>
        {info}
      </Text>
    ));

  render() {
    const {
      title,
      titleStyle,
      vertical,
      renderContent,
      renderRight,
      placeholder,
      onChange,
      inputProps,
      value,
      error,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={[styles.wrapper, vertical && styles.vertical]}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
          <View
            style={
              vertical
                ? styles.content.vertical.container
                : styles.content.horizontal.container
            }
          >
            {renderContent ? (
              renderContent({ onChange, value })
            ) : (
              <View style={styles.content.horizontal.wrapper}>
                <Input
                  {...inputProps}
                  style={[
                    styles.content.horizontal.input,
                    vertical && styles.content.vertical.input,
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
        {!R.isEmpty(error) && (
          <View style={styles.error.container}>{this.renderError(error)}</View>
        )}
      </View>
    );
  }
}

const styles = {
  container: {
    marginLeft: 12,
    paddingRight: 12,
    paddingVertical: 20,
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
  title: {
    color: 'rgba(0, 0, 0, 0.45)',
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
