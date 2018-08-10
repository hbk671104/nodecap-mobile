import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ScrollView } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';

class Selector extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    value: PropTypes.array,
    onChange: PropTypes.func,
  };

  onSelect = item => {
    const value = this.props.value || [];
    if (R.find(R.propEq('id', item.id))(value)) {
      this.props.onChange(value.filter(i => i.id !== item.id));
    } else {
      this.props.onChange([...value, item]);
    }
  };

  render() {
    const { data, value } = this.props;
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((t, i) => {
          const selected = R.find(R.propEq('id', t.id))(value);
          return (
            <View
              key={t.id}
              style={[styles.item.wrapper, i === 0 && { marginLeft: 0 }]}
            >
              <Touchable borderless onPress={() => this.onSelect(t)}>
                <View
                  style={[
                    styles.item.container,
                    selected && styles.item.highlight.container,
                  ]}
                >
                  <Text
                    style={[
                      styles.item.title,
                      selected && styles.item.highlight.title,
                    ]}
                  >
                    {t.name}
                  </Text>
                </View>
              </Touchable>
              {selected && (
                <View style={styles.item.highlight.label}>
                  <Image
                    source={require('asset/project/create/selected.png')}
                  />
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = {
  container: {},
  item: {
    wrapper: {
      height: 40,
      justifyContent: 'center',
      marginLeft: 9,
    },
    container: {
      height: 29,
      borderRadius: 14.5,
      paddingHorizontal: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E9E9E9',
    },
    innerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      color: 'rgba(0, 0, 0, 0.45)',
      fontSize: 13,
    },
    highlight: {
      container: {
        borderColor: '#1890FF',
      },
      title: {
        color: '#1890FF',
      },
      label: {
        position: 'absolute',
        top: 0,
        right: 0,
      },
    },
  },
};

export default Selector;
