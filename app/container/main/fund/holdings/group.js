import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const group = ({ title, item, children }) => (
  <View style={styles.container}>
    <View style={styles.bar.container}>
      <View style={{ flex: 3 }}>
        <Text style={styles.bar.title}>{title}</Text>
      </View>
      {!!item && (
        <View style={{ flex: 3 }}>
          <Text style={styles.bar.subtitle}>27,220 ETH</Text>
          <Text style={[styles.bar.content, { marginTop: 3 }]}>
            约 4668.22万元
          </Text>
        </View>
      )}
      {!!item && (
        <View style={{ flex: 2, alignItems: 'flex-end' }}>
          <Text style={styles.bar.subtitle}>12.10%</Text>
        </View>
      )}
    </View>
    {children}
  </View>
);

group.propTypes = {
  title: PropTypes.string.isRequired,
  item: PropTypes.object,
};

const styles = {
  container: {},
  bar: {
    container: {
      height: 41,
      backgroundColor: '#F0F0F0',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    title: {
      fontSize: 11,
      color: 'rgba(0, 0, 0, 0.65)',
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: 'bold',
    },
    content: {
      fontSize: 11,
      color: 'rgba(0, 0, 0, 0.45)',
    },
  },
};

export default group;
