import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import Input from 'component/uikit/textInput';

class InputItem extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    vertical: PropTypes.bool,
    renderContent: PropTypes.func,
  };

  static defaultProps = {
    vertical: false,
  };

  render() {
    const {
      title,
      vertical,
      renderContent,
      placeholder,
      onChange,
      value,
    } = this.props;
    return (
      <View style={[styles.container, vertical && styles.vertical]}>
        <Text style={styles.title}>{title}</Text>
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
            <Input
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
          )}
        </View>
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
        color: 'rgba(0, 0, 0, 0.85)',
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
};

export default InputItem;
