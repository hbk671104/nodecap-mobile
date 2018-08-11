import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const projectGroup = ({ title, subtitle, content, children }) => (
  <View style={styles.container}>
    <View style={styles.top.container}>
      <View style={styles.top.group}>
        <Text style={styles.top.title}>{title}</Text>
        <Text style={styles.top.subtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.top.content}>{content}</Text>
    </View>
    <View style={styles.bottom.container}>{children}</View>
  </View>
);

projectGroup.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  content: PropTypes.string,
};

const styles = {
  container: {},
  top: {
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingTop: 20,
      marginLeft: 10,
      paddingLeft: 10,
      paddingRight: 18,
      paddingBottom: 8,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E9E9E9',
    },
    group: {
      flex: 1,
    },
    title: {
      color: 'rgba(0, 0, 0, 0.85)',
      fontSize: 14,
      fontWeight: 'bold',
    },
    subtitle: {
      marginTop: 5,
      color: 'rgba(51, 51, 51, 0.45)',
      fontSize: 10,
    },
    content: {
      color: '#1890FF',
      fontSize: 20,
      fontWeight: 'bold',
    },
  },
  bottom: {
    container: {
      paddingVertical: 10,
    },
  },
};

export default projectGroup;
