import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ViewPropTypes } from 'react-native';

const transactionItem = ({ style }) => (
  <View style={[styles.container, style]}>
    <View style={styles.left.container}>
      <View style={styles.left.dot.deposit.outer}>
        <View style={styles.left.dot.deposit.inner} />
      </View>
      <View style={styles.left.line.deposit} />
    </View>
    <View style={styles.content.container}>
      <View style={styles.content.title.container}>
        <Text style={styles.content.title.deposit}>存入 18377493 SOC</Text>
      </View>
      <View style={styles.content.middle.container}>
        <View style={styles.content.middle.group.container}>
          <Text style={styles.content.middle.group.title}>总金额 ¥948,293,742</Text>
          <Text style={styles.content.middle.group.subtitle}>存到 Wallet</Text>
        </View>
        <View style={styles.content.middle.group.container}>
          <Text style={styles.content.middle.group.title}>单价 ¥0.93828</Text>
          <Text style={styles.content.middle.group.subtitle}>手续费 0</Text>
        </View>
      </View>
      <View style={styles.content.bottom.container}>
        <Text style={styles.content.bottom.text}>2018-02-12 09:00 来自Wallet API同步</Text>
      </View>
    </View>
  </View>
);

transactionItem.propTypes = {
  style: ViewPropTypes.style,
};

const styles = {
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  left: {
    container: {
      alignItems: 'center',
    },
    dot: {
      deposit: {
        outer: {
          width: 14,
          height: 14,
          borderRadius: 7,
          backgroundColor: 'rgba(24, 144, 255, 0.3)',
          justifyContent: 'center',
          alignItems: 'center',
        },
        inner: {
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: '#1890FF',
        },
      },
      withdraw: {
        outer: {
          backgroundColor: 'rgba(255, 118, 0, 0.3)',
        },
        inner: {
          backgroundColor: '#FF7600',
        },
      },
    },
    line: {
      deposit: {
        marginTop: 5,
        flex: 1,
        width: 2,
        borderRadius: 1,
        backgroundColor: '#1890FF',
      },
      withdraw: {
        backgroundColor: '#FF7600',
      },
    },
  },
  content: {
    container: {
      flex: 1,
      marginLeft: 8,
    },
    title: {
      container: {
        marginTop: 24,
      },
      deposit: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1890FF',
      },
      withdraw: {
        color: '#FF7600',
      },
    },
    middle: {
      container: {
        marginTop: 20,
        flexDirection: 'row',
      },
      group: {
        container: {
          flex: 1,
        },
        title: {
          fontSize: 12,
          color: '#333333',
        },
        subtitle: {
          marginTop: 8,
          fontSize: 12,
          color: '#999999',
        },
      },
    },
    bottom: {
      container: {
        marginTop: 17,
      },
      text: {
        fontSize: 10,
        color: '#999999',
      },
    },
  },
};

export default transactionItem;
