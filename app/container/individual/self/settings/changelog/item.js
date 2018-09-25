import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const item = ({ version, date, changelog }) => (
  <View style={styles.container}>
    <View style={styles.top.container}>
      <Text style={styles.top.title}>{version}</Text>
      <Text style={styles.top.date}>{date}</Text>
    </View>
    <View style={styles.bottom.container}>
      <Text style={styles.bottom.title}>本次更新</Text>
      <View>
        {changelog.map((c, i) => (
          <View key={i} style={styles.bottom.item.container}>
            <Text style={styles.bottom.item.text}> - </Text>
            <Text style={[styles.bottom.item.text, { flex: 1 }]}>{c}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
);

const styles = {
  container: {
    marginLeft: 12,
    paddingRight: 12,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E9E9E9',
  },
  top: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    date: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
    },
  },
  bottom: {
    container: {
      marginTop: 12,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
      marginBottom: 10,
    },
    item: {
      container: {
        marginTop: 2,
        flexDirection: 'row',
      },
      text: {
        fontSize: 14,
        lineHeight: 20,
        color: 'rgba(0, 0, 0, 0.65)',
      },
    },
  },
};

item.propTypes = {
  version: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  changelog: PropTypes.array,
};

item.defaultProps = {
  changelog: [],
};

export default item;
