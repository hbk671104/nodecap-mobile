import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';

class Demand extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    subtitle: PropTypes.string,
  };

  static defaultProps = {
    data: [
      { id: 0, name: '募集资金' },
      { id: 1, name: '品牌宣传' },
      { id: 2, name: '社群运营' },
      { id: 3, name: '上交易所' },
      { id: 4, name: '法律咨询' },
      { id: 5, name: '其他' },
    ],
  };

  render() {
    const {
      style,
      topContainerStyle,
      containerStyle,
      title,
      titleStyle,
      subtitleStyle,
      itemContainerStyle,
      itemHighlightContainerStyle,
      itemHighlightTextStyle,
      subtitle,
      data,
      value,
      onChange,
    } = this.props;
    return (
      <View style={[styles.container, style]}>
        <View style={[styles.topContainer, topContainerStyle]}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
          <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
        </View>
        <View style={[styles.content.container, containerStyle]}>
          {R.map(d => {
            const selected = R.contains(d.id)(value);
            return (
              <Touchable
                key={d.id}
                style={[
                  styles.content.item.container,
                  itemContainerStyle,
                  selected && {
                    borderColor: '#1890FF',
                    ...itemHighlightContainerStyle,
                  },
                ]}
                onPress={() => onChange(d.id)}
              >
                <Text
                  style={[
                    styles.content.item.title,
                    selected && {
                      fontWeight: 'bold',
                      color: '#1890FF',
                      ...itemHighlightTextStyle,
                    },
                  ]}
                >
                  {d.name}
                </Text>
              </Touchable>
            );
          })(data)}
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    marginVertical: 20,
  },
  topContainer: {
    paddingLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.45)',
    marginTop: 6,
  },
  content: {
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 16,
      paddingLeft: 12,
    },
    item: {
      container: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#D5D5D5',
        borderRadius: 2,
        marginRight: 12,
        marginBottom: 12,
        height: 32,
        width: 101,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.65)',
      },
    },
  },
};

export default Demand;
