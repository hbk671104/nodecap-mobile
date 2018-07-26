import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';

import Touchable from 'component/uikit/touchable';
import { iconMap } from '../../utils/style';

export const tokenDisplay = ({ t, selected }) => (
  <View style={styles.item.innerWrapper}>
    {iconMap(t.name)}
    <Text style={[styles.item.title, selected && styles.item.highlight.title]}>
      {' '}
      - {t.name}
    </Text>
  </View>
);

const tokenSelector = ({ data, value, onChange }) => (
  <View style={styles.container}>
    {data.map((t, i) => {
      const selected = t.id === value;
      return (
        <View
          key={t.id}
          style={[styles.item.wrapper, i === 0 && { marginLeft: 0 }]}
        >
          <Touchable foreground onPress={() => onChange(t.id)}>
            <View
              style={[
                styles.item.container,
                selected && styles.item.highlight.container,
              ]}
            >
              {tokenDisplay({ t, selected })}
            </View>
          </Touchable>
          {selected && (
            <View style={styles.item.highlight.label}>
              <Image source={require('asset/project/create/selected.png')} />
            </View>
          )}
        </View>
      );
    })}
  </View>
);

tokenSelector.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func,
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
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
      justifyContent: 'center',
    },
    title: {
      color: 'rgba(0, 0, 0, 0.45)',
      fontSize: 13,
      fontWeight: 'bold',
    },
    highlight: {
      container: {
        borderColor: '#1890FF',
      },
      title: {
        color: 'rgba(0, 0, 0, 0.65)',
      },
      label: {
        position: 'absolute',
        top: 0,
        right: 0,
      },
    },
  },
};

export default tokenSelector;
